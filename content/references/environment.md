# Environment

The Environment command brings down cluster workload configuration files.

## Usage

```bash
> czctl environment [workload-kind] [name] [local-file] -n namespace
```

> [!PROTIP]
> The environment command can be shortened from 'environment' to 'env'

### Example

```bash
> czctl environment deployment -n sample-project sample-project-core env.sh
```

There are several formats in which the local file can be written using the --format(-m) flag:

1. sh (sourceable shell)
2. env (.env format file)
3. json
4. yaml

```bash
> czctl environment deployment -n sample-project sample-project-core env.json --format json
```

### Arguments

| Arguments     | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| workload-kind | Type of workload you want to teleport as.                              |
| name          | The name of the workload you want to teleport as.                      |
| local-file    | The name of the local file to which the configuration will be written. |

### Flags

| Flags          | Alias | Description                                                                                                                                                     |
| -------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --format       | -m    | The format of the environment file. Must be one of the following: sh (source-able shell file), env (env format p=v), json (JSON format), or yaml (YAML format). |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                                                       |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.                                 |
| --context      |       | The name of the Kubernetes context to use.                                                                                                                      |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                                                   |
| --quiet        | -q    | Only display error message.                                                                                                                                     |
| --save-profile | -s    | Save this command to a development profile.                                                                                                                     |

### alias

```bash
> czctl env [workload-kind] [name] [local-file] -n namespace
```

## More Examples

Download and watch the environment to a sourceable shell file:

```bash
> czctl environment deployment -n sample-project sample-project-core core.sh --format sh
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
> czctl environment deployment -n sample-project sample-project-core core.sh --format sh --clean
```

or

```bash
> czctl session close
```

To close all czctl sessions, use

```bash
> czctl session close --all
```

Enable access to a deployment and download the environment to a .env file:

```bash
> czctl environment deployment -n sample-project sample-project-core core.env --format env
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
> czctl environment cronjob some-cronjob config.sh -n some-namespace
...
> czctl environment job some-job config.sh -n some-namespace
...
> czctl environment pod some-pod config.sh -n some-namespace
...
> czctl environment statefulset some-statefulset config.sh -n some-namespace
...
```
