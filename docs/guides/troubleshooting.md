---
sidebar_position: 20
---

# Troubleshooting

## Stuck _Waiting_ for DNS

The Codezero _Space Agent_ service will fail to start if it is unable to obtain the DNS address of the cluster. Sometimes, the Kubernetes retry logic will time out before the ingress is ready. In this case, you may have to restart the _Space Agent_ service. To do so, simply restart the _Space Agent_ pod:

```bash
kubectl rollout restart deployment spaceagent -n codezero
```

## Locating Codezero Residue

Codezero does not use any Custom Resource Definitions or finalizers. If you need to lookup resources added or modified by Codezero, you can use the following `kubectl` commands to see if there are any active Serves in the cluster:

```bash
kubectl get all --selector="app.kubernetes.io/managed-by"=codezero --all-namespaces
```

If you are looking for residue in a specific namespace, use:

```bash
kubectl -n <NAMESPACE> get all --selector="app.kubernetes.io/managed-by"=codezero
```

**NOTE:** You should close all Consume and Serve sessions before cleaning up residue in which case the Codezero Space Agent controller will perform the cleanup for you. If for whatever reason, it does not, you can remove the resources found and re-deploy your application to get back to a clean state.

## Terminate a Served Variant in the Cluster

You may encounter a situation where someone else is Serving a Variant and you (DevOps) need to terminate it.  You can do this with the following command:

```bash
kubectl delete serve -n <namespace> <service-name>
```

So for example if I wanted to delete the sample-project-core.sample-project serve from our Sample-Project app in the [c6o/sample-project](https://raw.githubusercontent.com/c6o/sample-project/) repo, you would issue the following command:

```bash
kubectl delete serve -n sample-project sample-project-core
```

Or I wanted to delete the service-b.tutorial serve from our live Tutorial app in the [c6o/tutorial-js](https://raw.githubusercontent.com/c6o/tutorial-js/) repo, you would issue the following command:

```bash
kubectl delete serve -n tutorial service-b
```

**NOTE:** To execute this command, you need access to the cluster via kubectl. Also, keep in mind that this command will delete all serves that other users might also be running.

## Getting Further Help

If you have any further questions - please reach out to us via [support@codezero.io](mailto:support@codezero.io) or [Discord](https://discord.gg/wx3JkVjTPy) or your dedicated Slack Connect channel (if you're an Enterprise Customer).
