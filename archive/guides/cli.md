# Getting Started with the CodeZero CLI

CodeZero provides a simple CLI tool to help manage the development and testing
of CodeZero applications. This CLI is published in NPM as `@c6o/cli`, and it
should be installed globally.

> [!PROTIP] Get started right away with `npm install -g @c6o/cli`

## Requirements

[cli-requirements](../_fragments/cli-requirements.md ":include")

## Install the CLI

[cli-install](../_fragments/cli-install.md ":include")

## Configure the CLI

### Initialize the CLI

After the CLI is installed, to finalize the setup, please run:

```bash
> sudo czctl init
```

> [!NOTE] The CLI requires `sudo` access in order to modify your systems `hosts`
> file. The hosts file is used to define in-cluster DNS information on your
> local machine during a teleport session.

### Configure Access

Many CLI commands interact with a Kubernetes cluster. Therefore, the CLI
requires access to a kubeconfig for your cluster. This file can be specified via
the `KUBECONFIG` environment variable.

```yaml
export KUBECONFIG=~/my-kubeconfig.yaml
```

## Using the CLI

The CLI is called via the name `czctl`. To get more information about individual
commands, checkout the CLI reference, or run:

```bash
> czctl help
```
