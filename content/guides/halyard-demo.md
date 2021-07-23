# Walkthough Demo

This guide walks through setting up a dummy application with several services, and demonstrate using intercept and teleport to debug/develop the code.

> [!WIP]
> This walk through is a work in progress, some sections are incomplete.

## Overview

### Requirements

For this walkthrough, you need:
1. A Kubernetes Cluster with access to a valid kubeconfig.
1. The CodeZero CLI installed (see [getting started](../guides/getting-started) for more details)
1. Kubectl installed.
1. Git installed.

### Getting Setup

1. Clone the [halyard-demo](https://github.com/c6o/halyard-demo) repository
1. Apply the k8s resource to cluster

```bash
git clone https://github.com/c6o/halyard-demo.git
cd halyard-demo
kubectl apply -f k8s/
```

### Project Architecture

The halyard demo project attempts to mimic several major component types that might commonly be found in a microservices system.

In this case, it consists of 5 simple services:
* halyard-frontend
* halyard-backend
* halyard-database
* halyard-sockets
* halyard-echo

> [!WIP]
> More details about these services, and how they interact is coming soon.

## Using CodeZero

### Teleport

Without teleport, you do not have access to any internal services (ex: halyard-echo).

```bash
> curl http://halyard-echo:8080/
curl: (6) Could not resolve host: halyard-echo
```

Teleport enables your local machine to interact with remote services as though you are in the cluster.

```bash
> czctl deployment teleport halyard-backend
> curl http://halyard-echo:8080
```

> [!WIP]
> Examples of loading configuration values is coming soon.

### Intercept

> [!WIP]
> Examples of running intercept and viewing changes is coming soon.

### Cleanup Sessions

To close any active teleport or intercept sessions, run:

```bash
> czctl session close
```
