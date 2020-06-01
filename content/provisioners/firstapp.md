# Creating your First CodeZero App

To publish your application in CodeZero, you need to create and publish an application manifest on the CodeZero Hub, and a provisioner npm package.

This guide assumes familiarity with Kubernetes concepts, and implementing npm modules using Typescript.

## General

There are some general principles to follow when creating new applications for CodeZero to provide a great user experience.

* Applications should simple to set up and use. Provisioners should hide the complexity of application installation, removal and configuration. Documentation should avoid the use of jargon where possible.

* Applications should be well defined. Applications should not install more or less than is required for the application. If applictions require other components or applications to extend functionality, for example, logging or metrics they should use application linking when possible.

* Status reporting and error handling. Application provisioners should report status and handle errors in case of failure.

To get started, we'll have a look at the Node-RED application spec and provisioner.

## A Simple CodeZero Application

### Application Spec

The application spec is installed in a c6o cluster to trigger provisioning. To get started, it's best to create an application spec manually before publishing it to Hub for development and testing.

An example Node-RED manifest that supports installation, removal and launch from the c6o Marina desktop is as follows:

```yaml
apiVersion: system.traxitt.com/v1
kind: App
metadata:
  name: node-red
  labels:
    system.traxitt.com/edition: latest
  annotations:
    system.traxitt.com/display: Node-RED
    system.traxitt.com/description: "IoT programming tool for wiring together hardware devices, APIs and online services."
    system.traxitt.com/iconUrl: "https://staging.hub.traxitt.com/api/assets/apps/01E8Q6AARJG3Q6XWEVDD7FYZ9V/icon"
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

### The Provisioner

A provisioner is an npm module consisting of a `package.json` file, typically some kubernetes resource templates, and implementations of methods of the base `Provisioner` object supplied by the provisioning framework to support provisining *actions* that occur in different phases.

The actions are: *create*, *update*, and *remove*. The main phases are *inquire*, *validate* and *apply*. Not all phases and actions need to be implemented up front, but a full featured provisioner will likely implement most, if not all of these methods.

For example to install an application from the CLI the provisioner would implement the following *create* action methods:

* `createInquire` - ask the CLI user for configuration options in the provisioner sectino that are not specified in the application spec.
* `createValidate` - ensure all needed application options are valid, and/or fill in any default options.
* `createApply` - use the kubeclient module to install kubernetes resources configured using the application spec.

### Kubernetes Resources

To create a new application, you first need to create and test the needed kubernetes resources that need to be installed. For Node-RED, and other simple applications we'll typically need a deployment to specify theimage and pods used, a persistent volume to store data, and a service that exposes the application to the cluster, and to the outside world. We'll look at these for Node-RED.

#### Deployment

The deployment we'll use is as follows:

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

Note the template markers for the `namespace` and `projects` fields. These are filled in by the provisioner with values when the resources are added. For manual testing, these can be filled in and the resource applied to the cluster using the kubectl command.

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

Note the templating used for specifying the storage size, and namespace here.

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

Once these specifications are tested on a cluster, you're ready to wrap them in a provisioner.

### Provisioner

We'll focus on implementing the create action for Node-RED to install Node-RED with the CLI using the [Node-RED provisioner module]() as a reference.

The Node-RED provisioner module is set up as follows:

* /node-red
  * /k8s - kubernetes templates above
  * /src - Typescript source
    * /mixins - provisioner method implementations
    * /ui - provisioner UI web components
    * index.ts - provisioner entry point
  * package.json
  * README.md
  * tsconfig.json


#### `index.ts`

The provisioner npm module exports a Provisioner class that implements several methods in `index.tx`. The Node-RED provisioner uses mixin classes to implement Provisioner methods. In the listing below, the provisioner supports remove and create action as well as command line help.

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

Installing an application is implemented using the createInquire and createApply methods.

#### `createInqure.ts`

In the createInquireMixin, the createInquire method asks the CLI user for any options that have not been specified in the application manifest or in command line options. It makes use of the [inquirer]() library to query the user from the CLI.

```typescript
import { baseProvisionerType } from '..'

export const createInquireMixin = (base: baseProvisionerType) => class extends base {

    providedStorageSetting(answers) {
        return this.spec.storage || answers['storage']
    }

    providedProjectSetting(answers) {
        return this.spec.projects !== undefined ? this.spec.projects : answers['projects']
    }

    async createInquire(answers) {

        // TODO: use inquire properly
        if (!this.providedStorageSetting(answers)) {
            const response = await this.manager.inquirer.prompt({
                type: 'input',
                name: 'storage',
                default: '2Gi',
                message: 'What size data volume would you like for your Node-RED flows?'
            })

            if (response)
                this.spec.storage = response.storage
            else
                this.spec.storage = '2Gi'
        } else this.spec.storage = '2Gi'

        if (!this.providedProjectSetting(answers)) {
            const response = await this.manager.inquirer.prompt({
                type: 'confirm',
                name: 'projects',
                default: false,
                message: 'Enable projects feature?',
            })
            if (response)
                this.spec.projects = response.projects
            else
                this.spec.projects = false
        } else this.spec.storage = false
    }
}
```

#### `createApply.ts`

The createApplyMixin is where the action happens, that is, where the provisioner installs the kubernetes resources for your application.

The method first calls the base class `ensureServiceNamespacesExist()` to ensure the target namespace exists and create it if needed.

It then uses `ensureNodeRedIsInstalled()` to us the CodeZero kubeclient module to install the kubernetes resoures with the template values filled in.

The kubeclient is key to making provisioners easy to write since it provides simple CRUD abstractions for interacting with the cluster either interactively or in a batch mode using a fluid interface as shown.

Finally, the method calls `ensureNodeRedIsRunning()` to wait for the cluster to successfully launch a Node-RED pod. Once a pod is running, we can assume its available to CodeZero users.

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

TODO: should add resources to the app as an owner

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
            <traxitt-form-layout>
                <traxitt-combo-box @selected-item-changed=${this.storageSelected} label='Node-RED Storage' value=${this.serviceSpec.storage} required allow-custom-value .items=${this.values}></traxitt-combo-box>
            </traxitt-form-layout>
            <traxitt-form-layout>
                <traxitt-checkbox @checked-changed=${this.projectsCheckChanged} ?checked=${this.serviceSpec.projects == true}>Enable Projects</traxitt-checkbox>
            </traxitt-form-layout>
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

## Example provisioners

Several example provisioners exist to get you started. See, for example, the `vscode` provisioner that implements several provisioner methods as a starting point.

### Install/Create Example

For a more complex example of installing an application, see the mongodb provisioner. VSCode, Grafana, Prometheus, Node-RED have example install user interfaces.

### Configurable Uninstall Example

VSCode has several deprovisioning options and UI.

### Settings and Application Linking

The istio provisioner can dynamically link to Prometheus and Grafana applications using an API.

