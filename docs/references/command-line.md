---
sidebar_position: 2
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

## Compose

Applies all the serve sessions/consume rules from a compose file.

### Usage

```bash
czctl compose start
```

#### Flags

<div class="flags-table">

| Flags  | Description                                                |
| ------ | ---------------------------------------------------------- |
| --file | Path to the compose file (default "codezero-compose.yaml") |

</div>

---

## Consume

Manage consume rules.

### All

Consume all services.

#### Usage

```bash
czctl consume all
```

### Apply

Apply consume rules from a file.

#### Usage

```bash
czctl consume apply source_file [flags]
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
czctl consume edit
```

### List

List consumed services.

#### Usage

```bash
czctl consume list
```

### View

View consume rules.

#### Usage

```bash
czctl consume view
```

---

## Daemon

Manage Codezero daemon.

### Usage

```bash
czctl daemon [SUB-COMMAND]
```

### Example

```bash
czctl daemon start
```

### Sub-commands

| Sub-command | Description                                         |
| ----------- | --------------------------------------------------- |
| install     | Install the Codezero daemon as a background service |
| restart     | Restart the Codezero daemon                         |
| run         | Run the Codezero daemon in the foreground           |
| start       | Start the Codezero daemon                           |
| stop        | Stop the Codezero daemon                            |
| uninstall   | Uninstall the Codezero daemon background service    |

---

## Organization

Manage Organizations.

### List

List organizations

#### Usage

```bash
czctl organization list
```

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

#### Arguments

| Arguments         | Description                    |
| ----------------- | ------------------------------ |
| organization name | The name of the organization.  |

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
czctl serve list
```

---

## Services

Services commands.

### List

List services.

#### Usage

```bash
czctl services list
```

---

## Space

Manage Spaces.

### List

List spaces.

#### Usage

```bash
czctl space list
```

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
czctl status
```

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
