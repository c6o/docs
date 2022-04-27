# Collaboration

## Development Profiles

A Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands. This allows developers to easily get several commands running for the tasks at hand without having to remember all the command line parameters for the command line tool. Just record a series of commands to create a Development Profile to be used later to rerun those commands again.

### Overview

A development profile creates a specific development scenario. For instance, a developer may want to teleport their machine into a cluster and intercept a particular service. A development profile remembers the parameters required so that the developer doesn't have to remember them to recreate a scenario when they want to debug something.

### Getting Started

Creating a Development Profile is as simple as using `czctl` just as you would normally, but appending the `--save-profile [filename]` flag.

> [!NOTE]
> See [CodeZero Overview](/welcome/overview) and [Installing CodeZero](/guides/installing) for more information on getting started with the CLI.

#### Examples

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜  czctl teleport namespace sample-project --save-profile dev-profile.yaml
```

After running the command, you should see output similar to "Command has been saved to a Development Profile: (dev-profile.yaml)".

> [!PROTIP]
> If you are running the command from a directory with a `.codezero` directory, a profile file will automatically be created and placed in a folder inside `.codezero/develop/`.

```bash
➜  czctl env deployment -n sample-project sample-project-core env.sh --save-profile dev-profile2.yaml
```

> [!NOTE]
> Development Profiles are still under active development and are subject to change.

#### Appending More

Commands can be added by running another command and saving to the same profile with a "save-profile-mode" flag
with the value "append". Other values for this flag are 'create' amd 'replace'.

```bash
➜  czctl intercept service sample-project-core -n sample-project -l 3010 --save-profile dev-profile.yaml --save-profile-mode append
```

If you forget this flag, the CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl mount deployment -n sample-project sample-project-core ./mnt --save-profile dev-profile.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append
  replace
```

### Sharing a Profile

We recommend storing session profiles in the folder `.codezero/develop/` at the root of your code repository as the CodeZero desktop application looks at this folder to find profiles and profiles can be shared among the development team more easily this way.

### Running a Profile

Currently, running a Development Profiles is best accomplished via the Desktop app. First launch the Desktop application and load a workspace by selecting your current project directory (the directory that contains a .codezero folder).  This will automatically search for all Development Profiles located in the `.codezero/develop/` folder of this workspace.

---

## Securely Sharing Contexts

A kubeconfig context provides access to a Kubernetes cluster, and should be protected. When working in a team of developers, however, there may be a need to share a context amongst team members so that developers using the CodeZero CLI or Desktop app can run commands against a common cluster.

Typically only a limited number of people have access to download a cluster's kubeconfig, so this presents a problem for giving developers the kubeconfig contexts they need, while not introducing security vulnerabilities.

With CodeZero developers can request an encrypted context from the cluster admin so that contexts can be shared safely and securely over unsecure channels.

> [!NOTE]
> A cluster's kubeconfig should never be shared unencrypted. Anyone with the kubeconfig will have access to the cluster.

### Requesting a Context

The developer who does not have access to download a cluster's kubeconfig can use the Desktop app or the CLI to request an encypted context.

#### Using the Desktop App

1. Click on the CodeZero system tray icon and select **Contexts -> Request Context**.
2. You will be presented with a screen containing your public key. The associated private key is stored securely in a local database.
3. Copy or download your public key.
4. Send the public key to your cluster admin and wait for them to generate and send you back an encrypted context.
5. Once you have an encrypted context you can [add it](/guides/using-desktop-app?id=adding-a-context) using the Desktop app or the [CLI](/references/command-line?id=add).

#### Using the CLI

You can use CodeZero CLI's `context request` command to save your public key to file or copy it to your clipboard. See the [command reference](/references/command-line?id=request) for more details.

### Generating and Sharing an Encrypted Context

A cluster administrator who has permission to download a cluster's kubeconfig can generate an encypted context for sharing over an unsecure channel like IM or email.

#### Using the Desktop App

1. Recieve a public key from the developer needing cluster access.
2. Click on the CodeZero system tray icon and select **Contexts -> Share Context**.
3. You will be presented with a screen where you will need to paste in or upload the public key, and also paste in or upload the un-encypted context.
4. Click the "Encrypt" button.
5. An encypted context will be generated and presented on the next screen. Copy or download the encrypted context and share with the developer owning the associated public key.

#### Using the CLI

You can use CodeZero CLI's `context share` command to generate an encrypted context. See the [command reference](/references/command-line?id=share) for more details.

---

## Security Guide

CodeZero requires the following Kubernetes Role Based Access Control (RBAC) for the various commands to function.

You can choose to either restrict users to specific namespaces or give them cluster wide access. Replace `<NAMESPACE>` and `<USERNAME>` with your desired values.

### Cluster Wide RBAC

``` yaml
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

### Namespaced RBAC

The following restricts users to create Sessions in a specific namespace.

``` yaml
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
