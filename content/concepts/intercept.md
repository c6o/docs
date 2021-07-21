# Intercept

Intercept allows developers to run a service locally, and selectively intercept traffic from a remote environment to their local instance.

## Use-Case

Some services are not easy to debug by calling directly, and instead it's far easier to rely on the interactions from higher level services to call into our service.  For example, a backend API is often easier to test by clicking through the frontend application.

Intercept allows a developer to selectively intercept the traffic they need from a remote environment, so they do not need to run the entire stack locally, and they can debug against real-world traffic experienced within the remote environment.

![Intercept Dataflow](../_media/intercept.png ':size=500')

## Overview

Intercept works by creating a intermediate proxy for a service to inspect traffic and determine if the request should be directed the original in-cluster service, or tunneled to a developers local machine.

A few scenarios are possible

1. Intercept traffic with the `X-C6O-INTERCEPT` header to my local machine.
1. Specify a customer intercept header, so that multiple developers can intercept the same services (as long as each developer uses a different header/value pair).
1. Intercept all traffic for a service to my local machine.

## Under the hood

Intercept works by:

1. Intercepting traffic for a remote service.
2. Inspecting the traffic headers, and directing traffic to:
    a. the original (in-cluster) service.
    b. forwarding the request through a reverse tunnel to a developers local machine.

### Intercepting Traffic

In order to route local traffic to in cluster resources, teleport does several things:

1. Creates a small light weight NGINX deployment.
2. Modifies the existing Kubernetes Service resource to direct traffic to this proxy.

> [!NOTE]
> We try to minimize any modifications to your cluster, and revert all changes once finished.  However, if any sessions close unexpectedly, run `czctl session close` to cleanup any leftover residue.

### Reverse Tunnel

When a teleport session is openned, the developers local machine creates an ngrok tunnel so it can receive traffic requests from the remote cluster without needing to change any firwarll or routing settings.

> [!PROTIP]
> A bonus of using ngrok under the hood, is it exposes a simple web dashboard to view and inspect incoming traffic at http://localhost:4040.

> [!EXPERT]
> To learn more about how ngrok works, see [https://ngrok.com/](https://ngrok.com/).
