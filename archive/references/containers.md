# Application Containers

> [!WIP]
> This document is still being developed and may be incomplete.

Creating a Containerized Application consists of two primary steps:

1. Creating an Application
1. Creating a Container Image

> [!NOTE]
> Check out this [NodeJS Hello World](../guides/hello-world) guide to see this in action.

## Creating an Application

The application itself can be developed in pretty much any language and environment that meets your needs best. Virtually anything that can execute in a Linux environment works with CodeZero. This is an extensive topic that is neither new nor specific to CodeZero. Therefore, instead of explaining all of this ourselves, we cover the basics and provide helpful links to learn more.

## Container Image

A container image represents binary data that encapsulates your application and all its software dependencies. Typically, your application's container image is published to a registry before referring to it in a Pod.

### Multiple Images

One CodeZero application may consist of one or multiple container images.

If an application has external dependencies (ex: database), we recommend application linking rather than bundling applications together. For example, when releasing a Wordpress provisioner, it may be tempting to include a MySQL container directly. However, a much better design should define the MySQL service as a dependency to leverage the power of existing MySQL instances.

## Types of Containers

CodeZero supports any containerized technology that Kubernetes supports (for example: Docker, containerd, CRI-O). However, for simplicity, we focus on applications that are containerized in Docker.

## Helpful Links
