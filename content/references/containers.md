# Application Containers

> [!WIP]
> This document is still being developed and may be incomplete.

Creating a Containerized Application consists of two primary steps:

1. Creating an Application
1. Creating a Container Image

> [!NOTE]
> Check out this [NodeJS Hello World](../guide/0.5-docker.md) guide to see this in action.

## Creating an Application

The application itself can developed in pretty much any language and environment that meets your needs best. Essentially anything that can execute in a Linux environment will work.  This is a very broad topic that is neither new or specific to CodeZero.

Therefore, we cannot go into all variations of how to create the base application.

## Container Image

A container image represents binary data that encapsulates your application and all its software dependencies.  Typically a container image of your application is published to a registry before referring to it in a Pod.

### Multiple Images

One CodeZero application may consist of one or multiple container images, especially if the application is using a microservice architecture.

If an application has external dependencies (ex: database), it's highly recommended to use application linking rather than bundling applications together.  For example, if building a Wordpress provisioner, it may be tempting to directly include a MySQL container. However, a much better design should define the MySQL service as a dependency, so it can leverage the power of existing MySQL instances.

How to develop the actual application logic that will run in a customers cluster is a very broad topic, and is not new or specific to CodeZero.

Therefore, instead of trying to explain all of this ourselves, we will just cover the basics, and provide  some helpful links to learn more.

## Types of Containers

CodeZero supports any containerized technology that Kubernetes supports (for example: Docker, containerd, CRI-O).  However, for simplicity, we will focus on applications that have been containerized in docker.

## Application Binaries

Developing the application code that will be running on a customers cluster is a very broad topic, and is not in anyway specific to CodeZero.  Therefore, instead of trying to explain all of this ourselves, we include some helpful links below for how to get started.

## Getting Started

The simplest way to get started with CodeZero application development, is to first get familiar with the provisioner processes using an existing docker hub image.

See our NodeRED 

## Helpful Links

