# Your First Application

Any existing Kubernetes *application* can become a *CodeZero Application*. Unlike Kubernetes *deployments*, *services* and *Persistent Volumes*, *applications* are not a first-class resource type in Kubernetes. CodeZero treats applications as first class resources within Kubernetes so that it can become a *Cloud Application* in any cloud where Kubernetes is available.

In order to turn any Kubernetes application into a *Cloud Application*, the application needs to be published to CodeZero's Marketplace so that it can be installed and used by end users in a cloud. 

To become a Cloud Application, you need to:

1. Create a *Cloud Application Manifest* that defines the parameters of your application
1. Write a *CodeZero Provisioner* for your application that will turn it into a CodeZero available *Cloud Application*
1. Register your application as a *Cloud Application* on the [CodeZero Hub](https://hub.codezero.io)

This guide assumes familiarity with Kubernetes concepts, and implementing npm modules using Typescript.

## Design Principles

There are some general design principles to follow when creating new Applications for CodeZero in order to provide users with great experiences.

* Applications should be simple to set up and use. Provisioners should hide the complexity of application installation, removal and configuration. Documentation should avoid the use of jargon and acronyms where possible.

* Applications should be well defined. Applications should not install more or less than is required for the application. If Applications require other components or other Applications to extend functionality, they should use Application Linking when possible. A commong example of this might be for logging or metrics.

* Status reporting and error handling. Application Provisioners should report status and handle errors in case of failure.

## A Simple CodeZero Application

To get started, we'll have a look at the Node-RED example Application Manifest and Provisioner. [Node-RED](http://nodered.org) is a low-code visual programming tool for building event-driven IoT applications.

### Application Manifest

The *Application Manifest* is used to define an Application installed on a CodeZero cluster. The manifest is created and managed by the CodeZero Store when an Application is installed. To get started, it's easiest to create an Application Manifest manually for development and testing before publishing to the Hub.

An example Node-RED Manifest that supports installation, removal and launch from the CodeZero Marina desktop is as follows:

```yaml
apiVersion: system.codezero.io/v1
kind: App
metadata:
  name: node-red
  labels:
    system.codezero.io/edition: latest
  annotations:
    system.codezero.io/display: Node-RED
    system.codezero.io/description: "IoT programming tool for wiring together hardware devices, APIs and online services."
    system.codezero.io/iconUrl: "https://hub.codezero.io/api/assets/apps/01E8Q6AARJG3Q6XWEVDD7FYZ9V/icon"
spec:
  routes:
    simple:
      http:
        service: node-red
  provisioner:
    storage: 4Gi
    projects: false
    package: "@provisioner/node-red"
  marina:
    launch:
      type: inline
```

The `metadata` section contains information such as the Edition, Display Name and icon used in the CodeZero Marina.

The `spec` section contains several subsections used by CodeZero:
* `provisioner` - contains provisioner-specific configuration options.  There are some reserved fields, such as `package` and `tag-prefix` (see [Application Spec](/reference/appspec.md)), however, the rest of the fields in this section are defined and used by the Provisioner.  Here, for example, `storage` and `projects` are specific to the Node-RED Provisioner. (see: [reference](/reference/appspec.md#provisioner))
* `marina` - tells the Marina desktop how to view (launch) the application in the browser. In this case, Node-RED can be viewed in an iFrame, and so is an inline type. (see: [reference](/reference/appspec.md#marina))
* `routes` - defines how the network will be configured to access the application. In this case, `simple` http routing is used to access the application service `node-red`. (see: [reference](/reference/appspec.md#routes))

For more information on the Application Manifest see the [reference](/reference/appspec.md).

### The Provisioner

A Provisioner is an npm module consisting of three primary components:
1. Kubernetes resource templates
1. Implementations of the base `Provisioner` object that support provisioning *actions* that occur for different stages of the Applications life cycle.
1. UI web components needed to support web-based provisioning flow.

#### Provisioner File Structure

We'll focus on implementing the create action for Node-RED to install Node-RED with the CLI using the Node-RED provisioner module as a reference.

The Node-RED provisioner module directory layout is as follows:

* `/node-red`
  * `/k8s` - Kubernetes templates
  * `/src` - Typescript source code
    * `/mixins` - Provisioner method implementations
    * `/ui` - Provisioner UI web components
    * `index.ts` - Provisioner entry point
  * `package.json`
  * `README.md`
  * `tsconfig.json`

#### Kubernetes Resource Templates

First, let's focus on the Kubernetes Resource Templates. These templates define the native Kubernetes resource definitions that you are likely already be familiar with. However, the templates use [Handlebars](https://handlebarsjs.com/) language as a means of merging configuration and template together to create the kubernetes definition. These templates are consumed by the Provisioner Implementations to manage and apply changes to the Application within the user's Cluster. 

For a relatively simple application like Node-RED, our Provisioner will need to setup and manage three underlying Kubernetes resources:
1. *Deployment* - that specifies the docker image, replicas, and volumes used.
1. *Persistent Volume Claim* - to store persistent data.
1. *Service* - that exposes the Application to the cluster and outside world.

##### Deployment Template

The Deployment template for Node-RED looks like the following:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: '{{namespace}}'
  name: node-red
  labels:
    role: server
    name: node-red
spec:
  selector:
    matchLabels:
      name: node-red
  replicas: 1
  template:
    metadata:
      labels:
        role: server
        name: node-red
    spec:
      securityContext:
        runAsUser: 1000
        fsGroup: 1000
      containers:
      - name: node-red
        image: nodered/node-red
        env:
          - name: NODE_RED_ENABLE_PROJECTS
            value: '{{projects}}'
        ports:
          - name: node-red
            containerPort: 1880
        volumeMounts:
          - mountPath: "/data"
            name: node-red-volume
      volumes:
        - name: node-red-volume
          persistentVolumeClaim:
            claimName: node-red-pvc
```

Note the template markers for the `namespace` and `projects` fields. These are filled in by the Provisioner with the appropriate values when the resources are added. For manual testing, these can be filled in and the resource applied to the cluster using the `kubectl` command.

##### Persistent Volume Claim

The Persitent Volume Claim is used to provide Node-RED with persistent storage that will survive pod restarts or reassignment:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: node-red-pvc
  namespace: '{{namespace}}'
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: {{storage}}
  storageClassName: do-block-storage
```

Note the templating used for specifying the `storage` size, and `namespace` here.

##### Service

Finally, the Service tells Kubernetes how to expose Node-RED within the cluster.  In this case, we want to expose a Node-RED to other applications within our cluster on port 80.

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: '{{namespace}}'
  name: node-red
  labels:
    name: node-red
    role: server
spec:
  ports:
  - port: 80
    name: http
    targetPort: 1880
  type: NodePort
  selector:
  name: node-red
```

The service exposes Node-RED to other applications on the cluster on port 80.

Once these specifications are tested on a cluster, you're ready to use them in a Provisioner.

#### Provisioner Action Implementations

Once the Kubernetes Resource Templates have been setup, we are ready to create our Provisioner Implementations that will consume the templates and manage our Application.

The simplest way to get started is to create a Provisioner that is capable of installing an Application from a command line interface (CLI). In this case, we will need to implement the following *create* action methods:
* `createInquire` - ask the user to set any configuration options required by the Provisioner that are not already specified in the Application Manifest.
* `createApply` - generate all Kubernetes Resources Definitions based on the Provisioner configuration and Resource Templates, then apply and manage the cluster changes.

##### `createInqure.ts`

First, lets create a `createInquire.ts` file in the `src/mixins/` directory.  In this file we'll make a `createInquireMixin`, that implements a `createInquire` method. This method is used to asks the CLI user for any options that have not been specified in the Application Manifest or in command-line options. It makes use of the [inquirer](https://github.com/SBoudrias/Inquirer.js#readme) library to query the user from the CLI.

Our Node-RED implementation looks like:

```typescript
import { baseProvisionerType } from '..'

export const createInquireMixin = (base: baseProvisionerType) => class extends base {

    async createInquire(args) {

        const answers = {
            storage: args.storage || this.spec.storage,
            projects: args.projects || this.spec.projects
        }

        const responses = await this.manager.inquirer?.prompt([{
            type: 'list',
            name: 'storage',
            message: 'What size data volume would you like for your Node-RED flows?',
            choices: ['2Gi','4Gi','8Gi'],
            default: '2Gi'
        }, {
            type: 'confirm',
            name: 'projects',
            default: false,
            message: 'Enable projects feature?',
        }], answers)

        this.spec.storage = responses.storage
        this.spec.projects = responses.projects
    }
}
```

##### `createApply.ts`

Next, we'll make a `createApplyMixin`, which is where the real action happens. Here the  provisioner installs the Kubernetes Resources for the Application.

The method first calls the base class `ensureServiceNamespacesExist()` provided with the [provisioner base class](/reference/provisioners.md) to ensure the target namespace exists, or create it if needed.

It then uses `ensureNodeRedIsInstalled()`. This method uses the [kubeclient library](/reference/kubeclient.md) to install the Kubernetes Resoures using the Resource Templates with the templated values filled in, and applying them to the Kubernetes cluster.

The `kubeclient` is key to making provisioners easy to write since it provides simple CRUD abstractions for interacting with the cluster either interactively or in a batch mode using a fluid interface as shown.

Finally, the method calls `ensureNodeRedIsRunning()` to wait for the cluster to successfully launch a Node-RED pod. Once a Node-RED pod is running, we can assume its available to CodeZero users.

```typescript
import { baseProvisionerType } from '../index'

export const createApplyMixin = (base: baseProvisionerType) => class extends base {

    async createApply() {
        await this.ensureServiceNamespacesExist()
        await this.ensureNodeRedIsInstalled()
        await this.ensureNodeRedIsRunning()
    }

    get nodeRedPods() {
        return {
            kind: 'Pod',
            metadata: {
                namespace: this.serviceNamespace,
                labels: {
                    name: 'node-red'
                }
            }
        }
    }

    async ensureNodeRedIsInstalled() {

        const storage = this.spec.storage
        const projects = this.spec.projects
        const namespace = this.serviceNamespace

        await this.manager.cluster
            .begin('Install Node-RED services')
                .list(this.nodeRedPods)
                .do((result, processor) => {
                    if (result?.object?.items?.length == 0) {
                        // There are no node-red pods running
                        // Install node-red
                        processor
                            .upsertFile('../../k8s/pvc.yaml', { namespace, storage })
                            .upsertFile('../../k8s/deployment.yaml', { namespace, projects })
                            .upsertFile('../../k8s/service.yaml', { namespace })
                    }
                })
            .end()
    }

    async ensureNodeRedIsRunning() {
        await this.manager.cluster.
            begin('Ensure a Node-RED replica is running')
                .beginWatch(this.nodeRedPods)
                .whenWatch(({ condition }) => condition.Ready == 'True', (processor, pod) => {
                    processor.endWatch()
                })
            .end()
    }
}
```

##### Bringing It Together

Lastly, we need to connect all these methods together into a single `Provisioner` class that extends the `ProvisionerBase`.  To accomplish this, we use mixin classes to bring it all together with the `index.ts` file:

```typescript
import { mix } from 'mixwith'
import { ProvisionerBase } from '@provisioner/common'

import {
    removeInquireMixin,
    removeApplyMixin
} from './mixins'

export type baseProvisionerType = new (...a) => Provisioner & ProvisionerBase

export class Provisioner extends mix(ProvisionerBase).with( 
  createInquireMixin,
  createApplyMixin,) 
{
}
```

### Testing the CLI

Now that we have created a very basic provisioner, we can go ahead and test it out on the CLI. To do this, first make sure we have the CLI installed and configured. Then run the command:

`czctl provision <app-manifest.yaml> --package <path-to-provisioner-package>`

For example, if you an Application Manifest called `nodered.yaml` in the root of your provisioner project, you might run:
`czctl provision nodered.yaml --package ./`

### Web User Interface

For an application to be accessible to our user base, every Application Provisioner should be installable through the Web UI.  Unfortunately, the `createInquire` implementation we have created so far is only used by the CLI tool.  Instead, we need to also create the web components that will allow a user to configure the application through the web UI.

For Node-RED, we've implemented the install web component in the `/ui/index.ts` file as shown below. Here, the component tag name is `node-red-install-main`. The convention for naming web components for provisioners is `{application-name}-{action}-main` using the application name in the manifest metadata, the action is either `install`, `uninstall` or `settings` depending on the UI panel supported.

```typescript
import { LitElement, html, customElement } from 'lit-element'
import { StoreFlowStep, StoreFlowMediator } from '@provisioner/common'

@customElement('node-red-install-main')
export class NodeRedSettings extends LitElement implements StoreFlowStep {
    mediator: StoreFlowMediator
    values = ['1Gi','2Gi','4Gi']

    get serviceSpec() {
        return this.mediator.getServiceSpec('node-red')
    }

    render() {
        return html`
            <c6o-form-layout>
                <c6o-combo-box @selected-item-changed=${this.storageSelected} label='Node-RED Storage' value=${this.serviceSpec.storage} required allow-custom-value .items=${this.values}></c6o-combo-box>
            </c6o-form-layout>
            <c6o-form-layout>
                <c6o-checkbox @checked-changed=${this.projectsCheckChanged} ?checked=${this.serviceSpec.projects == true}>Enable Projects</c6o-checkbox>
            </c6o-form-layout>
        `
    }

    async begin() {
        // set defaults
        this.serviceSpec.storage = this.serviceSpec.storage || '2Gi'
        this.serviceSpec.projects = this.serviceSpec.projects !== undefined ? this.serviceSpec.projects : false
    }

    storageSelected = (e) => {
        this.serviceSpec.storage = e.detail.value
    }

    projectsCheckChanged = (e) => {
        this.serviceSpec.projects = e.detail.value
    }
}
```

### Testing the Web UI

In order to test the Web UI, you'll now need to publish the Provisioner package to an NPM repository, and create your Application in the Hub.  More instructions on this process coming soon.
