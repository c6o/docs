## Development Profile

### Concepts

A development profile is a collection of CodeZero commands that coordinate together to create a specific development scenario.
For instance, a developer may want to teleport their machine into a cluster and intercept a particular service.
A development profile remembers the parameters required so that the developer doesn't have to remember the parameters
to recreate a scenario when they want to debug something.

For instance a teleport and intercept into a service named "sample-project-core", and mount the deployments volumes
in namespace "sample-project" would require the following commands:

```bash
czctl namespace teleport sample-project -f env.sh
czctl service intercept sample-project-core -l 3010 -n sample-project
czctl deployment mount sample-project-core ./mnt -n sample-project
```

But a development profile with the same information could be run from the dashboard or via the cli with just the click of
a mouse or a simple `czctl profile run` command.

### Creating a Development Profile

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜  czctl namespace teleport sample-project -f env.sh --save-profile dev-profile.yaml

Command has been saved to a Development Profile. (dev-profile.yaml)
```

### Appending More

Commands can be added by running another command and saving to the same profile with a "save-profile-mode" flag
with the value "append". Other values for this flag are 'create' and 'replace'.

```bash
➜  czctl service intercept sample-project-core -l 3010 -n sample-project --save-profile dev-profile.yaml --save-profile-mode append

Command has been saved to a Development Profile. (dev-profile.yaml)

➜  czctl deployment mount sample-project-core ./mnt -n sample-project --save-profile dev-profile.yaml --save-profile-mode append

Command has been saved to a Development Profile. (dev-profile.yaml)
```

If you forget this flag, the CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl service intercept sample-project-leaf -n sample-project --save-profile dev-profile.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append
  replace
```
