# Development Profiles Guide

A Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands. This allows developers to easily get several commands running for the tasks at hand without having to remember all the command line parameters for the command line tool. Just record a series of commands to create a Development Profile to be used later to rerun those commands again.

## Overview

A development profile creates a specific development scenario. For instance, a developer may want to teleport their machine into a cluster and intercept a particular service. A development profile remembers the parameters required so that the developer doesn't have to remember them to recreate a scenario when they want to debug something.

## Getting Started

Creating a Development Profile is as simple as using `czctl` just as you would normally, but appending the `--save-profile [name]` flag.

> [!NOTE]
> See [CodeZero Overview](../welcome/overview.md) and [Installing CodeZero](./installing.md) for more information on getting started with the CLI.

### Examples

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜  czctl teleport namespace sample-project --save-profile dev-profile.yaml

Command has been saved to a Development Profile: (dev-profile.yaml)
```

> [!NOTE]
> Development Profiles in preview and are subject to change.

```bash
➜  czctl env deployment -n sample-project sample-project-core env.sh --save-profile dev-profile2.yaml

Command has been saved to a Development Profile: (dev-profile.yaml)
```

> [!PROTIP]
> If you are running the command from a directory within a .codezero/ directory, a profile file will automatically be created and placed in a folder inside `.codezero/develop/`.

### Appending More

Commands can be added by running another command and saving to the same profile with a "save-profile-mode" flag
with the value "append". Other values for this flag are 'create' amd 'replace'.

```bash
➜  czctl intercept service sample-project-core -n sample-project -l 3010 --save-profile dev-profile.yaml --save-profile-mode append

Command has been saved to a Development Profile: (dev-profile.yaml)
```

If you forget this flag, the CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl mount deployment -n sample-project sample-project-core ./mnt --save-profile dev-profile.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append
  replace
```

## Sharing a Profile

We recommend storing session profiles in the folder `.codezero/develop/` at the root of your code repository as the CodeZero desktop application looks at this folder to find profiles and profiles can be shared among the development team more easily this way.

## Running a Profile

Currently, running a Development Profiles is best accomplished via the Desktop app. First launch the Desktop application and load a workspace by selecting your current project directory (the directory that contains a .codezero folder). This will automatically search for all Development Profiles located in the `.codezero/develop/` folder of this workspace.
