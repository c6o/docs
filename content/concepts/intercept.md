# Intercept

Intercept allows developers to run a service locally and selectively intercept traffic from a remote environment to their local instance.

## Use-Case

Some services are not easy to debug by calling directly, and instead, it's far easier to rely on the interactions from higher-level services to call into our service.  For example, a backend API is often easier to test by clicking through the frontend application.

Intercept allows developers to selectively intercept traffic for a remote service, so they do not need to run the entire stack locally, and they can debug against real-world traffic experienced within the remote environment.

![Intercept Dataflow](../_media/intercept.png ':size=500')

## Overview

Intercept works by creating an intermediate proxy for a service to inspect traffic and determine if the request should be directed to the original in-cluster service, or tunnelled to a developer's local machine.

A few scenarios are possible

1. Intercept traffic with the `X-C6O-INTERCEPT` header to my local machine.
1. Specify a customer intercept header, so that multiple developers can intercept the same services (as long as each developer uses a different header/value pair).
1. Intercept all traffic for a service to my local machine.

## Under the hood

Intercept works by:

1. Intercepting traffic for a remote service.
2. Inspecting the traffic headers, and directing traffic to:
    a. the original (in-cluster) service.
    b. forwarding the request through a reverse tunnel to a developer's local machine.

### Intercepting Traffic

In order to route local traffic to in cluster resources, teleport does several things:

1. Creates a lightweight NGINX deployment.
2. Modifies the existing Kubernetes Service resource to direct traffic to this proxy.

> [!NOTE]
> We try to minimize any modifications and residue in your cluster.  However, if any sessions close unexpectedly, run `czctl session close` to clean up any leftover residue.

### Reverse Tunnel

When a teleport session is opened, the developer's local machine creates an `ngrok` tunnel to receive traffic requests from the remote cluster without changing any firewall or routing settings.

> [!PROTIP]
> A bonus of using `ngrok` under the hood, is it provides a simple web dashboard to view and inspect incoming traffic.  When an intercept session is running, check out http://localhost:4040.

> [!EXPERT]
> To learn more about how `ngrok` works, see [https://ngrok.com/](https://ngrok.com/).
