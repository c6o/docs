# Provisioner Implementation Guide

The strategy for implementing a provisioner is as follows:

* Create and test the set of kubernetes resources such as deployments, services, configmaps, secrets and otehr needed to deploy your application.
* Parameterize these resources using handlebars `{{}}` to allow users to configure the applications on install.  This includes allowing users to deploy them in different namespaces, different cloud environments with varying storage options.
* Create a new provisioner npm module.
* Using the [CLI](/provisioners/cli.md) to test, implement a `createInquire` and `createApply` provisioner implementation.
* Test and debug using the CLI using a local file application manifest.
* Once the provisioner is working via the CLI, then you can add web components needed for the c6o system UI, starting with install.  Currently these must be tested with a system server running locally.
* When your manifest and provisioner are ready, you can publish your provisioner to NPM and add your manifest to Hub for further testing and development.
