<!-- markdownlint-disable MD040 MD024 MD033 -->

# CodeZero CLI Reference

## czctl

The base command for the CodeZero CLI.

### Installation

Install the CLI tool using NPM

```
npm install -g @c6o/cli
```

### Installation

The CLI tool is published as a public NPM package called `@c6o/cli`.

#### Prerequisits

- NPM (Version 6.14+)
- Node (Version 12.16+)
- Linux requires "libsecret-1-dev" (On Ubuntu run `sudo apt-get install libsecret-1-dev`)

#### Install using NPM

```
sudo npm install -g @c6o/cli --unsafe-perm=true
```

NOTE: '--unsafe-perm' is currently required to allow the dependency 'keytar' to build successfully.

### Commands

| Command                 | Description                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [auth](#auth)           | authenticate the CLI against the c6o Hub                                                                                                                  |
| [install](#install)     | install an application that is published on Hub                                                                                                           |
| [provision](#provision) | install (provision) an application using a local application spec file during development                                                                 |
| [uninstall](#uninstall) | uninstall application in the cluster                                                                                                                      |
| [update](#update)       | update an application in the cluster with the application spec patch during development. This may cause the application to reconfigure itself and restart |
| [publish](#publish)     | publish a new application spec or edition to Hub                                                                                                          |

<a name="auth" id="auth"></a>

## czctl auth

```bash
czctl auth login
czctl auth logout
```

<a name="install" id="install"></a>

## czctl install

```bash
czctl install APPNAME [OPTIONS]
```

<a name="provision" id="provision"></a>

## czctl provision

```bash
czctl provision PATH [--package SRC_DIR] [OPTIONS]
```

To configure and run a provisioner from the CLI, the user creates a file containing an application spec and runs the provisioner.

If there are options not specified either on the command line, or in the application spec, the provisioner will prompt the user to supply values.

<a name="uninstall" id="uninstall"></a>

## czctl uninstall

```bash
czctl uninstall APPNAME [OPTIONS]
```

This will look for an application in the cluster. If there is more than one with this name the CLI will prompt for a namespace if required.

If there are deprovisioning options that are available but not specified in the manifest or on the command line, the CLI will prompt.

<a name="update" id="update"></a>

## czctl update

```bash
czctl update PATH [OPTIONS]
```

<a name="publish" id="publish"></a>

## czctl publish

```bash
czctl publish PATH [OPTIONS]
```

> TODO: Not implemented yet.
