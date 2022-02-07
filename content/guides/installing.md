# Installing CodeZero

CodeZero's developer tools help in the development and testing of Kubernetes applications through
a Command Line Interface (CLI) and a Desktop application.

## Install the CodeZero CLI

[app-install](../_fragments/app-install.md ':include')

### Requirements

[app-requirements](../_fragments/app-requirements.md ':include')

### Initialize the CLI

After installing the CodeZero CLI, run:

```bash
> czctl start
```

> [!NOTE]
> CodeZero requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

### Configure the CLI

#### Access Your Cluster

Many CLI commands need to interact with a Kubernetes cluster. Therefore, the CLI requires access to a `kubeconfig` for your cluster. By default, we use the current context in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to the location of the `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

## Install the Desktop App

> [!NOTE] The Desktop App is currently in Developer Preview. You will have to start the CodeZero Daemon using the CLI `czctl start` command. The Desktop App Installer does not install the CLI at this time.

You can download the Desktop App Installer for your platform from our [Desktop App downloads page](https://codezero.io/platform/desktop).

We are happy to provide support for MacOS and Linux at this time. The CodeZero CLI can be run on Windows using Windows Subsystem for Linux (WSL), but the Desktop App requires a native Mac or Linux operating system.

## Canary vs Stable Releases

We are constantly adding new features and addressing issues and strive to have a fairly rapid (weekly) release of our tools. There are times where we want to get your feedback on new features or issues particularly when there are scenarios that are difficult for us to reproduce. For this reason, we have split our releases into Canary and Latest releases.

These releases all bear version numbers and you can tell canary releases from pre-release labels in the semantic versions of the release (e.g. 1.3.1-alpha.0 vs 1.3.1). In the previous enable, 1.3.1 would be considered the latest Stable release until 1.3.2 is published.

### Canary

Canary releases are typically used for our own internal testing however, you are welcome to try them out especially if we need your feedback. Please note that Canary releases have only undergone light testing and may contain features that are a work in progress or instabilities. Please do not use these releases on important clusters (e.g. your engineering team's primary development cluster)

> [!WARNING]
> Canary release may contain security vulnerabilities or may result in loss of data. Use with caution!

We welcome feedback on these releases however, we will provide limited support for these releases unless we are actively working with you to address an outstanding issue.

If you are a DevOps or Engineering Lead, we do not recommend you make canary releases widely available to your teams.

### Stable

In contrast, Stable releases have undergone our normal testing but may contain features that are explicitly marked **Preview**. Preview features may contain instabilities, be work-in-progress and may disappear in subsequent releases.

### Canary Installation

The installation instructions above describe Stable releases. Canary releases are explicitly marked and depending on the tool, you will have to explicitly request canary releases. For example, when using NPM, the command is:

``` bash
npm install -g @c6o/cli@canary
```
