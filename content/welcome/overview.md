# Overview #

[whatiscodezero](../_fragments/whatiscodezero.md ':include')

CodeZero builds on top of the great work done at [Kubernetes](http://kubernetes.io), [Docker](http://docker.com) and [Istio](http://istio.io). Key to the CodeZero platform is introducing the concept of *applications* used to simplify the installation and management of the various resources associated with a service running on Kubernetes.

CodeZero takes a user-centric and developer view to cluster computing while maintaining DevOps control over the aspects that they are accustomed to.

CodeZero software is designed to co-exist with your existing Kubernetes applications so you can leverage your current investment in these excellent technologies.

## Our Values ##

These core values help guide the overall architecture of CodeZero.

* Deliver an excellent development experience
* Make it easy for Developers to publish their applications
* Empower everyone to use Cloud applications
* Leverage and contribute to existing open source technologies
* Provide a seamless experience throughout the development lifecycle
* Allow  everyone to run Cloud Applications on their cloud provider of choice or on-premise

## The Operating System ##

Over time, traditional Operating Systems have gone from handling single CPU computers, to multi-core processors and now, any number of CPU and GPU combinations. At CodeZero, we asked ourselves what this means in the age of Cloud Computing where software spans multiple computers or *nodes*

Just as Operating systems abstract away low-level aspects of underlying computing hardware for applications and services, CodeZero provides an OS-like abstraction for Cloud applications.

Fortunately there is a good deal of technology already developed to help manage clusters of computers. Technologies such as [Kubernetes](http://kubernetes.io), [Docker](http://docker.com) and [Istio](http://istio.io) have made it much easier to manage and orchestrate a cluster of machines.

Despite that, we felt there was more that can be done to improve the overall experience.

## Applications and Provisioners ##

Any existing Kubernetes application can become a CodeZero application. Before CodeZero, publishing a Kubernetes application means writing up a page of instruction on how to install the app.

Some of us might recall this was how things were in the 80's. In order to run applications, one had to painstakingly type in the source code of the application in order to run it. Now, if you wish to use software on your Mac or PC, typically, the software vendor publishes an Installer. User's run installers to setup software.

We took inspiration from this 1990's technology and came up with CodeZero Provisioners. A Provisioner is software that performs supporting functions such as installation and configuration of an Application.

> Provisioners provide a user friendly experience that empower non-technical users to deploy and manage Applications on a cluster of computers running Kubernetes.

## Key Features ##

The Key Features of CodeZero are:

* Defines Applications as a first class resource in Kubernetes
* Abstracts away cloud computing, networking and storage resources
* Discover, install, configure, and uninstall applications with ease
* Provide an easy to use CLI and GUI for accessing Cloud applications