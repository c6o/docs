---
sidebar_position: 6
---

# Teleport

The primary concept behind Teleport is to allow developers to develop and debug their code locally as though they are inside the cluster.

## Overview

One problem that developers encounter is the need to run their entire stack of services whenever developing/debugging locally. This means developers need to maintain the domain knowledge and capability of building and running the entire service stack, even if they only are concerned about a tiny piece of the system.

Codezero resolves this by enabling developers to only run the workloads they are concerned with, while maintaining connectivity to the remaining services within a remote environment.

![Teleport Dataflow](https://cdn.builder.io/api/v1/file/assets/e889f09fd60f4c0ea34d2538e0096f38/560ae2f5b17348c4a90f82f99d5ecf51)

There are several primary aspects to replicate the remote environment of a Kubernetes workload.

1. Workload configuration.
2. Access remote services.
3. Persistent volumes.
4. Discoverability.

## Workload Configuration

Every workload can be given a specific configuration. Typically, this is done via ConfigMaps and Secrets. Codezero allows you to collect all the relevant configuration for a specific workload (deployment, pod, job, etc.), and export it to your local machine (using `.env` or directly sourcing it to your environment).

## Access Remote Services

In a cluster, in-cluster services can communicate with other in-cluster services. However, a problem occurs if you are outside the cluster: only publicly exposed services are accessible. This creates a problem if a locally running service needs to communicate to a non-exposed back-end service. This means that when developing a service that requires access to other back-end services, developers must run all dependent services locally.

Codezero teleport solves this problem by creating a local tunnel into a remote cluster for each service, so developers can communicate with back-end services as though they are in the cluster.

## Workload Persistent Volumes

Every workload can mount storage drives through the use of PersistentVolumes. Persistent volumes are pieces of storage in a cluster that are available to Pods to read and write. They are of a fixed size and behave like mounted hard drives on a computer where the data continues to exist as Pods are created and destroyed. They can be mounted with different access modes like ReadWriteOnce, ReadWriteMany, and ReadOnlyMany.

Codezero allows you to mount any workloads persistent volumes as if they are locally mounted hard drives.

## Discoverability

When services are run locally not only do they need to be able to make requests to services in the cluster, they also need to be accessible by cluster services. This enables two-way communication between cluster and the local system. Local services can be made accessible through exposing the local machine through a proxy to the cluster. Additionally, proxy services that sit in front of cluster services can redirect "flagged" traffic to the local system so that only a subset of the calls going out that are related to development are redirected to the local development environment.

## Use Case

Local running services that are being modified need to talk to services that are deployed in a cluster so that developers only need to run what they are changing.

## Under the hood

Teleport works by creating a tunnel from your local machine into the remote cluster.

### Tunnel to remote services

In order to route local traffic to in cluster resources, Teleport does several things:

1. Creates IP addresses for each remote service
2. Binds a proxy service from this IP to the remote service (similar to `kubectl port-foward`)
3. Modifies your local `hosts` file to direct DNS entries to the appropriate local IPs.

#### Why is `sudo` required?

Teleport makes modifications to your operating system's DNS in order to resolve in-cluster resources. This can only be done with elevated permissions.

Root access is only required once to elevate the `czctl` command's privilege by issuing the command:

```bash
czctl start
```

:::tip
Root access is only required once. During `start`, the permissions of the tunneler binary are elevated to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.
:::

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

From time to time you may find that an old `czfwd` is running, that the `/etc/hosts` file has an old tunnel registered, or an old env.sh (whatever name you have given this) file is still lying around. Cleanup is a matter of killing both the czfwd processes and the environment file monitor. Usually this will be enough to clean up the `/etc/hosts` or `[some env file]`, but occasionally these will need to be cleaned up manually. (Your `/etc/hosts` file is backed up in `~/hosts.original`, see below for more detail)

The environment output file can simply be deleted or renamed. The `/etc/hosts` file will need to be edited with root privileges and the additional DNS entries removed.

Killing the tunnel process:

```bash
sudo killall czfwd
```

Here's an example of getting the process ids and using `kill -9` to end these processes.

```bash
ps xau | grep 'czfwd' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
65374 -> /Users/username/.codezero/bin/czfwd/czfwd svc
```

```bash
sudo kill -9 65374
```

If the `/etc/hosts` file has not cleaned up after killing the tunnel process, edit this file directly with `sudo vi /etc/hosts` or use your favorite editor.

The tunnel process creates a backup of your `/etc/hosts` file in `~/hosts.original` that can be copied to the `/etc/hosts` using `sudo cp ~/hosts.original /etc/hosts`

After a teleport has been issued, the file will look something like this:

```bash
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

```bash

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

## Command Reference

See the [Teleport](/references/command-line?id=teleport) command reference for more information.
