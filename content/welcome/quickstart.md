# Quick Start Guide #

CodeZero (c6o) lets you create your own Cloud to host your your applications.  Your CodeZero Cloud is a kubernetes (k8s) cluster enhanced with the CodeZero platform.  Your cloud can run on the k8s provider of your choice: Digital Ocean, Amazon EKS, Google's GKE, Azure Kubernetes Service, or even bare metal.

This guide assumes you have no knowledge of operating a kubernetes cluster, but understand how to create one, and download the Configuration file for the k8s cluster on your chosen provider.  For more information on creating a cluster see the following for each provider:

* [Digital Ocean Kubernetes Setup]()
* [Google GKE Setup]()
* [Amazon EKS Setup]()
* [Azure Kubernetes Service Setup]()

## Installation ##

To install, create an account on the CodeZero Hub.  Click on MyClouds, and then 'Install CodeZero'. Fill in the form, creating a name and URL for your cloud.  You must upload a kubeconfig file for Hub to install the c6o system components and applications.

***TODO: screen shot of MyCloud***

> Note that the c6o Hub does not store your kubeconfig file after installation, keeping it only long enough to install the c6o platform.

Hub will then install the system components and indicate when it is ready on the Hub.

Once your Cloud is ready, click on the Cloud name in the MyClouds list to take you to the Marina, which is the CodeZero desktop application for managing your cloud.

## Deploying your first CodeZero Application ##

In the Marina desktop application, you'll see a number of icons, click on the System icon to view the system applications on your Cloud.

Open the Store application to view the applications that can be installed in your Cloud.

To get started, lets try installing the open source Node-RED application.  Click on the install link for Node-RED.  Choose the edition and namespace (folder) where you would like Node-RED to be installed.

Follow the wizard to complete the installation, choosing features and storage options.  Once Node-RED is installed, it will appear in the folder corresponding to the namespace you chose on install.

Click on the Node-RED icon to use the application.  With CodeZero, installing applications on your Cloud is that simple.

## Getting Help ##

If you run into trouble, contact CodeZero at support@codezero.io
