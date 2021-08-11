# Teleport

The primary concept behind Teleport is to allow developers to develop and debug their code locally as though they are inside the cluster.

## Use-Case

One problem that developers encounter is the need to run their entire stack of services whenever developing/debugging locally. This means developers need to maintain the domain knowledge and capability of building and running the entire service stack, even if they only are concerned about a tiny piece of the system.

CodeZero resolves this by enabling developers to only run the workloads they are concerned with, while maintaining connectivity to the remaining services within a remote environment.

![Teleport Dataflow](https://cdn.builder.io/api/v1/file/assets/e889f09fd60f4c0ea34d2538e0096f38/560ae2f5b17348c4a90f82f99d5ecf51)

## Overview

There are several primary aspects to replicate the remote environment of a Kubernetes workload.

1. Workload configuration
1. Access remote services
1. Persistent volumes

> [!NOTE]
> The last piece is discoverability within the cluster, allowing other services
> to call into your local environment. See [intercept](../concepts/intercept) for more details on how this works.

### Workload Configuration

Every workload can be given a specific configuration. Typically this is done via ConfigMaps and Secrets. CodeZero teleport allows you to collect all the relevant configuration for a specific workload (deployment, pod, job, etc), and export it to your local machine (using `.env` or directly sourcing it to your environment).

```bash
> czctl deployment teleport my-service -n my-namespace -f ./my-service.env
```

The user can specify one of four formats for the file where the environment variables will be written with the -m flag, specifying one of four formats:
1. sh (sourceable shell), DEFAULT
1. env (.env format file)
1. json
1. yaml
Whilst teleport is running, the environment file will be kept in sync as environment variables are updated and changed in the cluster.

### Access Remote Services

In a cluster, in-cluster services can communicate with other in-cluster services. However a problem occurs if you are outside the cluster: only publicly exposed services are accessible. This creates a problem if a locally running service needs to communicate to a non-exposed back-end service. This means that when developing a service that requires access to other back-end services, developers must run all dependent services locally.

CodeZero teleport solves this problem by creating a local tunnel into a remote cluster for each service, so developers can communicate with back-end services as though they are in the cluster.

```bash
> czctl deployment teleport -n my-namespace my-deployment
```

### Persistent Volumes

> [!WIP]
> Locally mounting of cluster volumes is a work in progress and will be coming soon.

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
sudo czctl init
```

> [!EXPERT]
> Root access is only required once. During `init`, the permissions of the tunneler binary are elevated to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.
