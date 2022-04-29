# CodeZero CLI

The CodeZero CLI provides simple access to the CodeZero API.

## Setup

### Requirements

[cli-requirements](../_fragments/cli-requirements.md ":include")

### Install the CLI

[cli-install](../_fragments/cli-install.md ":include")

### Configure the CLI

Once installed, there are two types of authentication that may be required for certain commands. Some commands attempt to operate on a CodeZero Kubernetes cluster, while others talk to the CodeZero hub API, and must be authenticated with your CodeZero Account.

#### Connect to CodeZero Cluster

In order to allow the CLI to perform operations such as `install`, the CLI requires access to a Kubernetes Cluster. In order to do this, you must configure the `KUBECONFIG` environment variable appropriately.

```bash
export KUBECONFIG=/path/to/kube.config
```

> [!NOTE]
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

#### Authenticate to CodeZero Hub

Some operations, such as `czctl app publish`, access to the CodeZero API, which must be authenticated with CodeZero. In order to login/logout, see the [auth commands](#Authentication).

## Commands

| Command                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| [teleport](#teleport)   | teleport your local environment into a cluster               |
| [intercept](#intercept) | intercept traffic for a remote service to your local machine |

| [auth](#auth) | authenticate the CLI against the c6o Hub |
| [install](#install) | install an application that is published on Hub |
| [uninstall](#uninstall) | uninstall application in the cluster |
| [app publish](#Publish-an-Application) | publish a new application spec or edition to Hub |
| [app install](#Publish-an-Application) | publish a new application spec or edition to Hub |

### Publish an Application

To publish an application, use the `app publish` command, and supply a valid [Application Manifest](./references/application-manifest).

```bash
czctl app publish ./c6o.yaml
```

### Install an Application

To install an application use the `install` command, and supply the `appId` of the application you'd like to install.

```bash
czctl install nodered
```

### Authentication

#### Using Web Browser

```bash
czctl auth login
```

#### Using a Raw Token

If you are running in a headless environment, or otherwise cannot launch a browser successfully to complete the authentication, instead you can supply a raw token.

```bash
czctl auth login --token <your-token-here>
```
