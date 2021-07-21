# Getting Started with the CodeZero CLI

CodeZero provides a simple CLI tool to help manage the development and testing of CodeZero applications.  This CLI is published in NPM as `@c6o/cli`, and it should be installed globally.

> [!PROTIP]
> Get started right away with `npm install -g @c6o/cli`

## Requirements

[cluster-requirements](../_fragments/cli-requirements.md ':include')

## Install the CLI

[cluster-install](../_fragments/cli-install.md ':include')

## Configure the CLI

### Initialize the CLI

After the CLI is installed, to finalize the setup, please run:

```bash
> sudo czctl init
```

> [!NOTE]
> The CLI requires `sudo` access in order to modify your systems `hosts` file.  The hosts file
> is used to define in-cluster DNS information on your local machine during a teleport session.

### Access Your Cluster

Many CLI commands interact with a Kubernetes cluster.  Therefore, the CLI requires access to a kubeconfig for your cluster.  This file is specified via the `KUBECONFIG` environment variable.

```bash
export KUBECONFIG=/path/to/kube.config
```

> [!NOTE]
> This is the same as configuring the `kubectl` CLI.  See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

## Using the CLI

The CLI is called via the name `czctl`.  To get more information about individual commands, checkout the CLI reference, or run:

```bash
> czctl help
```

### Teleport

To get started with teleport, run:

```bash
> czctl namespace teleport
```

And follow the prompts.  For a full list of teleport flags and options, check out the [teleport CLI references](../references/teleport).

> [!NOTE]
> Learn more about what teleport does, and why you might want to use it [here](../concepts/teleport).

### Intercept

To get started with intercept, run:

```bash
> czctl service intercept
```

And follow the prompts.  For a full list of intercept flags and arguments, check out the [intercept CLI references](../references/intercept).

> [!NOTE]
> Learn more about what teleport does, and why you might want to use it [here](../concepts/intercept).