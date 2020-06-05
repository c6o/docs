# Advanced Topics

Provisioners can provide APIs for use by other provisioners or that can be called from the web APIs.

## Local Provisioner APIs

To provide an API, simply add API methods to the Provisioner.  To call an API from another provisioner, the client provisioner uses its ProvisionerManager to find the target application in the cluster, instantiate the provisioner of the other application, and then call the API.

For example, the istio provisioner calls the grafana provisioner as follows.

```typescript
    const grafanaProvisioner = await this.manager.getAppProvisioner('grafana', grafanaNamespace)
    await grafanaProvisioner.beginConfig(grafanaNamespace, serviceNamespace, 'istio')
```

First, it uses its ProvisionManager to get the provisioner for the grafana application in the specified namespace.  This will find the application spec for grafana there, and if found will load the appropriate NPM package and instantiate the grafana provisioner.

The grafanaProvisioner API methods such as `beginConfig()` shown  can then be called directly.

## Provisioner Web APIs

Provisioners can expose web APIs to the c6o system for use by the UI web components.

To do so, names services are added to the provisioners that contain one or more service methods.  These services are [feathers services](https://docs.feathersjs.com/api/services.html) that expose one or more of the following methods:

```typescript
  async find(params) {
    return [];
  }
  async get(id, params) {}
  async create(data, params) {}
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
```

> Note that as in feathersjs, service methods are optional, and if a method is not implemented, the system will emit a `NotImplemented` error.

For example, the istio provisioner exposes a choices service that exposes only a find method.  This method uses the ProvisionManager to look for grafana and prometheus applications installed in the cluster.

```typescript
import { baseProvisionerType } from '../../'

export const choicesApiMixin = (base: baseProvisionerType) => class extends base {

    'choices' = {
        find: async () => {
            let apps = await this.manager.getInstalledApps('grafana')
            const grafanaOptions = apps.map(app => app.metadata.namespace) || []
            apps = await this.manager.getInstalledApps('prometheus')
            const prometheusOptions = apps.map(app => app.metadata.namespace) || []
            return {
              grafanaOptions,
              prometheusOptions
            }
        }
    }
}
```

To call this service from the UI, the settings web component uses the UI to retrieve a client side feathers service as shown in the web component snippet below.

```typescript
async connectedCallback() {
	super.connectedCallback()
	this.choicesService = this.api.createService('choices')
	this.api.watchManifest(this.renderSettings)
	await this.renderSettings(this.api.manifest)
	this.loaded = true
}
```

See the [Implementation Strategy](/guides/implementation.md) and [Provisioner API Reference](/reference/provisioners.md) more information.

## Advertising Services

To indicate that an application provides a well known API that is application independent, applications can advertise *services* by adding labels to the application spec.

For example, the verdaccio provisioner supports the NPM registry API.  To advertise this, it contains the npm-registry service label in its application spec (see the [Application Spec reference](/reference/appspec.md) for more information).

To find applications that support a specific service, a client provisioner uses the ProvisionerManager `getInstalledServices` method to find applications that advertise this service.  For example:

```typescript
const apps = await this.manager.getInstalledServices('npm-registry')
```
