# Developing Core Services

In this tutorial we get to experience how a backend developer could use CodeZero when developing a Core Service.
In the Sample Project, the backend includes three services that handle frontend requests: Core, Leaf, and Socket services.

Traditionally the backend developer would need to run all (or many) of an application's microservices locally to work on one of the backend services. 

In this tutorial we will show two scenarios, intercepting a leaf service and using intercept and teleport together with a core service.

1. Leaf service: Here, the developer runs _only_ a leaf Service which will intercept requests
to a cluster based leaf service. No other services will be run locally. 

2. Core service: Here, the developer runs _only_ a core Service which will intercept requests
   to a cluster based core service, but it will need to have an active teleport so that it can talk to the leaf service in the cloud. No other services will be run locally.

## Objectives

In this tutorial, you will learn:

* How to develop Leaf Service locally so that services in the cluster talk to the local service.
* How to develop Core Service locally while it accesses Services in Cluster and talks to other cluster based services.
* How to collaborate with a frontend developer on another machine.

## Prerequisites

It is assumed you have the standard prerequisites:

[prerequisites](_fragments/prerequisites.md ':include')

The tutorial assumes you are at the root of the Sample Project repo, and have completed the [Sample Project tutorial](./sample-project.md) and that you have the sample project running in your cluster in the namespace `sample-project`.

## Leaf Tutorial

### Run the Leaf Service Locally

Let start by running the backend leaf service locally:

```bash
yarn start-leaf
```

You should be able to access the local Frontend service at `http://localhost:3010/api`. You should see an api response that looks something like this:

```json
{"who":"leaf","where":"Somewhere-Machine.local"}
```

This is where you would use CodeZero's **Intercept**. 

### Start the CodeZero Daemon

Assuming you have already [installed the CLI](../guides/installing.md), run:

```bash
czctl start
```

To verify that the daemon is running:

```bash
czctl session list
```

You should see a message that you have no running sessions. Reminder that you can run `czctl help` if you ever get stuck.

### Intercepting Leaf Services

Intercept sample-project-leaf service in the cluster 

Navigate to the url of your front end in the cluster. If you have used a load balancer, you can get the url to the frontend via a kubectl command:

```bash
kubectl get svc -n sample-project sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}'
```
or (for zsh, make sure you remove the escape character before the open parenthesis)
```bash
open http://$(kubectl get svc -n sample-project sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

You will see that the response of the leaf service is from the cluster based service:

```json
{
   "url": "http://sample-project-leaf:3010/api",
   "who": "leaf",
   "where": "sample-project-leaf-6b6f85dfb5-4z9jv",
   "propagated-headers": "{\"x-c6o-intercept\":\"yes\"}"
}
```

You can now intercept into the sample-project-leaf namespace using the following command:

```bash
czctl intercept service sample-project-leaf -n sample-project
```

Add a header to the frontend page request `x-c6o-intercept:yes` and refresh the frontend page. 
You will now see a response from your local system:
```json
{
    "url": "http://sample-project-leaf:3010/api",
    "who": "leaf",
    "where": "Local-Machine.local",
    "propagated-headers": "{\"x-c6o-intercept\":\"yes\"}"
}
```
The value of "where" will be the name of your local machine.

> Note: We use an extension to add headers to the request. For Chrome, the extension `ModHeader` works well.

You can debug your code by attaching the debugger to port 9339 and this will allow you to set breakpoints in the leaf service in `./packages/leaf/index.js`

> Note: if you would like to add a teleport and run the sample-project-leaf service locally, use
> `czctl teleport namespace sample-project --exclude orig-sample-project-leaf sample-project-leaf` 
> This will allow you to listen to port 3010 locally since the cluster based service will not be using your local port.

## Core Tutorial

Intercept sample-project-core service in the cluster while Teleporting to the sample-project namespace.

### Setting up a teleport

This tutorial assumes you have closed all czctl sessions with `czctl session close --all` and have stopped locally
running services.

In order to start the core service locally, the cluster configuration will need to be instantiated so that
the locally running service will talk to the cluster. This is accomplished with the `configuration` command. 
Start up the core service locally and point it to the leaf service in the cluster with:

```bash
czctl configuration deployment sample-project-core env-core.sh --format sh --namespace sample-project
source env-core.sh
yarn start-core
```

The key environment variable is `SP_LEAF_URL` (`env | grep SP_LEAF_URL`).

Now make sure it's running correctly by opening in a browser:
```bash
open http://localhost:3000/api
```
You will see the following errors in the output without a teleport:
```json
{"who":"core","where":"Robbs-MacBook-Pro.local","mongo":{"url":"mongodb://sample-project-database:27017/sample-project-database","error":"MongoNetworkError"},"leaf":{"error":"getaddrinfo ENOTFOUND sample-project-leaf"},"file":{"path":"./data/message.txt","data":"99 bugs in the code<br />\n99 bugs in the code<br />\nclone the repo, patched it around<br />\n129 bugs in the code<br />"}}
```
### Teleporting With Core Services

Unlike the leaf service, the core service will need to talk to other services in the cloud and as a result
will need a teleport. However, when a teleport is active, the services in the cloud will prevent the local system
from starting services on the same ports. Since the local core-service will need to listen to port 3000, we
will exclude it from teleports.

```bash
czctl teleport namespace sample-project --exclude orig-sample-project-core sample-project-core
```

> Note: When using teleport with a locally intercepted service, we need to exclude the intercept backup service at `orig-sample-project-core`

Now your local core service can talk to the cluster leaf service at sample-project-leaf and you should see this output:
```json
{"who":"core","where":"Robbs-MacBook-Pro.local","mongo":{"url":"mongodb://sample-project-database:27017/sample-project-database","success":true},"leaf":{"url":"http://sample-project-leaf:3010/api","who":"leaf","where":"sample-project-leaf-6b6f85dfb5-4z9jv","propagated-headers":"{\"x-c6o-intercept\":\"yes\"}"},"file":{"path":"./data/message.txt","data":"99 bugs in the code<br />\n99 bugs in the code<br />\nclone the repo, patched it around<br />\n129 bugs in the code<br />"}}
```

### Intercepting Core Services

Now, as with leaf services we can setup an intercept so that the frontend service talks to our locally running
core service.

```bash
czctl intercept service sample-project-core -n sample-project
```

You can now navigate to the front end in the cloud:

(for zsh, make sure you remove the escape character before the open parenthesis)
```bash
open http://$(kubectl get svc -n sample-project sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```
You will see that the core output comes from your locally running service with the response:
```json
{
    "url": "/api",
    "who": "core",
    "where": "Local-Machine.local"
}
```
As before, you will still be able to set breakpoints in your locally running core service.

## Collaboration with Intercept and Teleport

Assuming the backend developer has started their core service running from the previous section on core services.

Now, a frontend developer on another machine can teleport to the cluster and access your locally running core service. On another machine, teleport into sample-project and run the frontend locally. Access the cloud from the local box with `http://localhost:3030?t=1`

```bash
czctl teleport namespace sample-project
yarn start-frontend
```
navigate to `http://localhost:3030?t=1` and with the header flags `x-c6o-intercept:yes`.

```bash
open http://localhost:3030?t=1
```
They should see the output from your locally running core service where you can set breakpoints.
```json
{
    "url": "/api",
    "who": "core",
    "where": "Local-Machine.local"
}
```

## Cleanup

When you are done, you can close all Teleports, Intercepts, and Configuration sessions using:

```bash
czctl session close --all
```
