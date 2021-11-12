# Overview

CodeZero is a Modern Development Platform for Kubernetes. Before Kubernetes and Cloud computing, most software development has been possible on a single developer workstation. As software complexity grows and organizations move to Microservices Architectures designed to run on cluster of computers, it is no longer feasible to run these applications on a single workstation. This makes developing new features and diagnosing issues challenging.

Debugging applications on remote environments is painful. Despite modern observability and logging tools, nothing matches the local development experience. For instance, you cannot set breakpoints on remote applications running in distributed environments. Developers do not have access to their local tooling in these environments and setting a breakpoint would block inbound requests.

CodeZero allows developers to work on software in a Kubernetes Cluster while getting the benefits and ergonomics of the local development experience. The tools and techniques described in this documentation will allow you to work as if your development workstation is a part of the cluster. CodeZero's advanced traffic shaping allow you to carve out traffic in the cluster and direct it to services under development on your local machine. You will be able to collaborate and work with team members on any part of the application without impacting other developers or end-users. Finally, you will experience a tighter feedback loop when developing as you will be able to test changes to services without having to deploy changes to the cluster each time.

This documentation is geared towards a technical audience.

## Getting Started

Our goal hear is to walk you through the basics of Modern Development using CodeZero for Kubernetes. This documentation is a manual for the CodeZero tools as well as includes hands on tutorials.

We recommend you go through this documentation in the order it is put together as we build on previously defined concepts. Happy Learning!

### Guides

Nothing beats having an actual Kubernetes cluster when it comes to learning CodeZero and Kubernetes. If you already have a cluster set up, you can simply use a *Namespace* within your existing cluster and move on to [Installing the CLI](../guides/installing-cli.md). Otherwise, the [Kubernetes QuickStart](../guides/kubernetes-quickstart.md) has several options to get started with a learning Cluster.

### Concepts

We strive to limit the jargon that developers have to learn in order to benefit from out tooling. While words like Services and Environments are commonplace, we felt it would help to clarify this terminology within the CodeZero and Kubernetes context. We cover various terms in the Concepts section of this documentation.

### Tutorials

We have put together a [Sample Kubernetes Project](../lessons/sample-project.md) that comprises of some of the most common Microservices Patterns you would encounter in a Kubernetes cluster. This project is used in all the Tutorials and Videos in this documentation.

The Tutorials walk you through how to Develop and Debug the various types of services you will encounter in just about any Kubernetes application.

## Community and Support

We love hearing from Developers! Feedback from developers like you significantly influences our product roadmap. Without your feedback, our team is relegated to long and drawn out meetings where we debate each others ill conceived opinions. Take it from us, we would rather be working on your request.

If none of the resources below address your need or if you need any help to get started with CodeZero, please reach out to Connery and our developer support team at [support@codezero.io](mailto:support@codezero.io)

### Found an Issue?

Please report any issues you come across to our [GitHub Issues](https://github.com/c6o/roadmap/issues) and you should hear from one of us within the same business day.

> [!PROTIP]
> Every document on this site is hosted on GitHub and can be edited by members of the community. Constructive pull requests and issues requesting clarification are very welcome.

### Feature Requests and Discussion

Please use our [Github Discussion Board](https://github.com/c6o/roadmap/discussions) to propose a new features or to discuss any aspect that is not an issue.

### Roadmap

Checkout our [public roadmap](https://github.com/orgs/c6o/projects/3) to see what is coming down the pipe, and help us prioritize what is important to you! At this time, the Roadmap is just a subset of everything we are working on.
