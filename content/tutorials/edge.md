# Developing Edge Services

In this tutorial, we get to experience how a frontend developer could use CodeZero when developing an Edge Service. 
In the Sample Project, the Frontend Service is an Edge Service that makes calls to the Core and Socket services.

Currently, you have to run all these services either locally or in cluster. 
We would like to be able to run the Frontend Service locally and make use of the other services in the cluster.

## Objectives

In this tutorial, you will learn

* How to develop and Edge Service locally while it accesses Services in Cluster
* How to configure a service based on local and in-cluster environments

## Prerequisites

It is assumed you have the standard prerequisites:

[prerequisites](_fragments/prerequisites.md ':include')

The tutorial assumes you are at the root of the Sample Project repo.

## Tutorial

### Deploy the Project

```bash
kubectl create ns sample-project
kubectl apply -f ./k8s -n sample-project
kubectl apply -f ./k8s/loadbalance -n sample-project
```

If using LoadBalance as the Service type, you can get the Frontend IP using:

```bash
kubectl get svc sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}' -n sample-project
```
> [!NOTE]
> It may take a bit of time for the load balancer to obtain an address. 
> You can use the following command to determine if the load balancer has an external address:
> `kubectl get svc sample-project-frontend -n sample-project`

On MacOS, you can access the service using:

```bash
open http://$(kubectl get svc sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}') -n sample-project
```

### Run Edge Service locally

This is all fun and good however, we would like to make changes to the Frontend service locally. 
First, let's run it locally using:

```bash
yarn start-frontend
```

You should be able to access to local Frontend service at `http://localhost:3030` however, 
you should see that the Socket and Core sections show errors. 
This is because the Frontend is not able to access the upstream services.

This is an opportunity to use the CodeZero Teleport function. 
First, we need the local frontend service to know that we wish to use the teleported configuration 
by accessing `http://localhost:3030?t=1` or `http://localhost:3030?teleport=1`

This will reference the following upstream services:

```bash
http://sample-project-core:3030/api
http://sample-project-sockets:8999/sockets
```

instead of

```bash
http://localhost:3030/api
http://localhost:8999/sockets
```

### Teleport into the Cluster

You can now teleport using the following command

```bash
czctl teleport namespace sample-project
```

You should now see the failed connections on the web page start to work. 
Launch your favorite IDE and make changes to the code in `packages/frontend`. 
You can make changes to the front end code and see that you are able to test against 
the in cluster `sockets` and `core` services.

### Cleanup

When you are done, you can close the Teleport session using:

```bash
czctl session close
```
