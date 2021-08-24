# Publishing a Standard Application

> [!WIP]
> This document is still being developed and may be incomplete.

In this guide, we walk through the steps to publish a standard application to CodeZero. By the end of this guide, you will create and publish a provisioner for [NodeRED](https://nodered.org/) to the CodeZero marketplace.

## Prerequisites

You'll need to:

1. setup a [CodeZero Cluster](./getting-started.md#Install-CodeZero), and
1. install and configure the [CodeZero CLI](./getting-started.md#Install-CLI),

## Getting Started

As with all CodeZero applications, there are three main components we need to consider and address:

1. Containerized Application
1. Provisioner Package
1. Application Manifest

> [!PROTIP]
> See more information about what makes up a CodeZero application [here](../concepts/applications).

## The Containerized Application

The first component we need for any CodeZero Application is a containerized application. In this guide, we use [NodeRED](https://nodered.org/) as an example. The NodeRED community has already created and published a docker hub image for us ([nodered/node-red](https://hub.docker.com/r/nodered/node-red)).

> [!EXPERT]
> To learn how to create your own containerized applications, check out our [NodeJS Hello World](./hello-world) docker guide.

### Configuring NodeRED

NodeRED is a simple web application that does not take much to configure. There are just a few properties we need to be aware of as we continue with setting up this application to run in CodeZero:

1. **Application Port:**  NodeRED runs a basic web application on port `1880`.
1. **Environment Variables:**  We can use the `NODE_RED_ENABLE_PROJECTS` environment variable to control whether NodeRED has [projects](https://nodered.org/docs/user-guide/projects/) enabled or disabled.
1. **Persistent Data:**  NodeRED stores user data in the `/data` directory, which we want to make sure gets persisted if the container ever restarts or moves.

## Application Provisioner

The "Application Provisioner" is a NodeJS package responsible for installing and managing the application in a customer's CodeZero Cloud. Instead of writing a full Provisioner yourself, CodeZero has built a highly configurable Provisioner called AppEngine (`@provisioner/appengine`) that provides more than enough flexibility to manage this NodeRED application.

> [!NOTE]
> Check out the [App Engine documentation](../references/appengine) to learn more about how App Engine.

> [!EXPERT]
> Learn how to create a custom Provisioner with our [Custom Provisioner Guide](./custom-provisioner.md).

## Application Manifest

The Application Manifest consists of a YAML file that describes the application within the CodeZero ecosystem. It may also contain additional asset files (ex: icons, images, etc). This file can be named anything, however, the recommended convention is either have `c6o.yaml` in the root of your project or place it in a `c6o` folder (ex: `c6o/app.yaml`);

### Application Manifest Basics

Since we are using `@provisioner/appengine` and the docker image `nodered/node-red` (Provisioner and application image, respectively), we only need to create an Application Manifest.

So, let's first create a simple YAML file for our Application Manifest: `c6o.yaml`.

```yaml
name: Node Red
appId: <your-username>-nodered  # replace this so it's unique

description:
  Basic description about the application.

editions:
- name: preview
  scope: private
  spec:
    provisioner:
      # Provisioner spec goes here

    routes:
      # Routes go here

    marina:
      # Marina configuration goes here
```

> [!NOTE]
> Check out the [Application Manifest specification](../references/application-manifest.md) for a full list of properties and configurations.

### Edition

The `editions` property contains an array of possible editions that an end-user can choose from. Each edition has a set of configuration and settings. As a starting point, we only need one edition, which we call "preview".

> [!NOTE]
> Learn more about what editions are for [here](../concepts/editions.md).

> [!EXPERT]
> For more details about how to use editions, checkout the [editions](../references/editions.md) reference.

### Provisioner Spec

The `provisioner` property contains configuration settings that are specific to the provisioner project. We are using the App Engine provisioner, so all properties here are related to the `@provisioner/appengine` project.

> [!EXPERT]
> For a full description of App Engine, checkout the [App Engine](../references/editions.md) documentation.

#### App Engine Basics

First, we need to define the provisioner package to use during installation. In this case, we are using App Engine NPM (`@provisioner/appengine`) as the applications underlying provisioner. Additionally, we need to define the Docker Hub image (`nodered/node-red`) that we want App Engine to use.

```yaml
#...
editions:
- # ...
  spec:
    # ...
    provisioner:
      package: @provisioner/appengine  # Provisioner NPM package
      name: nodered                    # Likely same as appId
      image: nodered/node-red          # Docker Hub image
```

#### Environment Variables

App Engine can define any number of environment variables as a simple key-value pair. We enable the NodeRED [projects feature](https://nodered.org/docs/user-guide/projects/) by adding:

```yaml
#...
editions:
- # ...
  spec:
    # ...
    provisioner:
      configs:
        NODE_RED_ENABLE_PROJECTS: true
```

#### Mounted Volumes

App Engine can create persistent volume claims and mount them to our applications using the `volumes` property. To persist data stored at `/data`, we add to the Application Manifest:

```yaml
#...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      volumes:
      - mountPath: /data
        size: 5Gi
```

#### Exposed Ports

The NodeRED application image contains a web server running on port `1880`. So we need to instruct CodeZero (and in turn, Kubernetes) that there is an HTTP service available on port `1880` of our application. App Engine does this by specifying the `ports` property.

```yaml
#...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      ports:
      - port: 1880
        protocol: tcp
```

> [!TIP]
> If the application only needs to expose a single TCP port, we can skip the `ports` property, and just define `port: 1880`, as a short-hand.

### Public Routes

Above, we used App Engine to expose the NodeRED web server running on port `1880` within the cluster. If we want CodeZero to expose this route to the outside world, we add configuration to the Application Manifest's `routes`:

```yaml
#...
editions:
- # ...
  spec:
    # ...
    routes:
    - type: http
      targetService: nodered   # should match spec.provisioner.name
      targetPort: 1880
```

> [!TIP]
> The `targetPort` can be automatically detected if our application only exposes a single port (as is the case here), however, we include it here for clarity.

### Marina

Lastly, once the application is up and running in your user's cluster. The application displays in their Marina (CodeZero desktop). When the customer clicks on the NodeRED icon within the Marina, we want it to launch NodeRED in a new popup window.

To accomplish this, we use the `marina` property as follows:

```yaml
#...
editions:
- # ...
  spec:
    # ...
    marina:
      launch:
        type: inline
        popUp: true
```

## Final Product

That's it!  Now we should have a `c6o.yaml` file that contains something similar to:

```yaml
name: Node Red
appId: <your-username>-nodered # replace this so it's unique

description:
  Basic description about the application.

editions:
- name: preview
  scope: private
  spec:
    routes:
    - type: http
      targetService: nodered
      targetPort: 1880

    marina:
      launch:
        type: inline
        popUp: true

    provisioner:
      package: '@provisioner/appengine'
      name: nodered
      image: nodered/node-red

      configs:
        NODE_RED_ENABLE_PROJECTS: true

      ports:
      - port: 1880
        type: http

      volumes:
      - mountPath: /data
        size: 5Gi
```

## Test the Application

To test the application, we instruct the CLI to install an application from a local manifest.

```bash
czctl install --local ./c6o.yaml
```

> [!NOTE]
> You'll need to have your KUBECONFIG configured to work with the CLI. See [here](./getting-started.md#Connect-to-your-Private-Cloud) for more details.

> [!WIP]
> The Marina does not display the application's icon correctly when an installation is performed locally like this.

## Publish the Application

Once the application installs correctly, you are ready to publish to the CodeZero marketplace.

```bash
czctl app publish ./c6o.yaml
```

> [!NOTE]
> You'll need to have your CLI authenticated with your CodeZero account. See the [Getting Started Guide](../guides/getting-started#Connect-to-the-Hub-API) for more instructions.

> [!PROTIP]
> Change the edition's `scope` to `public` if you want other's to see and install your application from the Marketplace.

### Verify the Application Published

There are two ways to verify that the application is published correctly:

1. Using the CLI
1. Using the Marketplace

### Using the CLI

```bash
czctl install <your username>/nodejs-hello-world
```

### From the Marketplace

Navigate to the [Marketplace](https://codezero.io/marketplace), find your application, and begin the installation processes using the Web UI.
