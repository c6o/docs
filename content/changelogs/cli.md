# CLI Release Notes

This document contains the release notes for the CodeZero CLI.

## [1.3.2](https://github.com/c6o/node-monorepo/compare/v1.3.1...v1.3.2) (2022-02-10)

### Breaking Changes

* Before upgrading, ensure existing CodeZero instance is fully stopped (run `czctl stop`)

KNOWN ISSUES: This stable release does not fix the issue where performing the same intercept twice kills the first intercept. We are aware of this issue and are working on a resolution (See: [#44](https://github.com/c6o/roadmap/issues/44) for details)

### ✨ Features

* Added support for pre-release canary builds (full details in [our docs](https://docs.codezero.io/#/guides/installing?id=canary-vs-stable-releases))
* **cli:** Return non-zero status code on errors ([#41](https://github.com/c6o/roadmap/issues/41))
* **daemon:** Backup existing kubeconfig on startup, so it can be restored if needed [#2491]
* **daemon:** Use the current context's default namespace, if set [#2191]
* **desktop:** Don't show "podless-service" remote sessions in the dashboard [#2558]
* **desktop:** When the dashboard is open, show notifications there instead of in system notifications [#2507]
* **desktop:** Add activity feed screen null experience.
* **desktop:** Supply additional information in the intercept display description [#2572]

### 🐛 Bug Fixes

* **cli:** CLI fails with `Expected columns` error when output is piped/captured ([#40](https://github.com/c6o/roadmap/issues/40))
* **cli:** Prompt the user for resource name and local directory if they are not given [#2495]
* **cli:** Improved error message when run from windows [#2610]
* **cli:** Fix error and status propogation from backend to CLI response and remove redundant messages [#2538]
* **cli:** session flag fixed for sub-sessions, environment command descriptions updated. ([#2624]
* **daemon:** Graceful shutdown, exit codes and dealing with older daemons [#2718]
* **daemon:** properly detect locally running daemon via port [#2575]
* **daemon:** fix error handling when dealing with problems with clusters, namespaces and resources on the server [#2506]
* **daemon:** gracefully handle kubeconfigs that are missing clusters, contexts and/or users [#2504]
* **desktop:** Don't show notification on dialog cancel [#2762]
* **desktop:** Fix a typo in the UI for the local and remote ports [#2716]
* **desktop:** Fix the version displaying in the screen from the About CodeZero menu [#2663]
* **mount:** No error is reported if the NFS server is not available locally yet ([#2619]
* **vscode:** Modify vscode to work with new daemon API [#2696]
* **vscode:** Fix vscode sourcemap resolution for sub-dependencies

## Release Notes for v1.3.1

### Breaking Changes

* Mounted volume locations will now maintain the directory structure of the related workload:
  Example:  For example, a pod with mounts at `/var/lib/my-app` and `/data`, when mounted with `czctl mount deployment [name] /mnt/test` will create the local mounts at `/mnt/test/var/lib/my-app` and `/mnt/test/data`.

### Bug Fixes

* Fix warning and stack trace related to a module not found error returned at the end of each command. [[#39](https://github.com/c6o/roadmap/issues/39)]

## Release Notes for v1.3.0

### Breaking Changes
* Re-order czctl command argument order to `czctl [command] [workload type]` 
  NOTE: The previous ordering will continue to be supported, but documentation going forward will prefer this new order

### Features

* Add and remove workspaces from Desktop App
* Add and remove clusters from Desktop app
* Backup kubeconfigs on edit
* Show notifications in dashboard when open
* Remove extra sessions rom main dashboard screen
* Detect start/stop of daemon via Desktop App
* Dynamically load doc links, to stay up to date with latest docs
* Consolidated analytics across CLI, Desktop App, and VSCode
* More descriptive session display information with --details flag
* Clean up `czctl help` documentation
* Added standalone `czctl environment [workloadtype] [workload]` to output environment variables without being tied to a teleport session

### Bug Fixes

* Clean up redundant messaging on czctl start
* CLI to report clear messaging when run on Windows
* Ensure mount command reports failure if there was an internal error
* Teleport to missing resource returns no output
* Return an error if mounting a workload that has no mounts
* Ensure teleport runs before mount command, when in the same development profile
* Error during startup when kubeconfig is missing from home directory

## Release Notes for v1.2.3

### Bug Fixes

* Fixed a critical bug with the @oclif/plugin-help dependency that was preventing all previous versions of the CLI from installing correctly.

## Release Notes for v1.2.2

### Features

* Check for git repository root when creating development profiles [#2413]
* Enable Desktop application's ability to auto-launch the CodeZero daemon.
* Prompt user if namespace is missing, rather than throw an error.

### Bug Fixes

* Fix teleport environment variable output if path does not exist. [#2389]
* Ensure mount is cleaned up prior to teleport session. [#2276]
* Fix CLI checks for intercept and teleport versions.
* Gracefully handle errors when checking Daemon version.
* Improved reliability for detecting if Daemon is already running.

## Release Notes for v1.2.1

### BREAKING CHANGES

* Close the existing CodeZero background process **before** upgrading (`czctl stop`).  In case of issues, the old background service can be shutdown using: `sudo npx pm2 kill`.

### Features

* Better daemon management, so the CLI and desktop app can share the same binary and detect when an upgrade needs to be performed.

### Bug Fixes

* Fix teleport environment output file not being created [#2237]
* Fix teleport output file path resolution to support relative paths [#2237]
* Session close with namespace error [#2309]
* Multiple fixes for saving of development profiles [#2346]
* Teleporting to non-existent workload produces no error [#2373]
* Fix closing existing sessions if the active cluster changes [#2208]
* Various fixes related to the desktop application (coming soon)

## Release Notes for v1.2.0

### BREAKING CHANGES

* Please use `czctl start` instead of `sudo czctl init` when starting up the CLI.  The `start` command does not need to be run with `sudo` explicitly, as the command will prompt you for your password if permission elevation is required.

### New Features

* This release introduces a daemon service on your local machine to manage the long running session (in preparation for [[#21](https://github.com/c6o/roadmap/issues/21)]).
* Added `czctl start` and `czctl stop` commands (`init` is now an alias of `start`) to manage the daemon's lifecycle.
* Volume mount command: now works on Linux without `sudo`. [[#25](https://github.com/c6o/roadmap/issues/25)]
* Auto-Restart interceptor tunnel to avoid tunnel timeout. [[#26](https://github.com/c6o/roadmap/issues/26)]
* `sudo` is no longer required to startup the CLI. [[#23](https://github.com/c6o/roadmap/issues/23)]
* Added `--save-profile` flag to `teleport`, `intercept` and `mount` commands to prepare for use of Development Profiles.

### Bug Fixes

* Fixed podless services with no endpoint causing crash
* Fixed issue when registering configuration watcher
* Fixed intercept session cleanup on close
* Fixed NVM environments unable to reliably initialize the CLI [[#23](https://github.com/c6o/roadmap/issues/23)]

Note (Known Issue): Intercept currently does NOT work with Node 17.x on MacOS. [[#24](https://github.com/c6o/roadmap/issues/24)]

## Release Notes for v1.1.1

### Bug Fixes

* Update package.json "pack" script to avoid conflict with brew installation (#2071)

## Release Notes for v1.1.0

### New Features

* Volume mount command: You can now mount persistent volumes that any workload has mounted: `czctl [workload] mount [workload name] [mount root] -n [namespace]`
Where the `workload` is cronjob, deployment, job, pod, or statefulset (Mounting all volumes in a namespace is not supported),
the `workload name` is the name of the workload, the `mount root` is a local directory where the volumes should be mounted,
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
