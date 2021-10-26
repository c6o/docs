# Development Profiles

A Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands, so developers can easily get their sessions setup and running for the tasks at hand.

## Overview

As developers go about their day, each development task may require a combination of teleports, intercepts, and mounts. Developers often spend the majority of their time developing a common set of primary services, so needing to always run the individual commands can become tedious, hard to remember, and prone to error.

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

We recommend storing session profiles in the folder `.codezero/develop/` at the root of your code repository.

## Running a Profile

Currently, running a Development Profiles is best accomplished via the Desktop app.  First launch the Desktop application, and load a workspace by selecting your current project directory.  This will automatically search for all Development Profiles located in the `.codezero/develop/` folder of this workspace.
