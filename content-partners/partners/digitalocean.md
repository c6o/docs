# Hot To Use CodeZero on Kubernetes for Remote Development

### Introduction
As a developer you like writing code. However, you now also need to wear so many other hats to get your code running in the cluster. Kubernetes does a lot to take care of scaling and running your code in the cluster. However, troubleshooting various issues that occur in any of your cluster environments can be a daunting and exhausting process. You can take on the goal of learning the ins and outs of Kubernetes but this isn't practical nor typically a developer role in most organizations. In that case, you can work closely with your DevOps team to assist you in this. But, there is a different approach, which is so much easier and simpler.

CodeZero allows you to run or debug your local code against your remote cluster. The software's Teleport feature registers the necessary DNS entries on your local machine and listens for your code connecting to these entries and tunnels them into your cluster. In addition, your remote cluster configuration and secrets can be made avaiable locally if required.

Teleport is great when trying to access services that have already been deployed to the cluster. If, however, you would like to have cluster services access to something running locally, you'll need Intercept. CodeZero's intercept feature can hijack calls in your cluster and route them to your local machine. This can be done based on the request's header key/value pair without impacting the normal cluster traffic.

When it comes to volumes, CodeZero's mount feature gives you the ability to mount in cluster volumes on your local machine.


### Goals
1. Download and install the CodeZero CLI
1. Teleport from your code to run against a workload in your cluster
1. Intercept code from your cluster into your local workstation
1. Mount remote volumes from your cluster into your local workstation

## Prerequisites
1. A Kubernetes cluster such as [DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes/). We will use DigitalOcean Kubernetes for the tutorial, but you can also use an existing Kubernetes cluster with any other provider.
1. [kubectl](https://kubernetes.io/docs/tasks/tools/}) installed locally on your workstation and configured to connect to the Kubernetes cluster
1. A local development environment for Node.js. You can follow [How to Install Node.js and Create a Local Development Environment](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment).
1. One or more of your workloads running in the cluster, e.g.: Deployment, Job, CronJob, Pod, etc.  If you don't have anything yet then simply install our sample project by running: `kubectl apply -f https://github.com/c6o/project-demo/k8s/onefile.yaml -n your-namespace`

## Step 1 — Installing the CodeZero CLI

In this step you will download the latest version of the CodeZero CLI (command line interface) and install it.

Open up your favourite terminal and enter the following command to install `czctl` globally:
```bash
$ brew install c6o/tools/czctl
```

Test it out by running:
```bash
$ czctl version
```
and you should see output similar to the following:
```bash
@c6o/cli/1.1.1 darwin-arm64 node-v16.6.2
```

In future, if you ever wish to uninstall the CodeZero CLI, just run:
```bash
$ npm uninstall @c6o/cli
```

## Step 2 — Starting the CodeZero daemon

Test to ensure your terminal session has access to your cluster:
```bash
$ kubectl get ns
```
with output similar to the following:
```bash
NAME              STATUS   AGE
default           Active   1h
kube-node-lease   Active   1h
kube-public       Active   1h
kube-system       Active   1h
```
If you don't see this output but instead get an error, such as `The connection to the server localhost:8080 was refused - did you specify the right host or port?` , be sure to set the `KUBECONFIG` environment variable to point to your Kubernetes configuration file that you downloaded from you cloud provider.  For example:
```bash
$ export KUBECONFIG=/Users/me/Downloads/my-kubeconfig.yaml
```

`kubectl apply `

```bash
$ czctl start
```
with output similar to the following:
```bash
CodeZero requires elevated privileges to start-up properly.
Elevating to root... (you may be prompted for your password)
Password:
✔  Starting background daemon.                                           Done
✔   Initializing CodeZero.                                               Done
✔   Configuring teleport service and permissions.                        Done
...
```

## Step 3 - Teleporting your code into the cluster

Let's assume you have a deployment called `your-deployment` running in the `your-namespace` namespace, then you can teleport to this workload using:
```bash
$ czctl deployment teleport -n your-namespace your-deployment
```
with output similar to the following:
```bash
✔  Starting teleport session to Deployment your-deployment in your-namespace.   Done
✔   Looking for and starting pods for pod-less services in your-namespace.      Done
✔    Starting tunnel into your-namespace.                                       Done
✔    Connecting remote service to local tunnel.                                 Done
```

Now, depending on your code, you can access all of the remote services in the cluster locally by using just the service name.  For example, if your deployment has a service called `service-name` and it's a web-based service, then open up a browser on your local workstation and navigate to (http://service-name/), assuming it's on port 80; otherwise navigate to (http://service-name:1234/) where 1234 is the service port number.

Of course, if your service isn't web-based then access it how you normally would in cluster, for example via TCP connection.

Once you're done, close this teleport session by running either of the following commands:
```bash
$ czctl deployment teleport -n your-namespace your-deployment --clean
```
or
```bash
$ czctl session close
```

## Step 4 - Mounting remote volumes on your local workstation

Let's assume you have a deployment called `your-deployment` running in the `your-namespace` namespace, then you can mount any volumes in this workload using:
```bash
$ czctl deployment mount -n your-namespace your-deployment ./mounts
```
with output similar to the following:
```bash
✔  Mounting volumes from your-deployment                                        Done
✔   Starting teleport session to Deployment your-deployment in your-namespace.  Done
✔    Looking for and starting pods for pod-less services in your-namespace.     Done
✔     Starting tunnel into your-namespace.                                      Done
✔     Connecting remote service to local tunnel.                                Done
✔     Adding nfs server in your-namespace                                       Done
✔    Mounting /volumes/test1 at mounts/test1                                    Done
✔    Mounting /volumes/test2 at mounts/test2                                    Done
```

Now, depending on your code, you can access all of the remote volumes in the cluster locally by using just the local mount points.

Once you're done, close this mount session by running either of the following commands:
```bash
$ czctl deployment mount -n your-namespace your-deployment ./mounts --clean
```
or
```bash
$ czctl session close
```

## Step 5 - Intercepting your code in the cluster to your local workstation

Let's assume you have a service called `your-service` running in the `your-namespace` namespace, then you can locally intercept calls to this service using:
```bash
$ czctl service intercept -n your-namespace your-service -x header-name:header-value
```
with output similar to the following:
```bash
✔  Starting intercept session for your-service in your-namespace.            Done
✔   Starting tunnel worker process                                           Done
✔    Updating routes for your-service in your-namespace                      Done
✔    Adding intercept for your-service in your-namespace                     Done
✔    Connecting remote service to local tunnel.                              Done
```

Now, depending on your code, you can access all of the remote services in the cluster locally by using just the service name.  For example, if your deployment has a service called `service-name` and it's a web-based service, then open up a browser on your local workstation and navigate to (http://service-name/), assuming it's on port 80; otherwise navigate to (http://service-name:1234/) where 1234 is the service port number.

Of course, if your service isn't web-based then access it how you normally would in cluster, for example via TCP connection.

Once you're done, close this teleport session by running either of the following commands:
```bash
$ czctl service intercept -n your-namespace your-service -x header-name:header-value --close
```
or
```bash
$ czctl session close
```

## Conclusion

This tutorial walked you through installing the CodeZero CLI, teleporting your local environment to your cluster, mounting remote volumes on your local workstation, and intercepting code running in the cluster to your local workstation.