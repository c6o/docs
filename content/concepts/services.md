# Services

[Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/) route traffic to Pods based on
a DNS name and load-balance across them. Service Resources typically work with Endpoints or Workloads
(Deployments, DaemonSets, Pods, CronJobs, Jobs).

For the purposes of the tutorials and diagrams, we omit the Workload unless it is relevant to the lesson at hand.

We categorize Services into the following three types based on their inputs and outputs:

* Edge
* Core
* Leaf

## Edge

An Edge Service depends on Services inside the cluster but no other Service in the cluster depends on an Edge Service. 
Edge Services are usually the target on Ingress routes into the cluster.

Frontend web applications are often Edge Services

## Core

A Core Service consumes Services and is consumed by Services inside the cluster.

An internal API that is not exposed outside the cluster is an example Core Service.

> [!Note]
> The core Service in the Tutorial is not a core service in this purest sense as it is exposed to the outside via 
> the `/api` route.

## Leaf

A Leaf Service is consumed by Services inside the cluster but does not consume any other Services in the cluster.

A database or cache service is a common Leaf Service.
