# Installing the CodeZero App

CodeZero's developer tool helps in the development and testing of Kubernetes applications through 
a Command Line Interface (CLI) and a Dashboard application.

## Install CodeZero

[cluster-install](../../_fragments/app-install.md ':include')

## Requirements

[cluster-requirements](../../_fragments/app-requirements.md ':include')

## Configure the CLI and Dashboard

### Initialize the App

After installing the App, run:

```bash
> czctl start
```

> [!NOTE]
> The CodeZero App requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

## Next Steps

### [Using the Dashboard](./using-dashboard.md)
### [Using the CLI](./using-cli.md)
