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

We are happy to provide support for macOS and Linux at this time. The CodeZero CLI can be run on Windows using Windows Subsystem for Linux (WSL), but the Desktop App requires a native Mac or Linux operating system.

## Canary vs Stable Releases

We are constantly adding new features and addressing issues. As a result, we strive to have a fairly rapid  release of our tools. There are times when we want to get your feedback on new features or issues. This is particularly important when there are scenarios that are difficult for us to reproduce. For this reason, we have split our releases into Stable and Canary releases.

You can tell Stable versus Canary releases by the version numbers. Canary releases have pre-release labels in the semantic versions (e.g. 1.3.1-alpha.0 vs 1.3.1). In the previous example, 1.3.1 would be considered the latest Stable release until 1.3.2 is published.

### Canary

Canary releases are used for internal testing however, you are welcome to try them out. Please note that Canary releases have generally undergone light testing and may contain instabilities or features that are a work in progress.

> [!WARNING]
> Canary release may contain security vulnerabilities or may result in loss of data. Please do not use these releases on important clusters (e.g. your primary development cluster) and we do not recommend you make Canary releases available in your organization apart from testing.

We welcome feedback and bug reports related to Canary releases.

### Stable

In contrast, Stable releases have undergone our normal testing but may contain features that are explicitly marked **Preview**. Preview features may be work-in-progress and may disappear in subsequent releases but should be considered stable for use.

### Canary Installation

The installation instructions above describe Stable releases.

If you'd like to try out pre-release builds, you can upgrade to the latest Canary releases with:

``` bash
`curl -L https://releases.codezero.io/install-headless.sh | /bin/bash -s canary`
```
