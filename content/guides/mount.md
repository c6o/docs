# Mount Guide

Mount allows developers to locally mount cluster volumes in their local workstation so that their local code can read or write to these volumes.

## Persistent Volumes

Persistent volumes are pieces of storage in a cluster that are available to Pods to read and write. They are of a fixed size and behave like mounted hard drives on a computer where the data continues to exist as Pods are created and destroyed. They can be mounted with different access modes like ReadWriteOnce, ReadWriteMany, and ReadOnlyMany.

## Use Case

Developers need to have access to persistent volumes that workloads mount so that they can easily see data that the code is using remotely. Seeing this data is quite difficult because the data is only visible from within running pods.

CodeZero resolves visibility of persistent volume data by allowing developers to mount them as local drives.

## Overview

Mount is complimentary to Teleport in that your local code may need to read from or write to volumes that a workload has in a cluster in addition to talking to that workload. Without Mount, you would need to stub out or synthesize storage read or write operations in your code to make it run properly. With Mount, there's no need to do this, you can access these remote volumes locally.

Mount works by creating a lightweight NFS server in-cluster that mounts and shares all the volumes of a workload that you choose. 
Via the NFS server, your local system then mounts these volumes locally for you to access.

## How it Works

1. If you don't have an existing Teleport session into your cluster then one will be automatically started; however, if there is an existing Teleport session, and it isn't based on the same namespace and workload, then you will need to stop that Teleport session first.
1. Start a Mount session for the specified namespace and workload.
1. An NFS server deployment is started with a single pod, which mounts all the volumes referenced by that workload.
1. Local mounts are created that point to each of the remote NFS server volumes.

### Under the hood

Mount works as follows:

1. If you don't have an existing Teleport session into your cluster then one will be automatically started; however, if there is an existing Teleport session but it isn't based on the same namespace and workload then you will need to stop that Teleport session first
1. Start a Mount session for the specified namespace and workload
1. An NFS server deployment is started with a single pod, which mounts all of the volumes referenced by that workload
1. Local mounts are created that point to each of the remote NFS server volumes

## Closing Mount

Run `czctl session close` to end the Mount session or reissue the same command with a --close flag. The session close command will clean up all the residue added to the Kubernetes cluster and remove your local mount points.
