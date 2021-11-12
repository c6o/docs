# Walkthrough Demo

This guide walks through setting up a demo project with several services to demonstrate using intercept and teleport commands to debug/develop the code.

> [!WIP]
> This walk through is a work in progress, some sections are incomplete.

## Overview

### Requirements

For this walkthrough, you need:
1. A Kubernetes cluster that is accessible via a kubeconfig.
1. The CodeZero CLI installed (see [getting started](../guides/getting-started) for more details)
1. Kubernetes CLI (kubectl) installed (see [kubernetes.io Install kubectl Tool](https://kubernetes.io/docs/tasks/tools/))
1. Git installed.

### Getting Setup

1. Clone the CodeZero [sample-project](https://github.com/c6o/sample-project) repository
1. Apply the k8s resource to cluster

```bash
git clone https://github.com/c6o/sample-project.git
cd sample-project
kubectl apply -f k8s/
```

### Project Architecture

The sample-project demo attempts to mimic several major component types that might typically be found in a microservices architecture.

In this case, it consists of 5 simple services:

* sample-project-web
* sample-project-server
* sample-project-database
* sample-project-sockets
* sample-project-echo

> [!WIP]
> More details about these services, and how they interact is coming soon.

## Using CodeZero

### Teleport

Without teleport, you do not have access to any internal services running in the cluster (ex: sample-project-echo).

```bash
> curl http://sample-project-echo:8080/
curl: (6) Could not resolve host: sample-project-echo
```

Teleport enables your local machine to interact with remote services as though you are in the cluster.

```bash
> czctl deployment teleport sample-project-echo
> curl http://sample-project-echo:8080
```

> [!WIP]
> Examples of loading configuration values is coming soon.

### Intercept

Setup and run a local copy of sample-project-server on port 3010
```bash
> cd ./sample-project-server/
> source ./startdev.sh
> env|grep SAMPLE_PROJECT
    SAMPLE_PROJECT_VERSION=version 3010
    SAMPLE_PROJnECT_API_PORT=3010
> npm start
    sample-project-backend@1.0.0 start
    node server.js
    listening on 3010
    version  version 3010
```

Test before intercept
```bash
> curl -L http://sample-project-server:3000/ -H X-C6O-INTERCEPT:yes
    {"data":"Sample-Project-Server: Version Production"}
```

Run intercept (and teleport if you didn't run it previously)
```bash
> czctl service intercept -n sample-project sample-project-server -l 3010
> czctl teleport -n sample-project sample-project-server
```

Test after intercept
```bash
> curl -L http://sample-project-server:3000/ -H X-C6O-INTERCEPT:yes
    {"data":"Sample-Project-Server: Local workstation"}
> curl -L http://sample-project-server:3000/ -H SOME-OTHER-HEADER:value
    {"data":"Sample-Project-Server: Version Production"}
```
Note that your local server will log the request when you send the request with the `X-C6O-INTERCEPT:yes` header in curl

### Cleanup Sessions

To close any active teleport or intercept sessions, run:

```bash
> czctl session close --all
```
