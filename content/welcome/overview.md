# Overview

This documentation is geared towards a technical audience, and is intended for users interested in using the CodeZero CLI to improve their development cycle by leveraging the CodeZero CLI toolset to develop and debug locally.

## Getting Started

Our goal hear is to walk you through the basics of Modern Development using CodeZero for Kubernetes.

### Guides

When it comes to learning CodeZero and Kubernetes, nothing beats having an actual Kubernetes cluster. If you already have a cluster set up, you can simply use a *Namespace* within your existing cluster and move on to [Installing the CLI](installing-cli.md). Otherwise, the [Kubernetes QuickStart](kubernetes-quickstart.md) get you started with some options.

### Core Concepts

When looking at your Microservices Graph be it in Production or a pre-Production environment, it helps to think of alterations to this graph as a new, Ephemeral Environment.

CodeZero provides you a set of primitives: Teleport, Intercept and Mount which can be configured and composed to re-shape the Microservices Graph in order to work on a feature or an issue. These tools allow you to essentially create a new Logical Ephemeral Environment without affecting the traffic flow in the underlying Physical Environment.

### Tutorials

We have put together a [Sample Kubernetes Project](../lessons/sample-project.md) that comprises of some of the most common Microservices Patterns you would encounter in a Kubernetes cluster. This project is used in all the Tutorials and Videos in this documentation.

The Tutorials walk you through how to Develop and Debug the various types of services you will encounter in just about any Kubernetes application.
a
If you are new to CodeZero, we recommend you go through this documentation in the order it is put together. Happy Learning!

## Community and Support

If you need any help to get started with CodeZero, please reach out to Connery and our developer support team at [support@codezero.io](mailto:support@codezero.io)

### Found an Issue?

Please report any issues you come across to our [GitHub Issues](https://github.com/c6o/roadmap/issues), and we will try to get them resolved as soon as possible.

> [!PROTIP]
> Every document on this site is hosted on GitHub and can be edited by members of the community. Constructive pull requests and issues requesting clarification are very welcome.

### Feature Requests and Discussion

Please use our [Github Discussion Board](https://github.com/c6o/roadmap/discussions) to propose a new features or to discuss any aspect that is not an issue.

### Roadmap

Checkout our [public roadmap](https://github.com/orgs/c6o/projects/3) to see what is coming down the pipe, and help us prioritize what is important to you! At this time, the Roadmap is just a subset of everything we are working on.
