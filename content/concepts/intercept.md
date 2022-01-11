# Intercept

Intercept allows developers to run a service locally and selectively intercept traffic from a remote environment to their local instance.

## Use Case

Some services are not easy to debug by calling directly, and instead, it's far easier to rely on the interactions from higher-level services to call into our service. For example, a backend API is often easier to test by clicking through the frontend application.

Intercept allows developers to selectively intercept traffic for a remote service, so they do not need to run the entire stack locally, and they can debug against real-world traffic experienced within the remote environment.

![Intercept Dataflow](https://cdn.builder.io/api/v1/file/assets/e889f09fd60f4c0ea34d2538e0096f38/df09cf542faa4e84bbcaaf572e7885fd)

## Overview

Intercept works by creating an intermediate proxy for the service to inspect traffic and determine if the request should be directed to the original in-cluster service, or tunnelled to a developer's local machine.

A few scenarios are possible

1. Intercept traffic with the `X-C6O-INTERCEPT` header to my local machine.
1. Specify a custom intercept header instead, so that multiple developers can intercept the same services (as long as each developer uses a different header key/value pair).

## How it Works

When an Intercept Session is initiated, we

1. Open a local tunnel and give that tunnel a random DNS name. This local tunnel proxies requests through any NAT or firewall to a single locally running service.
1. Deploy a proxy service in the cluster.
1. Create a decoy Service that routes to the intercepted Service selectors.
1. Hijack the existing service by setting the service selectors to route traffic to the proxy service Deployment.
1. Create a Session record that stores all the changes made to the Kubernetes cluster.

The Proxy service selectively routes traffic based on the request headers.

## Closing Intercept

Run `czctl session close` to end the Intercept session. The session close command will clean up all the residue added to the Kubernetes cluster and restore the intercepted service to its original state.

## Local Tunnel

We currently use `ngrok` to create a local tunnel however this will change in time.

> [!PROTIP]
> A bonus of using `ngrok` under the hood, is it provides a simple web dashboard to view and inspect incoming traffic. When an intercept session is running, check out http://localhost:4040.
> You can have a maximum of 4 concurrent intercept tunnels running
> A tunnel expires after 24 hours.  Restart intercept to continue after expiry.
