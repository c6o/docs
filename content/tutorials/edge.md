# Developing Edge Services

In this tutorial we get to experience how a frontend developer could use
CodeZero when developing an Edge Service. In the Sample Project, the Frontend
Service is an Edge Service that makes calls to the Core and Socket services.

Traditionally the frontend developer would need to run all (or many) of an
application's microservices locally just to work on the single Frontend Service.
In this tutorial we will run _only_ the Frontend Service and teleport the other
services in the cluster to your local machine.

## Objectives

In this tutorial, you will learn:

- How to develop an Edge Service locally while it accesses Services in Cluster
- How to configure a service based on local and in-cluster environments

## Prerequisites

It is assumed you have the standard prerequisites:

[prerequisites](_fragments/prerequisites.md ":include")

The tutorial assumes you are at the root of the Sample Project repo, and have
completed the [Sample Project tutorial](/sample-project.md).

## Tutorial

### Run the Edge Service Locally

Let start by running the Frontend service locally:

```bash
yarn start-frontend
```

You should be able to access the local Frontend service at
`http://localhost:3030`, however you should see that the Socket and Core
sections show errors. This is because the Frontend is not able to access the
upstream services.

This is where you would use CodeZero's **Teleport**. First, we need the local
frontend service to know that we wish to use the teleported configuration. We
tell the Frontend service to use Teleport by adding `t=1` or `teleport=1` as a
URL parameter:

> [http://localhost:3030?t=1](http://localhost:3030?t=1) or
> [http://localhost:3030?teleport=1](http://localhost:3030?teleport=1)

This will tell the Frontend service to reference the following upstream
services:

```bash
http://sample-project-core:3030/api
http://sample-project-sockets:8999/sockets
```

...instead of trying to access those services locally:

```bash
http://localhost:3030/api
http://localhost:8999/sockets
```

### Start the CodeZero Daemon

Assuming you have already [installed the CLI](/guides/installing.md), run:

```bash
czctl start
```

To verify that the daemon is running:

```bash
czctl session list
```

You should see a message that you have no running sessions. Reminder that you
can run `czctl help` if you ever get stuck.

### Teleport into the Cluster

You can now teleport into the sample-project namespace using the following
command:

```bash
czctl teleport namespace sample-project
```

You should now see the failed connections on the webpage start to work because
the in-cluster services can now be accessed by your local Frontend.

> [!Note] You will see an error under File, but don't worry about that as we
> will fix it in a future tutorial.

Launch your favorite IDE and open the folder `packages/frontend`. You can make
changes to the frontend code here and see that you are able to test against the
in-cluster `sockets` and `core` services.

After making changes, stop and start the frontend service, and perform a hard
refresh in your browser to ensure your changes take effect.

### Cleanup

When you are done, you can close the Teleport session using:

```bash
czctl session close
```
