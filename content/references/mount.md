# Mount Reference

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

| Argments       | Description
| -------------- | -----------
| workload-kind  | Type of workload you want to target.
| name           | The name of the workload you want to target.
| folder-name    | The name of the local folder in which to mount the volume.

### Flags

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context      |       | The name of the Kubernetes context to use.
| --clean        | -c    | Close and clean up existing mount session.
| --quiet        | -q    | Only display error message.
| --save-profile | -s    | Save this command to a development profile.

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

### Root Permissions

On Linux, Mount requires permission to mount volumes locally, which can only be done with elevated root access. Therefore, to run mount, you must first initialize the CLI using:

```bash
> czctl start
```

> [!EXPERT]
> Root access is only required once. During `start` the permissions of the tunneler binary elevate to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent mount calls can be run via the current user.

## Residue and Cleanup

If any mounts remain after running Mount with the `--clean` parameter (or `session close` command), you can see them:
```bash
mount
...
nfs-server-deployment-nfsserviceproxy:/volumes/volume1 on .../folder-name/volume1 (nfs)
nfs-server-deployment-nfsserviceproxy:/volumes/volume2 on .../folder-name/volume2 (nfs)
```

Then you can go ahead and unmount using:
```bash
umount folder-name/volume1
umount folder-name/volume2
```

> [!EXPERT]
> Be sure to first unmount all cluster volume first before ending your Teleport session; otherwise, your system will be unable to unmount the volumes properly.