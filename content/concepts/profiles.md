## Development Profile

### Concepts

A development profile is a collection of CodeZero commands that coordinate together to create a specific development scenario.
For instance, a developer may want to teleport their machine into a cluster and intercept a particular service.
A development profile records the specifications for running one ore more commands so that the developer doesn't have to remember all of the required parameters
to recreate a scenario when they want to debug something.

For instance a teleport and intercept into a service named "sample-project-core" in namespace "sample-project" would
require the following commands:

```bash
czctl namespace teleport sample-project -f env.sh
czctl service intercept sample-project-core -l 3010 -n sample-project
```
But a development profile with the same information could be run from the dashboard or via the cli with just the click of
a mouse or a simple `czctl profile run` command.

For more, see:

* [Creating a Development Profile](../guides/development-profiles.md)
* [Development Profile Reference](../reference/development-profile.md)