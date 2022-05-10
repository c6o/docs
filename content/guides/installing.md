# Installing CodeZero

CodeZero's developer tools help in the development and testing of Kubernetes
applications through a Command Line Interface (CLI) and a Desktop application.

[app-install](../_fragments/app-install.md ":include")

## Requirements

[app-requirements](../_fragments/app-requirements.md ":include")

## Install Only the CodeZero CLI

If you are in a headless environment, or don't want to install the Desktop GUI,
you can run:

```bash
curl -sL https://releases.codezero.io/install-headless.sh | /bin/bash
```

to install a headless version of the tool, which only includes the `czctl` CLI
and background services.

### Installing a Specific Version

If you want to install a specific version of our CLI or reinstall an older you
can run:

```bash
curl -sL https://releases.codezero.io/install-headless.sh | /bin/bash -s 1.6.0
```

> [!WARNING] Older releases might contain bugs that have since been fixed. We
> always recomend running the lastest version of both our CLI and Desktop
> products. Additonally, before opening any bug reports, please update the
> latest stable release. If you still encouter an issue, please report it on our
> public roadmap.

## Canary vs Stable Releases

We are constantly adding new features and addressing issues. As a result, we
strive to have a fairly rapid release of our tools. There are times when we want
to get your feedback on new features or issues. This is particularly important
when there are scenarios that are difficult for us to reproduce. For this
reason, we have split our releases into Stable and Canary releases.

You can tell Stable versus Canary releases by the version numbers. Canary
releases have pre-release labels in the semantic versions (e.g. 1.3.1-alpha.0 vs
1.3.1). In the previous example, 1.3.1 would be considered the latest Stable
release until 1.3.2 is published.

### Canary

Canary releases are used for internal testing however, you are welcome to try
them out. Please note that Canary releases have generally undergone light
testing and may contain instabilities or features that are a work-in-progress.

> [!WARNING] Canary release may contain security vulnerabilities or may result
> in loss of data. Please do not use these releases on important clusters (e.g.
> your primary development cluster) and we do not recommend you make Canary
> releases available in your organization apart from testing.

We welcome feedback and bug reports related to Canary releases.

#### Canary Installation

If you'd like to try out pre-release builds, you can upgrade to the latest
Canary release with:

```bash
curl -L https://releases.codezero.io/install-headless.sh | /bin/bash -s canary
```

### Stable

In contrast to Canary releases, Stable releases have undergone our normal
testing but may contain features that are explicitly marked **Preview**. Preview
features may still be a work-in-progress but should be considered stable for
use.
