# Provisioner Implementation

The strategy for implementing a provisioner is as follows:

* Create and test the set of kubernetes resources such as deployments, services, configmaps, secrets and otehr needed to deploy your application.
* Parameterize these resources using handlebars `{{}}` to allow users to configure the applications on install.  This includes allowing users to deploy them in different namespaces, different cloud environments with varying storage options.
* Create a new provisioner npm module.
* Implement the createAction for the [CLI](/provisioners/cli.md) including at least a `createInquire` and `createApply` provisioner implementation.
* Test and debug using the CLI using a local file application manifest.
* Once the provisioner is working via the CLI, then you can add web components needed for the c6o system UI, starting with install.
* When your manifest and provisioner are ready, you can publish your provisioner to NPM and add your manifest to Hub for further testing and development.

In this section we provide information on the Provisioner methods that need to be implemented and point to example provisioners for reference.


## Example provisioners

Several example provisioners exist in the `/packages/provisioners` directory to get you started. See for example the `vscode` provisioner that implements several endpoints as a starting point.

### Provisioning

See mongodb for the most complex example. Node-RED for the simplest. VSCode, Grafana, Prometheus, Node-RED have example install user interfaces.

### Deprovisioning

VSCode has several deprovisioning options and UI.

### Settings/Ask

The istio provisioner can dynamically link to the Grafana application.

### API

Grafana exposes a dashboard API.