# CLI Release Notes

This document contains the release notes for the CodeZero CLI.

## Release Notes for v1.1.0

### New Features

* Volume mount command: You can now mount persistent volumes that any workload has mounted: `czctl [workload] mount [workload name] [mount root] -n [namespace]` 
Where the `workload` is cronjob, deployment, job, pod, or statefulset (Mounting all volumes in a namespace is not supported), 
the `workload name` is the name of the workolad, the `mount root` is a local directory where the volumes should be mounted, 
and the `namespace` is the namespace where the workload resides.

Note: On Linux: you will need to use `sudo -E` to run the czctl workload mount command.  

Note: On first read or write to a mounted volume there will be a delay, but on subsequent writes performance will be improved.

Note: Make sure you have a teleport session open before using the mount commmand: `czctl [workload] teleport [workload name] -n [namespace]`

Note (Known Issue): If you have mounted some volumes, do not use `czctl session close --all` as this will close teleport before trying to unmount volumes. If you end up in this state, re-teleport and expliclty close the mount session first and then the teleport session. 

## Release Notes for v1.0.4

### New Features

* Support for intercepting all traffic (#1997)

### Bug Fixes

* Environment monitor now checks process rather than the file to determine if a session is open (#2000)

## Release Notes for v1.0.3

### Bug Fixes

* Increased timeouts for pod-less decoy (#1982)

## Release Notes for v1.0.2

### Bug Fixes

* Don't allow names over 63 characters as this will be used in a selector.(#1974)

## Release Notes for v1.0.1

### New Features

* Multi-port services support (#1945)
    
## Release Notes for v1.0.0

### New Features

* Tunnel supports purge to restore hosts file and loopback interface #1909 (#1957)

### Bug Fixes

* The success contextual banner shows and fades out as expected (#1955)
* Intercept supports HTTPS / TLS (#1951)

## Release Notes for v0.3.0

### BREAKING CHANGES

* There are changes to the teleport binary that need to be applied, so existing users MUST re-run `sudo czctl init`.

### New Features

* Support teleporting to headless and podless services

### Known Issues

* Cannot *intercept* a headless and podless service

## Release Notes for v0.2.8

### New Features

* Support for headless services
* Increase the timeout of the teleport tunneller.
* Stability Improvements

## Release Notes for v0.2.7

### BREAKING CHANGES

* Any scripting that assumes that all namespaces will be teleported needs to be modified to use the new flags to add namespaces other than the one being referenced in the teleport command. The `--all` flag allows you to connect to all namespaces. You can also add more namespaces with additional `-a namespace1 -a namespace2` 

### Bug Fixes

* Fix for teleport cleanup

### Migration notes from v0.2.6 to v0.2.7

To upgrade from 0.2.6 to 0.2.7 you will need to:

1. Close your current sessions: `czctl session close --all`
1. Restore your `/etc/hosts` and remove the Kubernetes services referenced there. You can copy `~/hosts.original` to `/etc/hosts` or edit the `/etc/hosts` file directly using sudo. Make sure that `~/hosts.original` is correct before using it to restore things using `sudo cp ~/hosts.original /etc/hosts`. If the `hosts.original` files is not correct, then edit the `/etc/hosts` file directly (use sudo to edit this file with your favourite editor: `sudo vi /etc/hosts`
1. Remove `~/hosts.original`

You can do this before or after installing the new @c6o/cli version 0.2.7: `npm update -g @c6o/cli`, `npm install -g @c6o/cli@0.2.7` or `npm install -g @c6o/cli@latest`

To make sure you have the right version, use czctl version . The output should look something like this:
```bash
> czctl version
@c6o/cli/0.2.7 darwin-arm64 node-v16.2.0
```

## Release Notes for v0.2.6

### BREAKING CHANGES

* There are changes to the teleport binary that need to be applied, so existing users MUST re-run `sudo czctl init`.

### Bug Fixes

* Fix error messaging to users of unsupported Node versions (<= 12.x)
* Fixed some `czctl deployment` arguments not being properly recognized [#1834, #1837]

### New Features

* Teleport provides feedback to the user once all connections are fully setup [#1766, #1827]
* Teleport auto-detects when new intercepts are added/removed, so restart is no longer required [#1808]
* Extended teleport to work with other workloads (pods, cronjobs, jobs, statefulsets) [#1778]

### Outstanding Issues

* NodesJS <= 12.x is not supported.
* Cannot intercept more than 4 services simultaneously from the same machine.
* Cannot teleport to headless services yet

> [!WARNING]
> We expect the cli commands to change in the next release. We are considering reversing the commands from `<resource> <action>` to `<action> <resource>` and dropping the term `intercept`.
> For instance, you will run: `czctl teleport deployment ...` and `czctl teleport service ...` and the parameters will change depending on the resource.
> We may also use a generic term like `connect` so as not to confuse our tool with tools like `goteleport.com`.

## Release Notes for v0.2.5

### BREAKING CHANGES

* `czctl service intercept` port flags changed. `-p` is now `-r` for remote and `-o` is now `-l` for local.
* We have removed having to run sudo each time you teleport. Now, after installing the CLI, a user must run `sudo czctl init` once and from then on, sudo is no longer required. [#1744]

### Bug Fixes

* Fix Teleport hanging forever on Node 14.x
* Fix Teleport environment file flag to support absolute paths.
* Fix intercept's ngrok tunnels closing unexpectedly.
* Fix various CLI error messages and suggestions to display more useful information.
* Fix namespaces and service names being passed through and displayed as 'undefined'

### New Features

* Support multiple users intercepting the same service(s). Requires users to use the same header key but different values. [#1711, #1757]
* Cluster based session management, so user can list and clean up sessions created by other users. [#1688]
* Allow intercepting up to 4 services simultaneously per machine. [#1783]
* `sudo -E` is no longer required for `czctl teleport`. [#1744]
* Teleport no longer requires the environment file flag (-f).

### Outstanding Issues

* NodesJS <= 12.x is not supported.
* Cannot intercept more than 4 services simultaneously from the same machine.
* Teleport must be run after all intercepts. Please stop and run teleport after any `czctl service intercept` calls to take the new intercept into account locally.
* Teleport should provide feedback to the user so they know when all services have been fully setup.
