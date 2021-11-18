# Installing the CodeZero CLI

CodeZero provides a simple CLI tool to help manage the development and testing of Kubernetes applications. Install the latest version globally from NPM using `npm install -g @c6o/cli`.

## Install the CLI

[cluster-install](../../_fragments/cli-install.md ':include')

## Requirements

[cluster-requirements](../../_fragments/cli-requirements.md ':include')

## Configure the CLI

### Initialize the CLI

After installing the CLI, run:

```bash
> czctl start
```

> [!NOTE]
> The CLI requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

### Access Your Cluster

Many CLI commands need to interact with a Kubernetes cluster. Therefore, the CLI requires access to a `kubeconfig` for your cluster. By default, we use the default cluster in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to your `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

## Using the CLI

The CLI is invoked via the `czctl` command. To get more information about individual commands, check out the CLI reference, or run:

```bash
> czctl help
```
The czctl command loosely follows the conventions of the kubectl command where each command refereneces a kubernetes resource 
(like a deployment or service) and where a namespace is given (with a -n flag). With each kubernetes resource there are a number of actions that can be taken. Use `czctl <resource> --help` to see the actions available for a command and `czctl <resource> <action> --help` to see the flags 
available for that action. For example:
```bash
> czctl deployment teleport --help
```
or
```bash
> czctl service intercept --help
```
