---
sidebar_position: 1
slug: /
---

# Omni Development

## Definition

Imagine building a car with a team of people. Each of you is responsible for your own component - the steering wheel, the engine, the transmission, etc. And here’s the catch: you’re each in your own shop, with zero visibility into what the others are doing until you finally get together to assemble and troubleshoot each part.

That’s essentially how cloud native software development happens today. We build in isolation, deploy and test together, debug in isolation, get feedback, deploy again. It’s a vicious cycle. From startups to tech giants, it’s a fundamental problem in the dev process that has yet to be solved. And it’s costing millions every day.

CodeZero changes all that. Entirely. Now, team members can build in their own shops while also accessing and engaging with their colleagues’ work in real time – swapping parts in and out to make sure everything will come together seamlessly. Sound like an alternate reality? It sort of is. But that’s exactly what our solution enables.

With CodeZero, your dev team – yes, the one spread across coffee shops and continents – can build and test code in a simulated, integrated environment that’s accessible from the comfort of their own workspace. Everyone else’s work is instantly available and actionable to others, without ever having to deploy.

CodeZero is not just a tool; it’s a new way to dev. We call it _Omni-Dev_. And, soon enough, we won’t remember how we ever worked without it.

## Overview

Codezero enabled Omni-Dev with Kubernetes. Before Kubernetes and Cloud-computing it was possible to write and debug _most_ software on a single developer workstation. As software complexity has grown and organizations have moved to a microservice focused architecture designed to run on clusters of computers, it is no longer feasible to run these applications on a single workstation. This makes developing new features and diagnosing issues challenging.

This documentation is geared towards a technical audience, and we assume you have a working knowledge of Kubernetes.

Debugging applications on remote environments is painful. Despite observability and logging tools, nothing matches the local development experience. For instance, you cannot set breakpoints on remote applications running in distributed environments, and you do not have access to local tooling in these environments.

Codezero allows developers to work on software in a Kubernetes cluster while getting the benefits and ergonomics of the local development experience. The tools and techniques described in this documentation will allow you to work as if your development workstation is part of the cluster. Codezero's advanced traffic shaping allows you to carve out traffic in the cluster and direct it to services under development on your local machine.

Developers can now collaborate with team members and work on any part of the application without impacting other developers or end-users. Finally, developers will experience tighter feedback loops when writing code because they will be able to test changes to services without having to deploy those changes to the cluster each time, or run locally all impacted or leveraged remote services.

## Getting Started

Our goal here is to walk you through the basics of Omni-Dev using Codezero for Kubernetes. This documentation is a manual for the Codezero tools and includes hands-on tutorials.

We recommend you go through this documentation in the order it is presented as we build on previously defined concepts. Happy Learning!

### Guides

Nothing beats having an actual Kubernetes cluster when it comes to learning Codezero and Kubernetes. If you already have a cluster set up, you can simply use a _namespace_ within your existing cluster and move on to [Installing the CLI](/guides/installing.mdx). Otherwise, the [Kubernetes QuickStart](/tutorials/kubernetes-quickstart.md) has several options to get started with a learning cluster.

### Concepts

We strive to limit the jargon that developers have to learn in order to benefit from our tooling. While words like Services and Environments are commonplace, we felt it would help to clarify this terminology within the Codezero and Kubernetes context. We cover various terms in the "Concepts" section of this documentation.

### Tutorials

We have put together a [Sample Kubernetes Project](/tutorials/sample-project.mdx) that comprises some of the most common Microservices Patterns you would encounter in a Kubernetes cluster. This project is used in all the Tutorials and Videos in this documentation.

The Tutorials walk you through how to develop and debug the various types of services you will encounter in just about any Kubernetes application.
