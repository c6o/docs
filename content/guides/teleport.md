# Teleport Guide

The primary concept behind Teleport is to allow developers to develop and debug their code locally as though they are inside the cluster.

## Use-Case

Local running services that are being modified need to talk to services that are deployed in a cluster so that developers only need to run what they are changing. 

## Under the hood

### Tunnel to remote services

In order to route local traffic to in cluster resources, Teleport does several things:

1. Creates IP addresses for each remote service
2. Binds a proxy service from this IP to the remote service (similar to `kubectl port-foward`)
3. Modifies your local `hosts` file to direct DNS entries to the appropriate local IPs.

### Why is `sudo` required?

Teleport requires access to make modifications to your local `hosts` file, which can only be done with elevated root access.

Root access is only required once to elevate the `czctl` command's priviledge by issuing the command:

```bash
czctl start
```

> [!EXPERT]
> Root access is only required once. During `start`, the permissions of the tunneler binary are elevated to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.
