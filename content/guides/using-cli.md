# Using the CLI

CodeZero's tools can be used via the Desktop app or the CLI. If you installed the Desktop app you also have the CLI.

This section is about getting up and running with the CLI.

## Configure the CLI

Many CLI commands need to interact with a Kubernetes cluster, therefore the CLI requires access to a `kubeconfig` for your cluster.

### Accessing Your Cluster

By default, CodeZero uses the default cluster in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to point to your `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

## Getting Help

The CLI is invoked via the `czctl` command. To get more information about individual commands, see the associated command under References (e.g. [Teleport](https://docs.codezero.io/#/references/teleport)), or run:

```bash
> czctl help
```

## Initialize the CLI

Start the CodeZero daemon (background service) by running:

```bash
> czctl start
```

> [!NOTE]
> CodeZero requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

## Run commands

The `czctl` command loosely follows the conventions of the `kubectl` command, where each command references a Kubernetes resource (like a deployment or service), and where a namespace is given with a `-n` flag.

Use `czctl <command> --help` to see the options available for a given command.

Most czctl commands take the form `czctl <action> <resource>`, and `czctl <action> <resource> --help` will display the argument(s) and flag(s) available for that command.

Some examples:

```bash
> czctl teleport namespace --help
```

```bash
> czctl intercept service --help
```

```bash
> czctl mount --help
```

```bash
> czctl config --help
```

> [!NOTE]
> Session commands are an exception in that they take the form `czctl <resource> <action>`.

```bash
> czctl session list --help
```

```bash
> czctl session close --help
```
