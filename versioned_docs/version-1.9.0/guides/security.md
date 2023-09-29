---
sidebar_position: 4
---

# RBAC Security

Codezero requires the following Kubernetes Role Based Access Control (RBAC) for the various commands to function.

You can choose to either restrict users to specific namespaces or give them cluster wide access. Replace `<NAMESPACE>` and `<USERNAME>` with your desired values.

## Cluster Wide RBAC

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: c6o-cluster-role
rules:
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["services", "configmaps", "pods", "pods/portforward"]
    verbs: ["*"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["*"]
  - apiGroups: ["apiextensions.k8s.io"]
    resources: ["customresourcedefinitions"]
    verbs: ["create", "get", "list", "patch"]
  - apiGroups: ["system.codezero.io"]
    resources: ["sessions"]
    verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: c6o-cluster-role-binding
subjects:
  - kind: User
    name: <USERNAME>
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: c6o-cluster-role
  apiGroup: rbac.authorization.k8s.io
```

## Namespaced RBAC

The following restricts users to create Sessions in a specific namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: <NAMESPACE>
  name: c6o-role
rules:
  - apiGroups: ["system.codezero.io"]
    resources: ["sessions"]
    verbs: ["*"]
  - apiGroups: [""]
    resources: ["services", "configmaps", "pods", "pods/portforward"]
    verbs: ["*"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: c6o-role-binding
  namespace: <NAMESPACE>
subjects:
  - kind: User
    name: <USERNAME>
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: c6o-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: c6o-cluster-role
rules:
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apiextensions.k8s.io"]
    resources: ["customresourcedefinitions"]
    verbs: ["create", "get", "list", "patch"]
  - apiGroups: ["system.codezero.io"]
    resources: ["sessions"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: c6o-cluster-role-binding
subjects:
  - kind: User
    name: <USERNAME>
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: c6o-cluster-role
  apiGroup: rbac.authorization.k8s.io
```
