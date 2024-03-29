---
sidebar_position: 1
slug: /
---

# Overview

Codezero is for modern development with Kubernetes. Before Kubernetes and Cloud-computing it was possible to write and debug _most_ software on a single developer workstation. As software complexity has grown and organizations have moved to a microservice focused architecture designed to run on clusters of computers, it is no longer feasible to run these applications on a single workstation. This makes developing new features and diagnosing issues challenging.

This documentation is geared towards a technical audience, and we assume you have a working knowledge of Kubernetes.

## Modern Development

Debugging applications on remote environments is painful. Despite observability and logging tools, nothing matches the local development experience. For instance, you cannot set breakpoints on remote applications running in distributed environments, and you do not have access to local tooling in these environments.

Codezero allows developers to work on software in a Kubernetes cluster while getting the benefits and ergonomics of the local development experience. The tools and techniques described in this documentation will allow you to work as if your development workstation is part of the cluster. Codezero's advanced traffic shaping allows you to carve out traffic in the cluster and direct it to services under development on your local machine.

Developers can now collaborate with team members and work on any part of the application without impacting other developers or end-users. Finally, developers will experience tighter feedback loops when writing code because they will be able to test changes to services without having to deploy those changes to the cluster each time, or run locally all impacted or leveraged remote services.

## Getting Started

Our goal here is to walk you through the basics of Modern Development using Codezero for Kubernetes. This documentation is a manual for the Codezero tools and includes hands-on tutorials.

We recommend you go through this documentation in the order it is presented as we build on previously defined concepts. Happy Learning!

### Guides

Nothing beats having an actual Kubernetes cluster when it comes to learning Codezero and Kubernetes. If you already have a cluster set up, you can simply use a _namespace_ within your existing cluster and move on to [Installing the CLI](/guides/installing.mdx). Otherwise, the [Kubernetes QuickStart](/tutorials/kubernetes-quickstart.md) has several options to get started with a learning cluster.

### Concepts

We strive to limit the jargon that developers have to learn in order to benefit from our tooling. While words like Services and Environments are commonplace, we felt it would help to clarify this terminology within the Codezero and Kubernetes context. We cover various terms in the "Concepts" section of this documentation.

### Tutorials

We have put together a [Sample Kubernetes Project](/tutorials/sample-project.mdx) that comprises some of the most common Microservices Patterns you would encounter in a Kubernetes cluster. This project is used in all the Tutorials and Videos in this documentation.

The Tutorials walk you through how to develop and debug the various types of services you will encounter in just about any Kubernetes application.
