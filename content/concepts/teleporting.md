# Teleporting

The primary concept behind Teleport is to allow developers to develop and debug their code locally as though they are inside the cluster.

## Overview

One problem that developers encounter is the need to run their entire stack of services whenever developing/debugging locally. This means developers need to maintain the domain knowledge and capability of building and running the entire service stack, even if they only are concerned about a tiny piece of the system.

CodeZero resolves this by enabling developers to only run the workloads they are concerned with, while maintaining connectivity to the remaining services within a remote environment.

![Teleport Dataflow](https://cdn.builder.io/api/v1/file/assets/e889f09fd60f4c0ea34d2538e0096f38/560ae2f5b17348c4a90f82f99d5ecf51)

There are several primary aspects to replicate the remote environment of a Kubernetes workload.

1. Workload configuration.
2. Access remote services.
3. Persistent volumes.  
4. Discoverability.

### Workload Configuration

Every workload can be given a specific configuration. Typically this is done via ConfigMaps and Secrets. CodeZero allows you to collect all the relevant configuration for a specific workload (deployment, pod, job, etc), and export it to your local machine (using `.env` or directly sourcing it to your environment). 

### Access Remote Services

In a cluster, in-cluster services can communicate with other in-cluster services. However, a problem occurs if you are outside the cluster: only publicly exposed services are accessible. This creates a problem if a locally running service needs to communicate to a non-exposed back-end service. This means that when developing a service that requires access to other back-end services, developers must run all dependent services locally.

CodeZero teleport solves this problem by creating a local tunnel into a remote cluster for each service, so developers can communicate with back-end services as though they are in the cluster.

### Workload Persistent Volumes

Every workload can mount storage drives through the use of PersistentVolumes. Persistent volumes are pieces of storage in a cluster that are available to Pods to read and write. They are of a fixed size and behave like mounted hard drives on a computer where the data continues to exist as Pods are created and destroyed. They can be mounted with different access modes like ReadWriteOnce, ReadWriteMany, and ReadOnlyMany.

CodeZero allows you to mount any workloads persistent volumes as if they are locally mounted hard drives.

### Discoverability

When services are run locally not only do they need to be able to make requests to services in the cluster, they also need to be accessible by cluster services. This enables two way communication between cluster and the local system. Local services can be made accessible through exposing the local machine through a proxy to the cluster. Additionally, proxy services that sit in front of cluster services can redirect "flagged" traffic to the local system so that only a subset of the calls going out that are related to development are redirected to the local development environment.

