# Installing CodeZero

CodeZero's developer tool helps in the development and testing of Kubernetes applications through
a Command Line Interface (CLI) and a Desktop application.

## Install the CodeZero CLI

[app-install](../_fragments/app-install.md ':include')

## Requirements

[app-requirements](../_fragments/app-requirements.md ':include')

## Initialize the CLI

After installing the CodeZero CLI, run:

```bash
> czctl start
```

> [!NOTE]
> CodeZero requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

## Next Steps

#### [Using the Desktop App](./using-desktop-app.md)

#### [Using the CLI](./using-cli.md)
