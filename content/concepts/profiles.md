## Development Profiles

### Concepts

Profiles are groups of actions that need to be taken allow developers to prepare the environment around the modifying of a particular piece of code.

## Overview

As developers go about their day, each development task may require a combination of commands like teleport, intercept, environment, or mount.
Developers often spend the majority of their time developing a common set of primary services.
The intercepts, teleports and mounts are the same for these services day in and day out, so needing to always run the
individual commands can become tedious and prone to error. As new developers come into the team, or certain sets of
infrastructure have reduced work on them, it can become hard to remember commands.

Development Profiles solve this by capturing a set of related CodeZero commands into a single runnable "Development Profile".

## Illustration

For instance a teleport and intercept into a service named "sample-project-core" in namespace "sample-project" would require the following commands:

```bash
czctl teleport namespace my-namespace
czctl environment deployment -n my-namespace my-deployment env.sh -m yaml
czctl service intercept -n my-namespace my-service -l 4000
```

But a development profile with the same information could be run from the dashboard or via the cli with just the click of a mouse or a simple `czctl profile run` command.
