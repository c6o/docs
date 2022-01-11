# Getting Started with CodeZero

Before getting started, there are a few things that you should setup first.

## Your Private Cloud

### Install CodeZero

To set up your first CodeZero Cloud, create a [CodeZero account](https://codezero.io), and follow the onboarding processes to create and set up your first Cloud.

> [!NOTE]
> This process will involve creating a Kubernetes Cluster from the provider of your choice.

### Install an Application

Once your Cloud is ready, click on the Cloud name in My Clouds to take you to the Marina, which is the CodeZero desktop application for managing your cloud. From here, you can navigate your apps, or checkout the Store to install additional applications.

## The CodeZero CLI

CodeZero provides a simple CLI tool to help manage the development and testing of CodeZero applications. This CLI is published in NPM as `@c6o/cli`, and it should be installed globally.

### Requirements

[cluster-requirements](../_fragments/cli-requirements.md ':include')

### Install the CLI

[cluster-install](../_fragments/cli-install.md ':include')

### Configure the CLI

Once installed, there are two types of authentication that may be required for certain commands. Some commands operate on a CodeZero Cloud, while others need access to the CodeZero Hub API, and must be authenticated with your CodeZero Account.

#### Connect to the Hub API

Some operations, such as `czctl app publish`, access to the CodeZero API, which must be authenticated with CodeZero. 

```bash
czctl auth login
```

> [!NOTE]
> See the [auth commands](../references/cli#Authentication) reference for more details.

#### Connect to your Private Cloud

In order to allow the CLI to perform operations such as `install`, the CLI requires access to a Kubernetes Cluster. In order to do this, you must configure the `KUBECONFIG` environment variable appropriately.

```bash
export KUBECONFIG=/path/to/kube.config
```

> [!NOTE]
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.
