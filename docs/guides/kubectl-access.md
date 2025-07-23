---
sidebar_position: 14
---

# Using kubectl via Codezero

Although this is not our recommended method for granting kubectl access to users, you can utilise Codezero to proxy kubectl commands to the cluster.
Please be aware that Codezero users will share the same service account to execute kubectl commands.

## Deploying a kubectl proxy

:::caution
The ClusterRole rules below allow full access to the cluster. Please adjust those rules before applying the manifests.
:::

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kubectl-proxy
  labels:
    name: kubectl-proxy
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kubectl-proxy
  namespace: kubectl-proxy
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kubectl-proxy-cluster-admin
rules: # WARNING: This allows full access to the cluster. Adjust as needed.
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
- nonResourceURLs: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kubectl-proxy-cluster-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubectl-proxy-cluster-admin
subjects:
- kind: ServiceAccount
  name: kubectl-proxy
  namespace: kubectl-proxy
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: kubectl-proxy
  name: kubectl-proxy
  namespace: kubectl-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubectl-proxy
  template:
    metadata:
      labels:
        app: kubectl-proxy
    spec:
      serviceAccountName: kubectl-proxy
      containers:
      - image: bitnami/kubectl:latest
        command: ["kubectl", "proxy", "--address=0.0.0.0", "--port=8080", "--accept-hosts=.*"]
        imagePullPolicy: Always
        name: kubectl-proxy
        ports:
        - name: web
          containerPort: 8080
          protocol: TCP
        resources: {}

---
apiVersion: v1
kind: Service
metadata:
  name: kubectl-proxy
  namespace: kubectl-proxy
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: web
  selector:
    app: kubectl-proxy
```

## Using the kubectl proxy

1. On your local machine consume the `kubectl-proxy` service:

   ```sh
   echo 'kubectl-proxy.kubectl-proxy' | czctl consume apply
   ```

1. Configure kubectl to use the deployed kubectl proxy:

   ```sh
   kubectl config set-cluster kubectl-proxy --server=http://kubectl-proxy.kubectl-proxy
   kubectl config set-context kubectl-proxy --cluster=kubectl-proxy
   ```

1. Use the configured context:

   ```sh
   kubectl config use-context kubectl-proxy
   ```
