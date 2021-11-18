# Development Profiles

A Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands. This allows developers to easily get several commands running for the tasks at hand without having to remember all the command line parameters for the command line tool. Just record a series of commands to create a Development Profile to be used later to rerun those commands again.

## Overview

As developers go about their day, each development task may require a combination of teleports, intercepts, and mounts. Developers often spend the majority of their time developing a common set of primary services. The intercepts, teleports and mounts are the same for these services day in and day out, so needing to always run the individual commands can become tedious and prone to error. As new developers come into the team, or certain sets of infrastructure have reduced work on them, it can become hard to remember commands.

Development Profiles solve this by capturing a set of related CodeZero commands into a single runnable "Development Profile".

## Getting Started

Creating a Development Profile is as simple as using `czctl` just as you would normally, but appending the `--save-profile [name]` flag.

> [!NOTE]
> See [Getting Started](./getting-started) for more information on getting started with the CLI.

### Examples

```bash
> czctl development teleport -n sample-project sample-project-echo -f ./project-env.env --save-profile echo-profile.yaml
> czctl service intercept -n sample-project sample-project-echo --save-profile
```

> [!PROTIP]
> If you just supply a profile name (without '.yaml'), a profile file will automatically be
> be created and placed in a folder inside `.codezero/develop/`.

## Sharing a Profile

We recommend storing session profiles in the folder `.codezero/develop/` at the root of your code repository as the CodeZero desktop application looks at this folder to find profiles and profiles can be shared amoung the development team more easily this way.

## Running a Profile

Currently, running a Development Profiles is best accomplished via the Desktop app. First launch the Desktop application and load a workspace by selecting your current project directory (the directory that contains a .codezero folder).  This will automatically search for all Development Profiles located in the `.codezero/develop/` folder of this workspace.
