# Environment Reference

The Environment command brings down cluster workload configuration files.

## Usage

```bash
> czctl environment [workload-kind] [name] [local-file] -n namespace
```

### Example

```bash
> czctl environment deployment sample-project-core env.json --format json -n sample-project
```

### Arguments

| Argments       | Description
| --------       | -----------
| workload-kind  | Type of workload you want to teleport as.
| name           | The name of the workload you want to teleport as.
| local-file     | The name of the local file to which the configuration will be written.

### Flags

| Flags          | Alias | Description
| ------------   | ----- | -----------
| --additional   | -a    | Additional namespaces to include. Repeat this flag for each additional namespace.
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context      |       | The name of the kubernetes context to use.
| --clean        | -c    | Close and clean up existing teleport session.
| --quiet        | -q    | Only display error message.
| --save-profile | -s    | Save this command to a development profile.

## More Examples

Download and watch the environment to a sourceable shell file:
```bash
> czctl environment deployment sample-project-core core.sh --format sh -n sample-project
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
> czctl environment deployment sample-project-core core.sh --format sh -n sample-project --clean
```
or
```bash
> czctl session close
```
To close all czctl sessions, use
```bash
> czctl session close --all
```
Enable access to a deployment and download the environment to an.env file:
```bash
> czctl environment deployment sample-project-core core.env --format env -n sample-project
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
## Under the hood

The Environment command starts a watch of the configuration files of the workload and writes to the given environment file
as configuration changes in the cluster.

## Residue

The environment command makes no changes to your remote cluster and the only residue is the file where the 
configuration is written and the watcher process.

However, if the environment watcher continues to run after a clean/close has been performed, 
you will need to find the process id and do a `kill -9` of the environment monitor process.

Here's an example of getting the process ids and using `kill -9` to end these processes:

```bash
> ps xau | grep 'child.js' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
65120 -> /Users/username/.codezero/bin/czdaemon/czdaemon /snapshot/node-monorepo/gulpfile.js/tmp/czdaemon/package/lib/engine/services/monitors/env/child.js
```

```bash
> sudo kill -9 65120
```