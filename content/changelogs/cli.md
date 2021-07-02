# CLI Release Notes

This document contains the release notes for the CodeZero CLI.

> [!WIP]
> The CLI is currently in an alpha pre-release state, and may include breaking changes between releases.

## Release Notes for v0.2.5

### BREAKING CHANGES

* `czctl service intercept` port flags changed.  `-p` is now `-r` for remote and `-o` is now `-l` for local.
* We have removed having to run sudo each time you teleport. Now, after installing the CLI, a user must run `sudo czctl init` once and from then on, sudo is no longer required. [#1744]

### Bug Fixes

* Fix Teleport hanging forever on Node 14.x
* Fix Teleport environment file flag to support absolute paths.
* Fix intercept's ngrok tunnels closing unexpectedly.
* Fix various CLI error messages and suggestions to display more useful information.
* Fix namespaces and service names being passed through and displayed as 'undefined'

### New Features

* Support multiple users intercepting the same service(s).  Requires users to use the same header key but different values. [#1711, #1757]
* Cluster based session management, so user can list and clean up sessions created by other users. [#1688]
* Allow intercepting up to 4 services simultaneously per machine. [#1783]
* `sudo -E` is no longer required for `czctl teleport`.  [#1744]
* Teleport no longer requires the environment file flag (-f).

### Outstanding Issues

* NodesJS <= 12.x is not supported.
* Cannot intercept more than 4 services simultaneously from the same machine.
* Teleport must be run after all intercepts. Please stop and run teleport after any `czctl service intercept` calls to take the new intercept into account locally.
* Teleport should provide feedback to the user so they know when all services have been fully setup.

> [!WARNING]
> We expect the cli commands to change in the next release. We are considering reversing the commands from `<resource> <action>` to `<action> <resource>` and dropping the term `intercept`.
> For instance, you will run: `czctl teleport deployment ...` and `czctl teleport service ...` and the parameters will change depending on the resource.
> We may also use a generic term like `connect` so as not to confuse our tool with tools like `goteleport.com`.
