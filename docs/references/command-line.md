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

| Sub-command | Description          |
| ----------- | -------------------- |
| login       | Login to Codezero    |
| logout      | Logout from Codezero |

### Flags

<div class="flags-table">

| Flags    | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| --force  | If set, app will not check if the user is already logged in (not needed for --token).        |
| --no-gui | If set, app will not try to open a browser window for login.                                 |
| --token  | If set, app will not try to open a browser window for login and will use the provided token. |

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

| Flags               | Description                                                                                                                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --editor            | Your preferred editor to edit the rules. If not set, will try to use EDITOR environment variable, or present you a list of available ones. Please make sure to use the -w flag with the editor so that the app can wait for you to finish editing. |
| --primary-namespace | The primary namespace used for services consume                                                                                                                                                                                                    |

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

| Flags             | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| --filter `string` | Filter to apply to the list. Format is: \<namespace\>[/\<resource\>]. Wildcards are supported. |
| --format `string` | Output format. Supported values: yaml, json, pretty (default "pretty")                         |

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

## Options

Provides operations for managing Codezero options.

### Certs

Manage Codezero certificates.

| Sub-command | Description                              |
| ----------- | ---------------------------------------- |
| install     | Install Codezero certificates to system  |
| remove      | Remove Codezero certificates from system |

#### Usage

```bash
czctl options certs [SUB-COMMAND]
```

#### Examples

```bash
czctl options certs remove
```

### Config

Manage Codezero configuration file.

| Sub-command | Description                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| create      | Creates a new config file and quits. Does not overwrite existing config file by default. Use --overwrite to overwrite existing config file. |
| test        | Test the configuration file.                                                                                                                |
| view        | View config                                                                                                                                 |

#### Usage

```bash
czctl options config [SUB-COMMAND]
```

#### Examples

```bash
czctl options config view
```

#### Flags

<div class="flags-table">

| Flags       | Description                    |
| ----------- | ------------------------------ |
| --overwrite | Overwrite existing config file |

</div>

### Set

Set configuration options.

| Option             | Description                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| resolver           | Specify host resolver (dns, hosts) (default: hosts)                                                                                                 |
| skip-version-check | Do not check version against hub version (bool) (default: false)                                                                                  |
| log-level          | Sets the logging verbosity. Accepted values: panic, fatal, error, warn, info, debug, trace (string) (default: info)                               |
| log-directory      | Path where logs are stored, optionally can be set to stdout or stderr (string) (default: /Users/georgf/Library/Application Support/codezero/logs) |

#### Usage

```bash
czctl options set [OPTION] [VALUE]
```

#### Examples

```bash
czctl options set resolver hosts
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
czctl organization list [flags]
```

#### Examples

```bash
czctl organization list --format json
```

#### Flags

<div class="flags-table">

| Flags             | Description                                 |
| ----------------- | ------------------------------------------- |
| --format `string` | Output format (text \| json) (default "text") |

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

## Reset

Removes all consume and serve sessions.

### Usage

```bash
czctl reset
```

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

| Flags                     | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| --condition `string`      | Condition based on type                                     |
| --condition-type `string` | Condition type (default \| user \| header) (default "user") |
| --remove                  | Remove served resource                                      |

</div>

The `--condition-type` flag defines when the resource is served from the local endpoint.
Only the `header` condition type requires the additional `--condition` flag.

- When setting the condition type to `default`, all traffic is routed to the local resource instead of the cluster resource.
- Opting for the `user` condition type directs only HTTP traffic containing the `x-c6o-userid: YOUR_USER_ID` header to the local resource. You can see your current user ID by running `czctl status`.
- For the `header` condition type, any traffic matching the specified HTTP header provided via the `--condition` flag will be directed to the local resource.

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
| --format `string` | Output format (yaml \| json) (default "yaml") |

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
| --format `string` | Output format (text \| json) (default "text") |

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
