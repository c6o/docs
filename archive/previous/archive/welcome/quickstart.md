# Quick Start Guide #

CodeZero (c6o) lets you create your own Cloud to host your applications. Your CodeZero Cloud is a Kubernetes (k8s) cluster enhanced with the CodeZero platform. Your cloud can run on the Kubernetes provider of your choice: Digital Ocean, Amazon EKS, Google's GKE, Azure Kubernetes Service, or even bare metal.

This guide assumes you have no knowledge of operating a Kubernetes cluster, but understand how to create one, and download the Configuration file for the cluster on your chosen provider. For more information on creating a cluster see the following for each provider:

* [Digital Ocean](https://www.digitalocean.com/products/kubernetes/)
* [Google GKE Setup](https://cloud.google.com/kubernetes-engine)
* [Amazon EKS Setup](https://aws.amazon.com/eks/)
* [Azure Kubernetes Service Setup](https://azure.microsoft.com/en-us/services/kubernetes-service/)

For a limited time, you can get a [$100 credit on DigitalOcean](https://try.digitalocean.com/codezero/)

## Installing CodeZero ##

To install, create an account on the [CodeZero Hub](https://hub.codezero.io). Click on My Clouds, and then 'Install CodeZero'. Follow the on-screen instructions to set up CodeZero.

![Install Screen](../_media/install.png ':size=800px')

> Note that the Hub does not store your Kubeconfig file after installation, keeping it only long enough to install the platform.

Hub will then install the system components and indicate when it is ready on the Hub.

Once your Cloud is ready, click on the Cloud name in the My Clouds list to take you to the Marina, which is the CodeZero desktop application for managing your cloud.

## Installing Applications ##

In the Marina desktop application, you'll see a number of icons, click on the Store icon in order to install applications in your Cloud.

To get started, lets try installing the open source Node-RED application. Click on the install link for Node-RED. Choose the edition and namespace (folder) where you would like Node-RED to be installed.

Follow the wizard to complete the installation, choosing features and storage options. Once Node-RED is installed, it will appear in the folder corresponding to the namespace you chose on install.

Click on the Node-RED icon to use the application. With CodeZero, installing applications on your Cloud is that simple.

## Getting Help ##

If you run into trouble, contact CodeZero at support@codezero.io
