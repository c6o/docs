# Teleport Reference

Teleport sets up your local machine to feels like it's running in-cluster.

## Usage

```bash
> czctl teleport namespace [namespace]
```

### Example

```bash
> czctl namespace teleport sample-project
```

### Arguments

| Argments  | Description
| --------  | -----------
| workload  | Type of workload you want to teleport as.
| name      | The name of the workload you want to teleport as.

### Flags

| Flags          | Alias | Description
| ------------   | ----- | -----------
| --additional   | -a    | Additional namespaces to include. Repeat this flag for each additional namespace.
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context      |       | The name of the Kubernetes context to use.
| --clean        | -c    | Close and clean up existing teleport session.
| --quiet        | -q    | Only display error message.
| --save-profile | -s    | Save this command to a development profile.

## More Examples

Cleanup the residue from the last command:
```bash
> czctl teleport namespace sample-project --clean
```
or
```bash
> czctl session close
```
To close all czctl sessions, use
```bash
> czctl session close --all
```

## Under the hood

Teleport works by creating a tunnel from your local machine into the remote cluster.

### Tunnel to remote services

Teleport does several things to route local traffic to in cluster resources:

1. Creates IP addresses for each remote service
2. Binds a proxy service from this IP to the remote service (similar to `kubectl port-foward`)
3. Modifies your local `hosts` file to direct DNS entries to the appropriate local IPs.

### Root Permissions

Teleport requires permission to modify the local `hosts` file, which can only be done with elevated root access. Therefore, to run teleport, you must first initialize the CLI using:

```bash
> czctl start
```

> [!EXPERT]
> Root access is only required once. During `start` the permissions of the tunneler binary elevate to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.

## Residue

This section describes what the teleport command creates within a cluster to accomplish its task and instructions on what to do if something breaks.

The teleport command makes no changes to your existing Resources in the cluster, but does add endpoints to create tunnels to pods running in the cluster. 
It also modifies the user's local `/etc/hosts` file. 
A locally running `czfwd` process is run in the background to maintain the tunnels to pods and manage any changes such 
as new services, or termination/restarts of pods. Additionally, if you have issued a `-f [some filename]` as part of 
the teleport command, this file will be created.

If the user issues a `czctl [workload] teleport --clean`, a `czctl session close`, or a `czctl session close --all` command, the `/etc/hosts` file will be restored to its original state and the named environment file (with `-f [some filename]`) will be deleted. 

The teleport command also starts up a tunnelling service that creates a tunnel to the users local computer and presents a tunnel inspection interface on `http://localhost:4040`. The `--clean` and `session close` commands also terminate this process.

## Cleanup

From time to time you may find that an old `czfwd` is running, that the `/etc/hosts` file has an old tunnel registered, or an old env.sh (whatever name you have given this) file is still laying around. Cleanup is a matter of killing both the czfwd processes and the environment file monitor. Usually this will be enough to clean up the `/etc/hosts` or `[some env file]`, but occasionally these will need to be cleaned up manually. (Your `/etc/hosts` file is backed up in `~/hosts.original`, see below for more detail)

The environment output file can simply be deleted or renamed.  The `/etc/hosts` file will need to be edited with root privledges and the additional DNS entries removed.

Killing the tunnel process:
```bash
> sudo killall czfwd
```

Here's an example of getting the process ids and using `kill -9` to end these processes.

```bash
> ps xau | grep 'czfwd' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
65374 -> /Users/username/.codezero/bin/czfwd/czfwd svc
```
```bash
> sudo kill -9 65374
```

If the `/etc/hosts` file has not cleaned up after killing the tunnel process, edit this file directly with `sudo vi /etc/hosts` or use your favorite editor.

The tunneller process creates a backup of your `/etc/hosts` file in `~/hosts.original` that can be copied to the `/etc/hosts` using `sudo cp ~/hosts.original /etc/hosts`

After a teleport has been issued, the file will look something like this:
```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1        localhost
255.255.255.255  broadcasthost
::1              localhost
127.0.0.1        kubernetes.docker.internal
127.1.31.1       sample-project-web.sample-project sample-project-web.sample-project.svc sample-project-web.sample-project.svc.cluster.local
127.1.31.2       sample-project-sockets.sample-project sample-project-sockets.sample-project.svc sample-project-sockets.sample-project.svc.cluster.local
127.1.31.3       sample-project-server.sample-project sample-project-server.sample-project.svc sample-project-server.sample-project.svc.cluster.local
127.1.31.4       sample-project-sails.sample-project sample-project-sails.sample-project.svc sample-project-sails.sample-project.svc.cluster.local
127.1.31.5       sample-project-echo.sample-project sample-project-echo.sample-project.svc sample-project-echo.sample-project.svc.cluster.local
127.1.31.6       sample-project-database.sample-project sample-project-database.sample-project.svc sample-project-database.sample-project.svc.cluster.local
```
If the backup file is corrupted, you can remove the long lines that reference services in your cluster. Either way, the /etc/hosts file should look like this after restoration:
```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1        localhost
255.255.255.255  broadcasthost
::1              localhost
127.0.0.1        kubernetes.docker.internal
```
