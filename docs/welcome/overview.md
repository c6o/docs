---
sidebar_position: 1
slug: /
---

# Overview

Codezero is an overlay network that empowers development teams to turn Kubernetes clusters into _Teamspaces_. A Teamspace is a collaborative development environment where developers can locally _Consume_ services discoverable on a _Service Catalog_. Services featured in the catalog operate either within the Kubernetes cluster, or on a team member's local machine. Developers can _Serve_ local _Variants_ of services through this catalog to other members of the team.

<center><h3>Teamspace</h3></center>

```mermaid
flowchart LR
    subgraph Kubernetes
    direction LR
    Frontend((Service A)) --- Sockets((Service B))
    Frontend --- Core
    Core((Service C)) --- Database((Service D))
    Core ---Leaf((Service E))
    end

    subgraph Local Machine
    Frontend <-.-> |Serve|Local-Core
    Local-Core[Service C Variant] <-.-> |Consume| Database
    end
```
<i>In the above diagram, A developer is developing & running Service C <b>Variant</b> locally. Their local Service C Variant is <b>Consuming</b> Service D from the Kubernetes cluster. They are using a Codezero Teamspace to <b>Serve</b> their local Variant to Service A in the Kubernetes cluster.</i>

Variants running locally need not be containerized. They are simply services running on a local port but through the service catalog appear like they are deployed to the Kubernetes cluster. Developers can, therefore, use preferred local tooling like IDEs, debuggers, profilers and test tools (e.g. Postman) during the development process.

Teamspaces are language agnostic and operate at the network level. Any authorized member can define _Conditions_ that reshape traffic across the services available in the catalog to instantly create a _Logical Ephemeral Environment_. While the Teamspace is long running, this temporary traffic shaped environment comprising of a mix of remote and local services can be used to rapidly build and test software before code is pushed.

You do not have to be a Kubernetes admin or a networking guru in order to develop with a Teamspace. Once setup, most developers need not have any direct knowledge of, or access to the underlying Kubernetes Clusters.

## Getting Started

This documentation is geared to both Kubernetes Admins who want to create Teamspaces as well as Developers who simply want to work with Teamspaces.

We recommend you go through this documentation in the order it is presented as we build on previously defined concepts. Happy Learning!

### Guides

The Guides cover setting up and administering a Teamspace. You will require a Kubernetes Cluster to create a Teamspace. The [Kubernetes QuickStart](/guides/kubernetes-quickstart.md) has several options to get started if you do not currently have a custer. Due to inherent limitations, you cannot use a local cluster like Minikube or Kind with Codezero.

<!-- ### Concepts

WE SHOULD ADD BACK A CONCEPTS SECTION

We strive to limit the jargon that developers have to learn in order to benefit from our tooling. While words like Services and Environments are commonplace, we felt it would help to clarify this terminology within the Codezero and Kubernetes context. We cover various terms in the "Concepts" section of this documentation. -->

### Tutorials

The Tutorials focus on using a Teamspace once setup. We have put together a [Sample Kubernetes Project](/tutorials/sample-project.mdx) that comprises some of the most common Microservices Patterns you would encounter in a Kubernetes cluster. This project is used across all the Tutorials and Videos in this documentation.

The Tutorials walk you through scenarios you will encounter in just about any modern microservices application development.
