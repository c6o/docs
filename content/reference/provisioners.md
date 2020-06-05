# Provisioner API Reference

## ProvisionerManager

The ProvisionManager creates provisioner objects, and holds the state of provisioning.  It provides access to several APIs used by provisioners:

### Fields
* `document` - application document that is being created, updated or removed
* `status` - Status API to provide real time status while provisioning, also used by the cluster API
* `inquirer` - [inquirer API](https://github.com/SBoudrias/Inquirer.js#readme) to interact with the CLI
* `cluster` - [KubeClient API](/references/kubeclient.md)
* `state` - map for storing data between provisioning stages


### Methods


- `getInstalledApps(name)`
- `getInstalledApp(name, namespace)`
- `getProvisioner(appDoc: AppDocument)`
- `getAppProvisioner(appDoc: AppDocument)`
- `getInstalledServices(serviceName)`
            let apps = await this.manager.getInstalledServices('npm-registry')
            const npmOptions = apps.map(app => {
                return {
                    name: `${app.metadata.namespace}/${app.metadata.name}`,
                    ...app.spec.services['npm-registry']
                }
            }) || []


## Provisioner Base Class

Provisioners extend the ProvisionerBase typically using mixins.  The Base class provides the following fields and methods.

### Fields

* `manager` - access to the ProvisionerManager that created the Provisioner.
* `spec` - the provisioner section of the application (or service section of the application for the provisioner)

### Methods

* `ensureNamespaceExists()` - ensure the target namespace for an application exists, and if not, create it.
* `serviceNamespace` - the target namespace for creating apps

## Provisioner Web Component APIs

### Mediator

The mediator is used by the install and uninstall web components.

It calls the web component begin and end methods if implemented, and provides access to the spec.

* `getServiceSpec(serviceName)` - retrieve the provisioner (service) section of the application.

The Mediator will call `begin()` and `end()` on the web component when the panel is set up and the Next button is hit during the install or uninstall flow.

### NavStation API

The Navstation API is injected into the settings web component.  It provides access to the application spec as well as a method to create a front end service client to access provisioner web APIs.

* `manifest` - the current application manifest
* `watchManifest(callback(manifest))` - watch for manifest changes, when changes, call callaback with the updated manifest
* `patchManifest(patch)` - patch the manifest with the provided specification)
* `createService(provisionerService)` - create a feathers service client to the provisioner web API service specified.
