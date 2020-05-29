# Creating your First CodeZero App

To publish your application in CodeZero, you need to create and publish an application manifest on the CodeZero Hub, and a provisioner npm package.

This guide assumes familiarity with Kubernetes concepts, and implementing npm modules using Typescript.

## General

There are some general principles to follow when cereating new applications for CodeZero to provide a great user experience.

* Applications should simple to set up and use.  Provisioners should hide the complexity of application installation, removal and configuration.  Documentation should avoid the use of jargon where possible.

* Applications should be well defined.  Applications should not install more or less than is required for the application.  If applictions require other components or applications to extend functionality, for example, logging or metrics they should use application linking when possible.

* Status reporting and error handling.  Application provisioners should report status and handle errors in case of failure.

To get started, we'll have a look at the Node-RED provisioner.

## Application Spec

The application spec is installed in a c6o cluster to trigger provisioning.  To get started, it's best to create an application spec manually before publishing it to Hub for local testing using the CLI.

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

* `provisioner` - this section contains provisioner-specific configuration options such as storage size, specific features and configuration options.  While there are some reserved fields such as `package` and `tag-prefix` (see Application Spec), most of the fields in this section are defined by the provisioner.
* `marina` - tells the Marina desktop how to view (launch) the application in the browser.  In this case, Node-RED can be viewed in an iFrame, and so is an inline type.
* `routes` - this section tells the provisioner how to configure networking within the cluster to access the application.  In this case, simple http routing is used to access the application service `node-red`

## A Simple Provisioner

A provisioner is an npm module consisting of a `package.json` file, typically some kubernetes resource templates, and implementations of methods of the base `Provisioner` object supplied by the provisioning framework to support provisining *actions* that occur in different phases.

The actions are: *create*, *update*, and *remove*.  The main phases are inquire, validate and apply.  Not all phases and actions need to be implemented up front, but a full featured provisioner will likely implement most, if not all of these methods.

For example to install an application from the CLI the provisioner would implement the following *create* action methods:

`createInquire` - ask the CLI user for configuration options in the provisioner sectino that are not specified in the application spec.
`createValidate` - ensure all needed application options are valid, and/or fill in any default options.
`createApply` - use the kubeclient module to install kubernetes resources configured using the application spec.

### Kubernetes Resources

To create a new application, you first need to create and test the needed kubernetes resources that need to be installed.  For Node-RED, and other simple applications we'll typically need a deployment to specify theimage and pods used, a persistent volume to store data, and a service that exposes the application to the cluster, and to the outside world.  We'll look at these for Node-RED.

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

Note the template markers for the `namespace` and `projects` fields.  These are filled in by the provisioner with values when the resources are added.  For manual testing, these can be filled in and the resource applied to the cluster using the kubectl command.

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

Once these specifications are tested, you're ready to wrap them in a provisioner.

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


TODO:
* Walk through entry point in index.ts
* Walk through mixins, open createInqure
* Walk through createApply

## Example provisioners

Several example provisioners exist to get you started.  See, for example, the `vscode` provisioner that implements several provisioner methods as a starting point.

### Install/Create Example

For a more complex example of installing an application, see the mongodb provisioner.  VSCode, Grafana, Prometheus, Node-RED have example install user interfaces.

### Configurable Uninstall Example

VSCode has several deprovisioning options and UI.

### Settings and Application Linking

The istio provisioner can dynamically link to Prometheus and Grafana applications using an API.

