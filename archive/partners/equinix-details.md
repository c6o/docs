# Technical Details

If you are a little more technical and want to know what’s going on under the hood, this section describes the finer details of how your CodeZero cloud is configured for Equinix Metal.

## A Look Under the Hood

### Networking

Your Equinix Metal project will automatically configure local BGP to facilitate routing within your cluster. CodeZero then uses the Tigera operator to install the Calico CNI. The operator provides lifecycle management for Calico exposed via the Kubernetes API defined as a custom resource definition.

### Load Balancer with Metal LB

When a Kubernetes service wants to be exposed publicly, it tells Kubernetes it needs a Load Balancer and publicly accessible IP. Kubernetes then coordinates with your cloud provider to provision and configure an external Load Balancer. This process is generally very specific to the cloud provider hosting your cluster.

By default, Equinix Metal does not provide a load balancing service and instead allows customers to set up and configure a solution that best meets their needs.

#### What is Metal LB

Metal LB is a robust, cloud-agnostic load balancing solution that integrates with Equinix Metal and can leverage BGP routing. When creating a CodeZero cloud on Equinix Metal, we automatically install and configure Metal LB.

The Equinix Cloud Control Manager (CCM) automatically fetches your Equinix project settings to determine the appropriate networking/BGP settings for Metal LB and will automatically provision new EIPs as needed.

### Storage with Longhorn

When a pod or service requires persistent storage, they request a volume to be made available in the cluster. Kubernetes provides a mechanism for cloud providers to integrate their internal/proprietary storage mechanisms (Elastic Volumes, block storage, or what have you) using the Container Storage Interface (CSI).

Like Load Balancers, Equinix Metal does not provide a CSI out of the box and does not provide a tightly coupled storage solution.

#### What is Longhorn

Longhorn is free and open-source software that provides a lightweight and reliable distributed block storage system for Kubernetes that is completely cloud provider agnostic. Longhorn was initially developed by Rancher Labs but is now a Cloud Native Computing Foundation’s sandbox project.
Longhorn works by leveraging the spare disk space available on all your nodes to create distributed and replicated storage volumes for Kubernetes. It also provides an easy to use web dashboard to view and manage your applications’ volumes and manage backups. You can launch this dashboard by clicking on the Longhorn icon in the longhorn-system folder.
