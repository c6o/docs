# Publishing a Standard Application

> [!WIP]
> This document is still being developed and may be incomplete.

In this guide, we walk through the steps to publish a standard application to CodeZero.  By the end of this guide, you will create and publish a provisioner for [NodeRED](https://nodered.org/) to the CodeZero marketplace.

## Prerequisits

You'll need to:

1. setup a [CodeZero Cluster](https://docs.docker.com/engine/install/), and
1. install and configure the [CodeZero CLI](https://nodejs.org/en/),

## Getting Started

As with all CodeZero applications, there are three main components we need to consider and address:

1. Containerized Application
1. Provisioner Package
1. Application Manifest

> [!Protip]
> See more information about what makes up a CodeZero application [here](../concepts/applications).

## The Containerized Application

The first component we need for any CodeZero Application is a containerized application.  In this guide, we will use [NodeRED](https://nodered.org/) as an example, which the community has already created a docker hub image for "[nodered/node-red](https://hub.docker.com/r/nodered/node-red)" that will .

> [!EXPERT]
> To learn how to create your own containerized applications, check out our [NodeJS Hello World](./hello-world.md) docker guide.

### Configuring NodeRED

NodeRED is a simple web application that does not take much to configure.  There are just a few properties we will want to be aware of as we continue with setting up this application to run in CodeZero:

1. **Application Port:**  NodeRED runs a basic web application on port `1880`.
1. **Environment Variables:**  We can use the `NODE_RED_ENABLE_PROJECTS` environment variable to control whether NodeRED has [projects](https://nodered.org/docs/user-guide/projects/) enabled or disabled.
1. **Persistent Data:**  NodeRED stores user data in the `/data` directory, which we will want to make sure gets persisted between container restarts/upgrades/etc.

## Application Provisioner

The Application Provisioner is responsible for handling the installation and management of the application in a customers CodeZero cluster.  Instead of writting a full Provisioner yourself, CodeZero has built a highly configurable Provisioner called AppEngine (`@provisioner/appengine`) that provides more than enough flexiblity to manage this NodeRED application.

> [!NOTE]
> Check out the [App Engine documentation](../references/appengine) to learn more about App Engine.

> [!EXPERT]
> Learn how to create a custom provisioner with our [Custom Provisioner guide](./3-codegen.md).

## Application Manifest

The Application Manifest consists of a YAML file that describes our Application within the CodeZero ecosystem.  It may also contain additional asset files (ex: icons, images, etc).  This file can be named anything, recommended convention is to either have `c6o.yaml` in the root of your project, or place it in a folder at `c6o/app.yaml`;

> [!NOTE]
> Check out the [Application Manifest specification](../references/application-manifest.md) for a full list of properties and configurations.

### Application Manifest Basics

In this guide, we only need to create an Application Manifest, as we are using `@provisioner/appengine` and the docker image `nodered/node-red` for our provisioner and containerized application respectively.

So, let's first create a file basic YAML file to contain our Application Manifest.  This file can be named anything for example: `c6o.yaml`.

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

### Edition

The `editions` property constains an array of possible editions a customer can install.  Each edition has it's own configuration and settings.  As a starting point, we only need one edition, which we will call "preview".

> [!NOTE]
> Learn more about what editions are for and how they should be used [here](../concepts/editions.md).

> [!EXPERT]
> For more details about how to use editions, checkout the [editions](../references/editions.md) reference.

### Provisioner Spec

The `provisioner` property contains configuration settings that are specific to the provisioner project.  We are using the App Engine provisioner, so all properties here will be dictated by the `@provisioner/appengine` project.

> [!EXPERT]
> For a full description of App Engine, checkout the [App Engine](../references/editions.md) documentation.

#### App Engine Basics

First, we need to define in our Application Manifest that we want to use the App Engine NPM package (`@provisioner/appengine`) as the underlying provisioner.  Next, we need to define the Docker Hub image (`nodered/node-red`) that we want App Engine to setup.

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
      automated: true                  # should always be true

```

#### Environment Variables

App Engine has the ability to define any number of environment variables.  We will enable the NodeRED projects feature using:

```yaml
#...
editions:
- # ...
  spec:
    # ...
    provisioner:
      configs:
      - name: NODE_RED_ENABLE_PROJECTS
        value: true
```

#### Mounted Volumes

In order to persist data stored at `/data`, the provisioner should create a persistent volume that is mounted at this path.  Persistent volumes are automatically provisioned with the customers cloud provider at the size specified, then mounted to container at the path specified.

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

The NodeRED application image contains a webserver running on port `1880`.  So we need to instruct Kubernetes that there is an http service available on port `1880` of our application.

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

Above, we used App Engine to expose the NodeRED webserver running on port `1880` within the cluster.  However, we need to use `routes` in order to expose our service to the outside world.

```yaml
#...
editions:
- # ...
  spec:
    # ...
    routes:
    - type: http
      targetService: nodered
      targetPort: 1880
```

> [!TIP]
> The `targetPort` can be automatically configured if our application only exposes a single port (as is the case here), however we include it here for clarity.

### Marina

Lastly, once the application is up and running in your user's cluster.  The application will be added to their Marina (CodeZero desktop).  When the customer clicks on the NodeRED icon within their Marina, we want it to launch NodeRED in a new popup window.

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
        popup: true
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
      automated: true

      configs:
      - name: NODE_RED_ENABLE_PROJECTS
        value: true

      ports:
      - port: 1880
        type: http

      volumes:
      - mountPath: /data
        size: 5Gi
```

## Publish the Application

```bash
czctl app publish ./c6o.yaml
```

### Test the Applicatoin

There are two ways to test installing your application:

1. Using the CLI
1. Using the Store

### From the Marketplace

Navigate to the [Marketplace](https://codezero.io/marketplace), find your application, and begin the installation processes.

### Using the CLI

> [!NOTE]
> You will need the [CLI setup](./setup-cli) to connect with a CodeZero cluster using `KUBECONFIG`.

```bash
czctl install <your username>/nodejs-hello-world
```
