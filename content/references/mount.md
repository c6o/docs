# Mount

Mount sets up remote volumes on your local workstation so that your code can access these volumes just like it does in-cluster.

## Usage

```bash
> czctl mount [workload-kind] [name] [folder-name]
```

### Example

```bash
> czctl deployment mount my-deployment -n my-namespace folder-name
```

### Arguments

| Arguments     | Description                                                |
| ------------- | ---------------------------------------------------------- |
| workload-kind | Type of workload you want to target.                       |
| name          | The name of the workload you want to target.               |
| folder-name   | The name of the local folder in which to mount the volume. |

### Flags

| Flags          | Alias | Description                                                                                                                     |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                       |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                      |
| --clean        | -c    | Close and clean up existing mount session.                                                                                      |
| --quiet        | -q    | Only display error message.                                                                                                     |
| --save-profile | -s    | Save this command to a development profile.                                                                                     |

## More Examples

Mount all the volumes of a specific deployment within the folder `./folder-name`

```bash
> czctl mount deployment -n sample-project sample-project-core ./folder-name
...
> ls -la ./folder-name
total 0
drwxr-xr-x   3 root        staff   96 10 Jan 18:55 .
drwxr-xr-x  23 robblovell  staff  736 10 Jan 18:55 ..
drwxr-xr-x   2 root        staff   64 10 Jan 18:55 data
```

Cleanup the residue from the last command:

```bash
> czctl mount deployment -n sample-project sample-project-core ./folder-name --clean
```

or

```bash
> czctl session close
```

To close all czctl sessions, use

```bash
> czctl session close --all
```

Enable access to other workloads:

```bash
> czctl mount cronjob some-cronjob ./mnt -n some-namespace
...
> czctl mount job some-job ./mnt -n some-namespace
...
> czctl mount pod some-pod ./mnt -n some-namespace
...
> czctl mount statefulset some-statefulset ./mnt -n some-namespace
...
```
