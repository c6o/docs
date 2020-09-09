# Overview #

[whatiscodezero](../_fragments/whatiscodezero.md ':include')

CodeZero builds on top of the great work done at [Kubernetes](http://kubernetes.io), [Docker](http://docker.com) and [Istio](http://istio.io). Key to the CodeZero platform is the introduction the concept of a *Cloud Application*. A *Cloud Applications* is used to simplify the installation and management of the various resources associated with a service running on Kubernetes in a cloud.

CodeZero takes both a "user-centric" and "developer-centric" view to cluster computing. By doing this, CodeZero provides a simplified experinece for developers to maintain control over many aspects of the development lifecyle that they are used to manipulating, but at the same time greatly simplifies the deployment and maintainance of Cloud Applications. From the user's perspective, that means more easily installing and using applications in the cloud from many more possible vendors.

CodeZero software is designed to co-exist with your existing Kubernetes applications so you can leverage your current investment in these excellent technologies.

## Our Values ##

The followin core values help guide the overall architecture of CodeZero:

* Deliver an excellent development experience
* Make it easy for developers to publish their applications
* Empower everyone to use Cloud Applications
* Leverage and contribute to existing open source technologies
* Provide a seamless experience for developers throughout the development lifecycle
* Allow  everyone to run Cloud Applications on their cloud provider of choice or on-premise

## The Operating System ##

Over time, traditional operating systems have gone from handling single CPU computers, to multi-core processors and now, any number of CPU and GPU combinations. At CodeZero, we asked ourselves what this means in the age of cloud computing where software spans multiple computers or *nodes*

Just as operating systems abstract away low-level aspects of underlying computing hardware for applications and services, CodeZero provides an operating system-like abstraction for Cloud Applications.

Fortunately there is a good deal of technology already developed to help manage clusters of computers. Technologies such as [Kubernetes](http://kubernetes.io), [Docker](http://docker.com) and [Istio](http://istio.io) have made it much easier to manage and orchestrate a cluster of machines.

Despite that, we felt there was more that can be done to improve the overall experience.

## Applications and Provisioners ##

Any existing Kubernetes application can become a CodeZero application. Before CodeZero, publishing a Kubernetes application means writing up a page of instruction on how to install the app.

Some of us might recall this was how things were in the 80's. In order to run applications, one had to painstakingly type in the source code of the application in order to run it. Now, if you wish to use software on your Mac or PC, typically, the software vendor publishes an Installer. User's run installers to setup software.

We took inspiration from this 1990's technology and came up with *CodeZero Provisioners*. A provisioner is software that performs supporting functions such as installation and configuration of an application. A *CodeZero Provisioner* performs the same role for *Cloud Applications*, getting your application to the cloud easily and seemlessly.

> Provisioners provide a user friendly experience that empower non-technical users to deploy and manage Applications on a cluster of computers running Kubernetes.

## Key Features ##

The Key Features of CodeZero are:

* Defines Applications as a first class resource in Kubernetes
* Abstracts away cloud computing, networking and storage resources
* Discover, install, configure, and uninstall applications with ease
* Provides an easy to use CLI and GUI tools for accessing Cloud applications
