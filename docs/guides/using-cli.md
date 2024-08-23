---
sidebar_position: 4
---

# Using the CLI

Codezero's tools can be used via the Desktop app or the CLI. If you installed the Desktop app you also have the CLI.

This section is about getting up and running with the CLI.

:::note
For Windows you'll need to run `czctl` as an Administrator as it needs to modify your DNS settings.  You can do this by starting
a Command Prompt or Windows PowerShell with `Run as Administrator`.
:::

## Configure the CLI

Before you get started, you need to log in to your Codezero account.

```bash
czctl auth login
```

## Getting Help

The CLI is invoked via the `czctl` command. To get more information about individual commands, see the associated command under References (e.g. [Consume](../references/command-line#consume)), or run:

```bash
> czctl help
```

## Initialize the CLI

Start the Codezero daemon (background service) by running:

```bash
> czctl start
```

:::note
For MacOS and Linux Codezero requires `sudo` access to modify your DNS settings.
:::

## Get the current status

To get the current status of `codezero` that includes the authenicated user, organization and teamspace run.

```bash
> czctl status
```

## Run commands

The `czctl` command loosely follows the conventions of the `kubectl` command, where each command references a Kubernetes resource (like a deployment or service), and where a namespace is given with a `-n` flag.

Use `czctl <command> --help` to see the options available for a given command.

Most czctl commands take the form `czctl <command> <sub-command>`, and `czctl <command> <sub-command> --help` will display the argument(s) and flag(s) available for that command.

Some examples:

```bash
> czctl serve list --help
```

```bash
> czctl consume edit --help
```

```bash
> czctl space select --help
```

---
