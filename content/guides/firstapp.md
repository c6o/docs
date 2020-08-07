# Creating your First CodeZero App

To publish your application in CodeZero, you need to create and publish an application manifest and a provisioner npm package.

This guide assumes familiarity with Kubernetes concepts, and implementing npm modules using Typescript.

## General

There are some general principles to follow when creating new applications for CodeZero to provide a great user experience.

* Applications should simple to set up and use. Provisioners should hide the complexity of application installation, removal and configuration. Documentation should avoid the use of jargon where possible.

* Applications should be well defined. Applications should not install more or less than is required for the application. If applictions require other components or applications to extend functionality, for example, logging or metrics they should use application linking when possible.

* Status reporting and error handling. Application provisioners should report status and handle errors in case of failure.

To get started, we'll have a look at the Node-RED example application spec and provisioner. [Node-RED](http://nodered.org) is a low-code programming tool for building event driven IoT applications.

## A Simple CodeZero Application

### Application Spec

The application spec is inserted in a c6o cluster by the c6o Store to trigger application installation. To get started, it's best to create an application spec manually for development and testing before publishing it to Hub.

An example Node-RED manifest that supports installation, removal and launch from the c6o Marina desktop is as follows:

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

The `metadata` section contains information such as the edition, display name and icon used in the c6o Marina.
The `spec` section contains several subsections used by c6o:

* `provisioner` - this section contains provisioner-specific configuration options such as storage size, specific features and configuration options. While there are some reserved fields such as `package` and `tag-prefix` (see Application Spec), most of the fields in this section are defined by the provisioner.
* `marina` - tells the Marina desktop how to view (launch) the application in the browser. In this case, Node-RED can be viewed in an iFrame, and so is an inline type.
* `routes` - this section tells the provisioner how to configure networking within the cluster to access the application. In this case, simple http routing is used to access the application service `node-red`

For more information on the application spec see the [reference](/reference/appspec.md).

### The Provisioner

A provisioner is an npm module consisting of Kubernetes resource templates, and implementations of methods of the base `Provisioner` object to support provisioning *actions* that occur in different stages.

For example to install an application from the CLI the provisioner would implement the following *create* action methods:

* `createInquire` - ask the CLI user for configuration options in the provisioner sectino that are not specified in the application spec.
* `createValidate` - ensure all needed application options are valid, and/or fill in any default options.
* `createApply` - use the kubeclient module to install Kubernetes resources configured using the application spec.

### Kubernetes Resources

First create and test the needed Kubernetes resources that will be installed and managed by your Provisioner. For a simple application like Node-RED we'll need a *deployment* to specify the docker image, replicas and volumes used, a *persistent volume claim* to store data, and a *service* that exposes the application to the cluster and the outside world.

#### Deployment

The deployment template we'll use is as follows:

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

Note the template markers for the `namespace` and `projects` fields. These are filled in by the provisioner with values when the resources are added. For manual testing, these can be filled in and the resource applied to the cluster using the `kubectl` command.

#### Persistent Volume Claim

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

#### Service

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

### Provisioner

We'll focus on implementing the create action for Node-RED to install Node-RED with the CLI using the Node-RED provisioner module as a reference.

The Node-RED provisioner module directory layout is as follows:

* `/node-red`
  * `/k8s` - Kubernetes templates above
  * `/src` - Typescript source
    * `/mixins` - provisioner method implementations
    * `/ui` - provisioner UI web components
    * `index.ts` - provisioner entry point
  * `package.json`
  * `README.md`
  * `tsconfig.json`

#### `index.ts`

The provisioner npm module exports a Provisioner class that implements several methods in `index.ts`. The Node-RED provisioner uses mixin classes to implement Provisioner methods. In the example below, the provisioner supports remove and create action as well as command line help.

```typescript
import { mix } from 'mixwith'
import { ProvisionerBase } from '@provisioner/common'

import {
    removeInquireMixin,
    removeApplyMixin,
    createApplyMixin,
    createInquireMixin,
    helpMixin
} from './mixins'

export type baseProvisionerType = new (...a) => Provisioner & ProvisionerBase

export class Provisioner extends mix(ProvisionerBase).with( 
  helpMixin,
  removeInquireMixin,
  removeApplyMixin,
  createInquireMixin,
  createApplyMixin,) {
}
```

### Create Action

Installing an application is implemented using the `createInquire` and `createApply` methods.

#### `createInqure.ts`

In the `createInquireMixin`, the `createInquire` method asks the CLI user for any options that have not been specified in the application manifest or in command line options. It makes use of the [inquirer](https://github.com/SBoudrias/Inquirer.js#readme) library to query the user from the CLI.

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

#### `createApply.ts`

The `createApplyMixin` is where the action happens.  Here the  provisioner installs the Kubernetes resources for your application.

The method first calls the base class `ensureServiceNamespacesExist()` provided with the [provisioner base class](/reference/provisioners.md)  to ensure the target namespace exists and create it if needed.

It then uses `ensureNodeRedIsInstalled()`.  This method uses the  [kubeclient library](/reference/kubeclient.md) to install the Kubernetes resoures with the template values filled in.

The kubeclient is key to making provisioners easy to write since it provides simple CRUD abstractions for interacting with the cluster either interactively or in a batch mode using a fluid interface as shown.

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

> TODO: should add resources with the application as an owner for uninstall.

### Other actions

The remove action is implemented in a similar way.

TODO: only need to remove resources that are not linked to the app as an owner.

### Web User Interface

Applications should have at least an install web UI. Other UIs for removal and configuration are optional, depending on the capabilities of the application or what features you would like to expose.

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