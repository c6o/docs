# Teleport

The primary concept behind Teleport is to allow developers to develop and debug their code locally as though they are inside the cluster.

## Use-Case

More often than not, developers still need to run their entire stack of services whenever developing/debugging locally.  This means developers need to maintain the domain knowledge and capability of building and running the entire service stack, even if they only are concerned about a tiny piece of the system.

CodeZero resolves this by allowing developers to only run the workloads they are concerned with, while maintaining connectivity to the remaining services within a remote environment.

![Teleport Dataflow](../_media/teleport.png ':size=500')

## Overview

There are several primary aspects to replicate the remote environment of a Kubernetes workload.

1. Workload configuration.
2. Access remote services.  
3. Persistent volumes.

> [!NOTE]
> The last piece is discoverability within the cluster, allowing other services
> to call into your local environment.  See [intercept](../concepts/intercept) for more details on how this works.

### Workload Configuration

Every workload can be given a specific configuration.  Typically this is done via ConfigMaps and Secrets.  CodeZero teleport allows you to collect all the relevant configuration for a specific workload (deployment, pod, job, etc), and export it to your local machine (using `.env` or directly sourcing it to your environment).

```bash
> czctl deployment teleport my-service -n my-namespace -f ./my-service.env
```

### Access Remote Services

In-cluster services can communicate with other in-cluster services.  However, outside the cluster, only publicly exposed services are accessible.  When developing a service that requires access to other back-end services, developers must run all dependent services locally.

CodeZero teleport creates a local tunnel into a remote cluster, so developers can communicate with back-end services as though they are in the cluster.

```bash
> czctl namespace teleport my-namespace
```

### Persistent Volumes

Currently, we do not support the mounting of cluster volumes.

## Under the hood

### Tunnel to remote services

In order to route local traffic to in cluster resources, Teleport does several things:

1. Creates IP addresses for each remote service
2. Binds a proxy service from this IP to the remote service (similar to `kubectl port-foward`)
3. Modifies your local `hosts` file to direct DNS entries to the appropriate local IPs.

> [!EXPERT]
> See more details about the inner workings of the tunnelling logic at [our fork](https://github.com/c6o/kubefwd) of `kubefwd`.

### Why is `sudo` required?

Teleport requires access to make modifications to your local `hosts` file, which can only be done with elevated root access.

> [!EXPERT]
> Root access is only required once.  During `init`, the permissions of the `kubefwd` binary are elevated to always run as root (See [Set-UID](https://en.wikipedia.org/wiki/Setuid) for more details), so subsequent teleport calls can be run via the current user.
