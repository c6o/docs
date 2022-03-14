# Kubernetes Cluster QuickStart

CodeZero and the Sample Project is quite lightweight and work fine on a single node 4 core cluster or a two node 2 core cluster.

If you do not have a Kubernetes cluster, here is a list of providers who provide managed Kubernetes.
Most will give you more than enough credits to get the basics.
Of course, you can also follow the [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) guide if you would like to set up your own cluster from scratch.

- [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
- [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/#overview)
- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
- [DigitalOcean Kubernetes](https://try.digitalocean.com/codezero/)
- [Civo](https://www.civo.com/)

We recommend you use the service your organization uses.
We have put together a short guide on using DigitalOcean and Civo as we have found these to be especially easy to get started with.
The following guide assumes you want to name your cluster `my-cluster` and you do not wish to merge the kubeconfig into your user's default Kubernetes config.

## DigitalOcean QuickStart

Everything described here can be done in the DigitalOcean Web UI however, we find that we often set up and tear down development clusters. It helps to have the setup and teardown scripted to be able to do this quickly.

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

> [!NOTE]
> if you get this error: **"422 region has insufficient capacity for requested cluster"**,
> list the regions (see below) and select the highest number slug for that region.
> (The sfo region has sfo1, sfo2, and sfo3 as of this writing, but at some point sfo4 may be required).

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

> [!NOTE]
> The Kubeconfig file may be available before your cluster is ready for use.

> [!NOTE]
> Be sure to add `*-kubeconfig.yaml` and `*-kubeconfig.yml` to your `.gitignore` so you do not accidentally check in your credentials file!

### Tear Down

To tear down your cluster, issue the following command:

```bash
doctl k8s cluster delete my-cluster
```

We have found that occasionally, DigitalOcean does not remove Volumes and Load Balancers used by the cluster. This may be so you do not lose any important data and IP Addresses. You can clear out these resources with the following commands:

> [!WARNING]
> Be careful with the commands below as these commands will remove resources that were not part of the Kubernetes cluster!

```bash
doctl compute load-balancer list | awk 'NR>1 { print $1 }' | xargs -I id doctl compute load-balancer delete id -f
```

```bash
doctl compute volume list | awk 'NR>1 { print $1 }' | xargs -I id doctl compute volume delete id -f
```

## Civo QuickStart

As with DigitalOcean, everything described here can be done in the Civo GUI however, using the CLI makes things easier and repeatable.
Civo has the added bonus of having really fast (2 minute) provisioning times.

Civo has an excellent and succinct getting started guide
[Kubernetes Cluster Administration Using Civo CLI](https://www.civo.com/learn/kubernetes-cluster-administration-using-civo-cli). We won't repeat it here but provide a highly condensed set of scripts to get you started:

### Set Up a Cluster

The following command sets up a single node cluster and installs Traefik-v2 on it which is optional.
We found it better to separate the installation of Traefik from the creation step.

```bash
#!/bin/bash
echo 'Creating my-cluster cluster'
civo kubernetes create my-cluster -n 1 -w
echo 'Installing Traefik V2'
# There's a bug in civo where apps passed into
# civo kubernetes create are not installed
# So let's do it here
civo kubernetes applications add Traefik-v2 -c my-cluster
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

> [!NOTE]
> Be sure to add `*-kubeconfig.yaml` and `*-kubeconfig.yml` to your `.gitignore` so you do not accidentally check in your credentials file!

### Tear Down

Tear down is quite simple:

```bash
civo kubernetes delete my-cluster -y%
```
