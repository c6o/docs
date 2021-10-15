# Mount Reference

Mount sets up remote volumes on your local workstation so that your code can access these volumes just like it does in-cluster.

## Usage

```bash
> czctl [workload] mount [name] [folder-name]
```

### Example

```bash
> czctl deployment mount my-deployment -n my-namespace folder-name
```

### Arguments

| Argments    | Description
| --------    | -----------
| workload    | Type of workload you want to target.
| name        | The name of the workload you want to target.
| folder-name | The name of the local folder in which to mount the volume.

### Flags

| Flags        | Alias | Description
| ------------ | ----- | -----------
| --namespace  | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --kubeconfig | -k.   | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --clean      | -c    | Close and clean up existing mount session.
| --quiet      | -q.   | Only display error message.

## More Examples

Mount all the volumes of a specific deployment within the folder `./folder-name`
```bash
> czctl deployment mount my-deployment -n my-namespace ./folder-name
```
Cleanup the residue from the last command:
```bash
> czctl deployment mount my-deployment -n my-namespace ./folder-name --clean
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
> czctl cronjob mount myjob -n my-namespace ../folder-name
...
> czctl job mount myjob -n my-namespace /some/other/folder
...
> czctl pod mount -n my-namespace folder-name/subfolder-name
...
> czctl statefulset mount myjob -n my-namespace ./mnt
```
## Under the hood

Mount works as follows:

1. If you don't have an existing Teleport session into your cluster then one will be automatically started; however, if there is an existing Teleport session but it isn't based on the same namespace and workload then you will need to stop that Teleport session first
1. Start a Mount session for the specified namespace and workload
1. An NFS server deployment is started with a single pod, which mounts all of the volumes referenced by that workload
1. Local mounts are created that point to each of the remote NFS server volumes

### Root Permissions

On Linux, Mount requires permission to mount volumes locally, which can only be done with elevated root access. Therefore, to run mount, you must first initialize the CLI using:

```bash
> sudo czctl start
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
umount foldeer-name/volume1
umount foldeer-name/volume2
```

> [!EXPERT]
> Be sure to first unmount all cluster volume first before ending your Teleport session; otherwise, your system will be unable to unmount the volumes properly.