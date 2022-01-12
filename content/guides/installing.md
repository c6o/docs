# Installing CodeZero

CodeZero's developer tool helps in the development and testing of Kubernetes applications through
a Command Line Interface (CLI) and a Desktop application.

## Install the CodeZero CLI

[app-install](../_fragments/app-install.md ':include')

## Requirements

[app-requirements](../_fragments/app-requirements.md ':include')

## Initialize the CLI

After installing the CodeZero CLI, run:

```bash
> czctl start
```

> [!NOTE]
> CodeZero requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

## Configure the CLI

### Access Your Cluster

Many CLI commands need to interact with a Kubernetes cluster. Therefore, the CLI requires access to a `kubeconfig` for your cluster. By default, we use the current context in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to the location of the `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.
