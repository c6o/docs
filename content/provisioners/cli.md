# The CodeZero CLI

## auth

```bash
c6o auth login
c6o auth logout
```

## install

```bash
c6o install {application-name} {options} 
```

### provision

```bash
c6o install {app-manifest} {options} 
```

## remove

```bash
c6o remove {application-name} {options} 
```

## update

```bash
c6o update {application-name} {options} 
```

## publish

```bash
c6o publish {application-name} {options} 
```



### CLI Provision

```bash
traxitt provision {path-to-manifest} {options}
```

To configure and run a provisioner from the CLI, the user creates a file containing an application spec and runs the provisioner.

If there are options not specified either on the command line, or in the application spec, the provisioner will prompt the user to supply values.

### CLI Deprovision

```bash
traxitt deprovision {app-name} {options}
```

This will look for an application in the cluster. If there is more than one with this name the CLI will prompt for a namespace if required.

If there are deprovisioning options that are available but not specified in the manifest or on the command line, the CLI will prompt.

### CLI Ask

```bash
traxitt ask {app-name} {options}
```

This command will reconfigure an application in the cluster directly, as specified by the command line options, or interactive request. Again, if there is more than one application with the specified name, the namespace will need to be specified.

### CLI Help

It is possible to retrieve help information for the above commands, and provisioner-specific options.

### Other CLI Commands

The CLI supports other commands for working with applications:

* auth - login and logout of the hub for install
* install - installs an application manifest retrieved from the hub (uses Auth) rather than from a local file.
