---
sidebar_position: 2
---

# Kubernetes QuickStart

## Overview

You will require a Kubernetes cluster before you can create a Teamspace. If you are evaluating Codezero, you may safely use your own cluster and project as uninstalling Codezero is pretty straightforward. Alternatively, we have provided a [Sample Project](https://docs.codezero.io/tutorials/sample-project) for learning. Codezero and the Sample Project are lightweight and work well on a single node 4 core cluster or a two node 2 core cluster.

If you want an easy, "bare-metal" experience to create & manage your own Kubernetes cluster - try [Equinix Metal](https://deploy.equinix.com/developers/docs/metal/getting-started/)'s Getting Started. Check out [Why deploy Kubernetes on Bare Metal?](https://deploy.equinix.com/developers/guides/why-deploy-kubernetes-on-bare-metal/)

If you do not have a Kubernetes cluster and don't want to manage your own, here are managed Kubernetes Providers. Most will give you more than enough credits to get the basics.

- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
- [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/#overview)
- [Civo](https://www.civo.com/)
- [DigitalOcean Kubernetes](https://try.digitalocean.com/codezero/)
- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)

We recommend you use the service your organization uses. We have put together a short guide on using DigitalOcean and Civo as we have found these to be especially easy to get started with.
The following guide assumes you want to name your cluster `my-cluster` and you do not wish to merge the kubeconfig into your user's default Kubernetes config.

## Civo QuickStart

Everything described here can be done in the Civo GUI however, using the CLI makes things easier and repeatable.
Civo has the benefit of fast (sub-2 minute) provisioning times.

Civo has an excellent Getting Started guide: 
[Kubernetes Cluster Administration Using Civo CLI](https://www.civo.com/learn/kubernetes-cluster-administration-using-civo-cli). We won't repeat it here but provide a highly condensed set of scripts to get you started:

### Set Up a Cluster

The following command sets up a single node cluster and installs Traefik-v2 on it which is optional.

```bash
#!/bin/bash
echo 'Creating my-cluster cluster'
civo kubernetes create my-cluster -n 1 -w -a traefik2-loadbalancer
```

### Obtain Credentials

The following script fetches and exports the credentials:

```bash
#!/bin/bash
echo 'Fetching config as my-cluster-kubeconfig.yaml'
civo kubernetes config my-cluster > $PWD/my-cluster-kubeconfig.yaml
export KUBECONFIG=$PWD/my-cluster-kubeconfig.yaml
```

If you save the above as `civo-config`, You can then configure credentials anywhere you need them by running `source civo-create`

:::note
Be sure to add `*-kubeconfig.yaml` and `*-kubeconfig.yml` to your `.gitignore` so you do not accidentally check in your credentials file!
:::

### Tear Down

Tear down is quite simple:

```bash
civo kubernetes delete my-cluster -y%
```

## DigitalOcean QuickStart

As with Civo, wverything described here can be done in the DigitalOcean Web UI however, we find that we often set up and tear down development clusters. It helps to have the setup and teardown scripted to do this quickly.

### Install the CLI

This assumes you have a DigitalOcean account. Once set up, follow the [How to Install and Configure doctl](https://docs.digitalocean.com/reference/doctl/how-to/install/) guide.

### Set Up a Cluster

Once you have `doctl` installed and are authenticated, the following will set up a 2 node 2 core CPU cluster:

```bash
doctl k8s cluster create my-cluster \
   --update-kubeconfig=false \
   --region=sfo3 \
   --node-pool="name=worker-pool;size=s-2vcpu-2gb;count=2"
```

Leave out `--update-kubeconfig` if you do not want the kubeconfig to be merged into you user Kubernetes config.
The above assumes you would like to set up a cluster in San Francisco.

:::note
if you get this error: **"422 region has insufficient capacity for requested cluster"**,
list the regions (see below) and select the highest number slug for that region.
(The sfo region has sfo1, sfo2, and sfo3 as of this writing, but at some point sfo4 may be required).
:::

You can get a list of regions and compute sizes using:

```bash
doctl compute region list
```

```bash
doctl compute size list
```

### Obtain Credentials

If you had the `--update-kubeconfig=false` in the cluster create command, the `doctl` command line will **not** merge the new cluster credentials into your user's default Kubernetes config.

The following command will download the kubeconfig file, and you can use it by setting the `KUBECONFIG` environment variable:

```bash
doctl k8s cluster kubeconfig show my-cluster > my-cluster-kubeconfig.yaml
```

```bash
export KUBECONFIG=$PWD/my-cluster-kubeconfig.yaml
```

:::note
The Kubeconfig file may be available before your cluster is ready for use.
:::

:::note
Be sure to add `*-kubeconfig.yaml` and `*-kubeconfig.yml` to your `.gitignore` so you do not accidentally check in your credentials file!
:::

### Tear Down

To tear down your cluster, issue the following command:

```bash
doctl k8s cluster delete my-cluster
```

We have found that occasionally, DigitalOcean does not remove Volumes and Load Balancers used by the cluster. This may be so you do not lose any important data and IP Addresses. You can clear out these resources with the following commands:

:::caution
Be careful with the commands below as these commands will remove resources that were not part of the Kubernetes cluster!
:::

```bash
doctl compute load-balancer list | awk 'NR>1 { print $1 }' | xargs -I id doctl compute load-balancer delete id -f
```

```bash
doctl compute volume list | awk 'NR>1 { print $1 }' | xargs -I id doctl compute volume delete id -f
```
