---
sidebar_position: 2
---

# Using the CLI

Codezero's tools can be used via the Desktop app or the CLI. If you installed the Desktop app you also have the CLI.

This section is about getting up and running with the CLI.

## Configure the CLI

Many CLI commands need to interact with a Kubernetes cluster, therefore the CLI requires access to a `kubeconfig` for your cluster.

### Accessing Your Cluster

By default, Codezero uses the default cluster in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to point to your `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

:::note
Some commands let you explicitly specify a kubeconfig file.
This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.
:::

## Getting Help

The CLI is invoked via the `czctl` command. To get more information about individual commands, see the associated command under References (e.g. [Teleport](/references/command-line?id=teleport)), or run:

```bash
> czctl help
```

## Initialize the CLI

Start the Codezero daemon (background service) by running:

```bash
> czctl start
```

:::note
Codezero requires `sudo` access to modify your system's `hosts` file. The `hosts` file is used to define in-cluster DNS information on your local machine during a teleport session.
:::

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

:::note
Session commands are an exception in that they take the form `czctl <resource> <action>`.
:::

```bash
> czctl session list --help
```

```bash
> czctl session close --help
```

---

## Configuration

The primary concept behind the Configuration command is to help developers to develop and debug their code locally by bringing in configuration from a workload.

### Use Case

A problem that developers encounter is that they need to locally use the same configuration that a remotely deployed service uses. Finding the configuration and setting of a remote service so that the local service can use it is a time-consuming task. Additionally, if the configuration changes on the server, the developer may not be aware of those changes when they occur. Configurations need to be updated locally as they change remotely.

Codezero resolves this by enabling developers to bring down environment variables from workloads they are modifying and have the local configuration files update as they change on the server.

### Under the Hood

The Configuration command starts a watch of the configuration files of the workload and writes to the given environment file as configuration changes in the cluster.

### Residue

The configuration command makes no changes to your remote cluster and the only residue is the file where the configuration is written and the watcher process.

However, if the configuration watcher continues to run after a clean/close has been performed, you will need to find the process id and do a `kill -9` of the configuration monitor process.

Here's an example of getting the process ids and using `kill -9` to end these processes:

```bash
> ps xau | grep 'child.js' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
65120 -> /Users/username/.codezero/bin/czdaemon/czdaemon /snapshot/node-monorepo/gulpfile.js/tmp/czdaemon/package/lib/engine/services/monitors/env/child.js
```

```bash
> sudo kill -9 65120
```

### Command Reference

See the [Configuration](/references/command-line?id=configuration) command reference for more information.
