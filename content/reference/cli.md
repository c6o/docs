# CodeZero CLI Reference

## c6o

The base command for the c6o CLI.

### Commands

| Command | Description |
|---------|-------------|
| [auth](#auth) | authenticate the CLI against the c6o Hub |
| [install](#install) | install an application that is published on Hub |
| [provision](#provision) | install (provision) an application using a local application spec file during development |
| [uninstall](#uninstall) | uninstall application in the cluster |
| [update](#update) | update an application in the cluster with the application spec patch during development.  This may cause the application to reconfigure itself and restart |
| [publish](#publish) | publish a new application spec or edition to Hub |

<a name="auth" id="auth"></a>
## c6o auth

```bash
c6o auth login
c6o auth logout
```

<a name="install" id="install"></a>
## c6o install

```bash
c6o install APPNAME [OPTIONS]
```

<a name="provision" id="provision"></a>
## c6o provision

```bash
c6o provision PATH [OPTIONS] 
```

To configure and run a provisioner from the CLI, the user creates a file containing an application spec and runs the provisioner.

If there are options not specified either on the command line, or in the application spec, the provisioner will prompt the user to supply values.

<a name="uninstall" id="uninstall"></a>
## c6o uninstall

```bash
c6o uninstall APPNAME [OPTIONS]
```

This will look for an application in the cluster. If there is more than one with this name the CLI will prompt for a namespace if required.

If there are deprovisioning options that are available but not specified in the manifest or on the command line, the CLI will prompt.

<a name="update" id="update"></a>
## c6o update

```bash
c6o update PATH [OPTIONS]
```

## <a name="publish" id="publish"></a> c6o publish

```bash
c6o publish PATH [OPTIONS]
```

> TODO: Not implemented yet.
