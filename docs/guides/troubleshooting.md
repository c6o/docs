---
sidebar_position: 3
---

# Troubleshooting

## Upgrade Cluster / Codezero Space Agent

Occasionally a new Codezero release requires you to Update your Codezero Space Agent (also referred to as Upgrade your Cluster)

To update your Codezero Space Agent, run the following command:

    ```bash
    helm repo add --force-update codezero https://charts.codezero.io && helm upgrade --namespace=codezero codezero codezero/codezero
    ```

## Stuck _Waiting_ for DNS

The Codezero _SpaceAgent_ service will fail to start if it is unable to obtain the DNS address of the cluster. Sometimes, the Kubernetes retry logic will time out before the ingress is ready. In this case, you may have to restart the _SpaceAgent_ service. To do so, simply restart the _SpaceAgent_ pod:

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

**NOTE:** You should close all Consume and Serve sessions before cleaning up residue in which case the Codezero SpaceAgent controller will perform the cleanup for you. If for whatever reason, it does not, you can remove the resources found and re-deploy your application to get back to a clean state.

## Getting Further Help

If you have any further questions - please reach out to us via [support@codezero.io](mailto:support@codezero.io) or [Discord](https://discord.gg/wx3JkVjTPy) or your dedicated Slack Connect channel (if you're an Enterprise Customer).
