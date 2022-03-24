# Configuration

The Configuration command brings down cluster workload configuration files.

## Usage

```bash
> czctl configuration [KIND] [RESOURCENAME] [ENVFILE] -n namespace
```

> [!PROTIP]
> The configuration command can be shortened from `configuration` to `env`

## Examples

```bash
> czctl configuration deployment sample-project-core env.sh -n sample-project 
```

There are several formats in which the local file can be written using the --format(-m) flag:

1. sh (sourceable shell)
2. env (.env format file)
3. json
4. yaml

```bash
> czctl configuration deployment sample-project-core env.json -n sample-project --format json
```

## Arguments

| Arguments      | Description
| --------       | -----------
| kind           | The kind of workload you want to teleport as.
| resourceName   | The name of the workload you want to teleport as.
| envFile        | The name of the local file to which the configuration will be written.

## Flags

<div class="flags-table">

| Flags          | Alias | Description
|----------------|-------|------------
| --format       | -m    | The format of the configuration file. Must be one of the following: sh (source-able shell file), env (env format p=v), json (JSON format), or yaml (YAML format).
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context      |       | The name of the Kubernetes context to use.
| --clean        | -c    | Close and clean up existing teleport session.
| --quiet        | -q    | Only display error message.
| --save-profile | -s    | Save this command to a development profile.

</div>

## Aliases

```bash
> czctl env [KIND] [RESOURCENAME] [ENVFILE] -n namespace
```

## More Examples

Download and watch the configuration to a sourceable shell file:

```bash
> czctl configuration deployment -n sample-project sample-project-core core.sh --format sh
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
> czctl configuration deployment -n sample-project sample-project-core core.sh --format sh --clean
```

or

```bash
> czctl session close
```

To close all czctl sessions, use

```bash
> czctl session close --all
```

Enable access to a deployment and download the configuration to an .env file:

```bash
> czctl configuration deployment -n sample-project sample-project-core core.env --format env
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
> czctl configuration cronjob some-cronjob config.sh -n some-namespace
...
> czctl configuration job some-job config.sh -n some-namespace
...
> czctl configuration pod some-pod config.sh -n some-namespace
...
> czctl configuration statefulset some-statefulset config.sh -n some-namespace
...
```
