---
sidebar_position: 1
---

# CLI Reference

## Auth

The Auth command allows you to log in and out of Codezero.

### Usage

```bash
czctl auth [SUB-COMMAND]
```

### Examples

```bash
czctl auth login
```

### Sub-commands

| Sub-command | Description                                |
| ----------- | ------------------------------------------ |
| login       | Login to Codezero                          |
| logout      | Logout from Codezero                       |

### Flags

<div class="flags-table">

| Flags          | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| --force        | If set, app will not check if the user is already logged in (not needed for --token).        |
| --no-gui       | If set, app will not try to open a browser window for login.                                 |
| --token        | If set, app will not try to open a browser window for login and will use the provided token. |

</div>

---

## Cleanup

Cleans the system changes performed by czdaemon. Can help if czdaemon did not exit gracefully to bring back your network settings.

### Usage

```bash
czctl cleanup
```

---

## Completion

Generate the autocompletion script for czctl for the specified shell.

See each sub-command's help for details on how to use the generated script.

### Usage

```bash
czctl completion [SUB-COMMAND]
```

### Sub-commands

| Sub-command | Description                                       |
| ----------- | ------------------------------------------------- |
| bash        | Generate the autocompletion script for bash       |
| fish        | Generate the autocompletion script for fish       |
| powershell  | Generate the autocompletion script for powershell |
| zsh         | Generate the autocompletion script for zsh        |

### Example

To load zsh completions in your current shell session:

```sh
source <(czctl completion zsh)
```

---

## Config

Provides operations for the configuration file.

### Usage

```bash
czctl config [SUB-COMMAND]
```

### Examples

```bash
czctl config view
```

### Sub-commands

| Sub-command | Description                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| create      | Creates a new config file and quits. Does not overwrite existing config file be default. Use --overwrite to overwrite existing config file. |
| test        | Test the configuration file.                                                                                                                |
| view        | View config                                                                                                                                 |

### Flags

<div class="flags-table">

| Flags       | Description                    |
| ----------- | ------------------------------ |
| --overwrite | Overwrite existing config file |

</div>

---

## Consume

Manage consume rules.

### Apply

Apply consume rules from a file.

#### Usage

```bash
czctl consume apply source_file [flags]
```

#### Examples

```bash
czctl consume apply source_file
```

#### Flags

<div class="flags-table">

| Flags               | Description                                     |
| ------------------- | ----------------------------------------------- |
| --primary-namespace | The primary namespace used for services consume |

</div>

### Edit

Edit consume rules.

#### Usage

```bash
czctl consume edit [flags]
```

#### Examples

```bash
czctl consume edit
```

#### Flags

<div class="flags-table">

| Flags               | Description                                     |
| ------------------- | ----------------------------------------------- |
| --editor            | Your preferred editor to edit the rules. If not set, will try to use EDITOR environment variable, or present you a list of available ones. Please make sure to use the -w flag with the editor so that the app can wait for you to finish editing. |
| --primary-namespace | The primary namespace used for services consume |

</div>

### List

List consumed services.

#### Usage

```bash
czctl consume list [flags]
```

#### Examples

```bash
czctl consume list
```

#### Flags

<div class="flags-table">

| Flags               | Description                                     |
| ------------------- | ----------------------------------------------- |
| --filter `string`   | Filter to apply to the list. Format is: \<namespace\>[/\<resource\>]. Wildcards are supported. |
| --format `string`   | Output format. Supported values: yaml, json, pretty (default "pretty") |

</div>

### View

View consume rules.

#### Usage

```bash
czctl consume view
```

#### Examples

```bash
czctl consume view
```

---

## Organization

Manage Organizations.

### Clear

Clear the currently selected organization.

#### Usage

```bash
czctl organization clear
```

### List

List organizations

#### Usage

```bash
czctl organization clear [flags]
```

#### Examples

```bash
czctl organization clear --format json
```

#### Flags

<div class="flags-table">

| Flags             | Description                                 |
| ----------------- | ------------------------------------------- |
| --format `string` | Output format (text\|json) (default "text") |

</div>

### Select

Changes the current organization

You can use this command to change the current organization.
If you don't provide a name or there are multiple spaces with the same name, you will be interactively prompted to select one.

#### Usage

```bash
czctl organization select [organization name] [flags]
```

#### Examples

```bash
czctl organization select MyOrg
```

#### Flags

<div class="flags-table">

| Flags         | Description               |
| ------------- | ------------------------- |
| --id `string` | Select by organization ID |

</div>

---

## Primary Namesapce

Manage primary namespace.

### Clear

Clear the currently selected primary namespace.

#### Usage

```bash
czctl primary-namespace clear
```

### Select

Change the current primary namespace.

#### Usage


```bash
czctl primary-namespace select [namespace]
```

#### Examples

```bash
czctl primary-namespace select sample-project
```

#### Arguments

| Arguments | Description                           |
| --------- | ------------------------------------- |
| namespace | The name of the Kubernetes namespace. |

---

## Restart

Restarts the Codezero daemon if it is running. If it is not running, does nothing.

### Usage

```bash
czctl restart
```

---

## Serve

Manage served resources.

### Serving a resource

#### Usage

```bash
czctl serve [namespace/name] [local_port:]remote_port [...[local_port_n:]remote_port_n] [flags]
```

#### Example
```bash
czctl serve sample-project/core 3000
```

#### Flags

<div class="flags-table">

| Flags    | Description            |
| -------- | ---------------------- |
| --delete | Delete served resource |

</div>

### List

List served resources.

#### Usage

```bash
czctl serve list [flags]
```

#### Example

```bash
czctl serve list --format json
```

#### Flags

<div class="flags-table">

| Flags             | Description                                 |
| ----------------- | ------------------------------------------- |
| --format `string` | Output format (yaml\|json) (default "yaml") |

</div>

---

## Space

Manage Spaces.

### List

List spaces.

#### Usage

```bash
czctl space list [flags]
```

#### Example

```bash
czctl space list --format json
```

#### Flags

<div class="flags-table">

| Flags             | Description                                 |
| ----------------- | ------------------------------------------- |
| --format `string` | Output format (text\|json) (default "text") |

</div>

### Select

Changes the current space

You can use this command to change the current space.
If you don't provide a name or there are multiple spaces with the same name, you will be interactively prompted to select one.

#### Usage

```bash
czctl space select [flags]
```

#### Example

```bash
czctl space select pre-production
```

#### Flags

<div class="flags-table">

| Flags         | Description        |
| ------------- | ------------------ |
| --id `string` | Select by space ID |

</div>

---

## Start

Starts the Codezero daemon, does nothing if daemon is already running

### Usage

```bash
czctl start
```

---

## Status

Returns the status of the Codezero daemon. If the daemon is not running, it will exit with code 1. Otherwise, it will exit with code 0.

### Usage

```bash
czctl status [flags]
```

#### Example

```bash
czctl status --format json
```

#### Flags

<div class="flags-table">

| Flags             | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| --format `string` | Output format. Supported values: yaml, json, pretty (default "pretty") |

</div>

---

## Stop

Stops the Codezero daemon. Does nothing if daemon is not running.

### Usage

```bash
czctl stop
```

---

## Version

Shows the current product version.

### Usage

```bash
czctl version
```
