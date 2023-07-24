---
sidebar_position: 1
---

# CLI Reference

## Configuration

The Configuration command brings down cluster workload configuration files.

### Usage

```bash
czctl configuration [KIND] [RESOURCENAME] [ENVFILE] -n namespace
```

:::tip
The configuration command can be shortened from `configuration` to `env`
:::

### Examples

```bash
czctl configuration deployment sample-project-core env.sh -n sample-project
```

There are several formats in which the local file can be written using the --format(-m) flag:

1. sh (sourceable shell)
2. env (.env format file)
3. json
4. yaml

```bash
czctl configuration deployment sample-project-core env.json -n sample-project --format json
```

### Arguments

| Arguments    | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| kind         | The kind of workload you want to teleport as.                          |
| resourceName | The name of the workload you want to teleport as.                      |
| envFile      | The name of the local file to which the configuration will be written. |

### Flags

<div class="flags-table">

| Flags          | Alias | Description                                                                                                                                                       |
| -------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --format       | -m    | The format of the configuration file. Must be one of the following: sh (source-able shell file), env (env format p=v), json (JSON format), or yaml (YAML format). |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                                                         |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.                                   |
| --context      |       | The name of the Kubernetes context to use.                                                                                                                        |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                                                     |
| --quiet        | -q    | Only display error message.                                                                                                                                       |
| --save-profile | -s    | Save this command to a development profile.                                                                                                                       |

</div>

### Aliases

```bash
czctl env [KIND] [RESOURCENAME] [ENVFILE] -n namespace
```

### More Examples

Download and watch the configuration to a sourceable shell file:

```bash
czctl configuration deployment -n sample-project sample-project-core core.sh --format sh
```

The file will be in this format:

```bash
export "SAMPLE1_KEY=VALUE1"
export "SAMPLE2_KEY=VALUE2"
export "SAMPLE_PROJECT_API_PORT=3000"
export "SAMPLE_PROJECT_VERSION=Version Production"
export "SP_LEAF_URL=http://sample-project-leaf:3010"
export "SP_DB_URL=mongodb://sample-project-database:27017/sample-project-database"
```

Cleanup the residue from the last command:

```bash
czctl configuration deployment -n sample-project sample-project-core core.sh --format sh --clean
```

or

```bash
czctl session close
```

To close all czctl sessions, use

```bash
czctl session close --all
```

Enable access to a deployment and download the configuration to an .env file:

```bash
czctl configuration deployment -n sample-project sample-project-core core.env --format env
```

The file will be in this format:

```bash
SAMPLE1_KEY=VALUE1
SAMPLE2_KEY=VALUE2
SAMPLE_PROJECT_API_PORT=3000
SAMPLE_PROJECT_VERSION=Version Production
SP_LEAF_URL=http://sample-project-leaf:3010
SP_DB_URL=mongodb://sample-project-database:27017/sample-project-database
```

Obtain configuration from other workloads:

```bash
czctl configuration cronjob some-cronjob config.sh -n some-namespace
...
czctl configuration job some-job config.sh -n some-namespace
...
czctl configuration pod some-pod config.sh -n some-namespace
...
czctl configuration statefulset some-statefulset config.sh -n some-namespace
...
```

---

## Contexts

### Add

Add a plaintext or encrypted kubeconfig context to your user kubeconfig located at `~/.kube/config`.

#### Usage

```bash
czctl context add [CONTEXT-FILENAME]
```

#### Examples

```bash
czctl context add ./encrypted-context.pem
czctl context add ./my-regular-kubeconfig.yaml
czctl context add
```

#### Arguments

| Argument         | Description                                     |
| ---------------- | ----------------------------------------------- |
| context-filename | The plaintext or encrypted kubeconfig filename. |

#### Flags

| Flags   | Alias | Description                 |
| ------- | ----- | --------------------------- |
| --quiet | -q    | Only display error message. |

### Request

Request access to a Kubernetes cluster securely. Send your public key to your cluster administrator to receive an encrypted kubeconfig context.

#### Usage

```bash
czctl context request [KEY-FILENAME]
```

#### Examples

```bash
czctl context request ./public-key.pem
czctl context request --regenerate ./public-key.pem
czctl context request
```

#### Arguments

| Argument     | Description                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| key-filename | The filename (e.g. public-key.pem) to write your public key to (if not provided, the public key will be copied to the clipboard). |

#### Flags

<div class="flags-table">

| Flags        | Alias | Description                             |
| ------------ | ----- | --------------------------------------- |
| --regenerate | -r    | Regenerate your public/private key pair |
| --output     | -o    | Output the public key to the terminal   |
| --quiet      | -q    | Only display error message.             |

</div>

### Share

Generate an encrypted kubeconfig context to securely share with another user, using their public key.

#### Usage

```bash
czctl context share -k [KEY] -c [CONTEXT] [ENCRYPTED-CONTEXT]
```

#### Examples

```bash
czctl context share -k ./public-key.pem -c ./dev-kubeconfig.yaml ./encrypted-context.pem
czctl context share --key ./public-key.pem --context ./a-kubeconfig.yaml ./encrypted-context.pem
czctl context share
```

#### Arguments

| Argument          | Description                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| encrypted-context | The filename (e.g. encrypted-context.pem) of the encrypted kubeconfig context to share with a specific user (if not provided, then standard output will be used). |

#### Flags

<div class="flags-table">

| Flags     | Alias | Description                       |
| --------- | ----- | --------------------------------- |
| --key     | -k    | The recipient's public key        |
| --context | -c    | The plaintext kubeconfig filename |
| --quiet   | -q    | Only display error message.       |

</div>

---

## Intercept

Intercept allows you to selectively intercept traffic to a remote service and redirect it to your local machine.

### Usage

```bash
czctl intercept service [SERVICE]
```

### Examples

```bash
czctl intercept service sample-project-leaf -n sample-project
czctl intercept service sample-project-leaf -r 3010 -l 4010 -n sample-project
czctl intercept service sample-project-core --remotePort 3000 --localPort 4000 --namespace sample-project
```

### Arguments

| Argument | Description                                    |
| -------- | ---------------------------------------------- |
| service  | The name of the service you want to intercept. |

### Flags

<div class="flags-table">

| Flags          | Alias | Description                                                                                                                   |
| -------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                     |
| --remotePort   | -r    | The remote port number of the remote service to be intercepted. This is optional if the service only exposes a single port.   |
| --localPort    | -l    | The local port number that traffic should be forwarded to on this machine.                                                    |
| --header       | -x    | Custom intercept header and value header:value. Default is `X-C6O-INTERCEPT:yes`.                                             |
| --kubeconfig   | -k    | Path to a specific the kubeconfig file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                    |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                 |
| --quiet        | -q    | Only display error message.                                                                                                   |
| --save-profile | -s    | Save this command to a development profile.                                                                                   |

</div>

### More Examples

Intercept the remote service's port 3000 and route to localhost:4000

```bash
czctl intercept service -n sample-project sample-project-core -l 4000
```

or to select a different remote port:

```bash
czctl intercept service -n sample-project sample-project-core -r 3010 -l 4000
```

Clean up the previous session above:

```bash
czctl intercept service -n sample-project sample-project-core -r 3000 -l 4000 --clean
```

Give your own custom header:

```bash
czctl intercept service -n sample-project sample-project-leaf -l 3010 -h X-MY-HEADER:ME
```

This routes to `x-my-header:me`

---

## Mount

Mount sets up remote volumes on your local workstation so that your code can access these volumes just like it does in-cluster.

### Usage

```bash
czctl mount [KIND] [RESOURCENAME] [LOCALDIRECTORY]
```

### Example

```bash
czctl mount deployment sample-project-core ./mnt -n sample-project
```

### Arguments

| Arguments      | Description                                                |
| -------------- | ---------------------------------------------------------- |
| kind           | Type of workload you want to target.                       |
| resourceName   | The name of the workload you want to target.               |
| localDirectory | The name of the local folder in which to mount the volume. |

### Flags

<div class="flags-table">

| Flags          | Alias | Description                                                                                                                     |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                       |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                      |
| --clean        | -c    | Close and clean up existing mount session.                                                                                      |
| --quiet        | -q    | Only display error message.                                                                                                     |
| --save-profile | -s    | Save this command to a development profile.                                                                                     |

</div>

### More Examples

Mount all the volumes of a specific deployment within the folder `./folder-name`

```bash
czctl mount deployment -n sample-project sample-project-core ./folder-name
...
ls -la ./folder-name
total 0
drwxr-xr-x   3 root        staff   96 10 Jan 18:55 .
drwxr-xr-x  23 robblovell  staff  736 10 Jan 18:55 ..
drwxr-xr-x   2 root        staff   64 10 Jan 18:55 data
```

Cleanup the residue from the last command:

```bash
czctl mount deployment -n sample-project sample-project-core ./folder-name --clean
```

Enable access to other workloads:

```bash
czctl mount cronjob some-cronjob ./mnt -n some-namespace
...
czctl mount job some-job ./mnt -n some-namespace
...
czctl mount pod some-pod ./mnt -n some-namespace
...
czctl mount statefulset some-statefulset ./mnt -n some-namespace
...
```

---

## Session

Close open sessions (sessions are started by running commands like teleport, intercept, etc.).

#### Usage

```bash
czctl session close
```

#### Example

```bash
czctl session close --all
```

#### Flags

<div class="flags-table">

| Flags        | Alias | Description                                                                                                                     |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --all        | -a    | Close any running sessions for the active context.                                                                              |
| --kubeconfig | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context    |       | The name of the Kubernetes context to use.                                                                                      |
| --quiet      | -q    | Only display error message.                                                                                                     |

</div>

#### Aliases

```bash
czctl session clean
```

### List

List open sessions (sessions are started by running commands like teleport, intercept, etc.).

#### Usage

```bash
czctl session list
```

#### Example

```bash
czctl session list --details
```

#### Flags

<div class="flags-table">

| Flags        | Alias | Description                                                                                                                     |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --details    |       | Show a detailed breakdown for sessions.                                                                                         |
| --verbose    | -v    | Show more verbose information about the session's parameters values.                                                            |
| --kubeconfig | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context    |       | The name of the Kubernetes context to use.                                                                                      |
| --quiet      | -q    | Only display error message.                                                                                                     |

</div>

---

## Teleport

Teleport sets up your local machine to feels like it's running in-cluster.

### Usage

```bash
czctl teleport namespace [NAMESPACE]
```

### Example

```bash
czctl teleport namespace sample-project
```

### Arguments

| Arguments | Description                           |
| --------- | ------------------------------------- |
| namespace | The name of the Kubernetes namespace. |

### Flags

<div class="flags-table">

| Flags          | Alias | Description                                                                                                                     |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --additional   | -a    | Additional namespaces to include. Repeat this flag for each additional namespace.                                               |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                      |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                   |
| --quiet        | -q    | Only display error message.                                                                                                     |
| --save-profile | -s    | Save this command to a development profile.                                                                                     |

</div>

### More Examples

Cleanup the residue from the last command:

```bash
czctl teleport namespace sample-project --clean
```
