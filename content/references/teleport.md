# Teleport Reference

Teleport sets up your local machine to feels like it's running in-cluster.

## Usage

```bash
$ czctl [workload] teleport [name]
```

### Example

```bash
> czctl deployment teleport my-deployment -n my-namespace -f my-deployment.env -m sh
```

### Arguments

| Argments  | Description
| --------  | -----------
| workload  | Type of workload you want to teleport as.
| name      | The name of the workload you want to teleport as.

### Flags

| Flags        | Alias | Description
| --------     | ----- | -----------
| --namespace  | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --file       | -f    | Write environment variables related to the workload to a file.
| --format     | -m    | Format of the environment file: sh, env, json, yaml. sh is a sourceable bash file, env is a .env file.
| --kubeconfig | -k.   | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --clean      | -c    | Close and clean up existing teleport session.
| --quiet      | -q.   | Only display error message.

## Under the hood

Teleport works by creating a tunnel from your local machine into the remote cluster.

### Tunnel to remote services

Teleport does several things to route local traffic to in cluster resources:

1. Creates IP addresses for each remote service
2. Binds a proxy service from this IP to the remote service (similar to `kubectl port-foward`)
3. Modifies your local `hosts` file to direct DNS entries to the appropriate local IPs.

> [!EXPERT]
> See more details about the inner workings of the tunneling logic at (https://github.com/c6o/kubefwd).

### Root Permissions

Teleport requires permission to modify the local `hosts` file, which can only be done with elevated root access. Therefore, to run teleport, you must first initialize the CLI using:

```bash
> sudo czctl init
```

> [!EXPERT]
> Root access is only required once. During `init` the permissions of the tunneler binary elevate to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.
