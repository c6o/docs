## Creating a Development Profile

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜ czctl deployment teleport sample-project-core -f env.sh -n sample-project --save-profile profile-example.yaml

Command has been saved to a Development Profile. (profile-example.yaml)
```
```yaml
➜ cat profile-example.yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: profile-example
spec:
  commands:
    - command: Teleport
      params:
        resourceName: sample-project-core
        envFile: env.sh
        namespace: sample-project
        output: false
        version: 1.2.3
        kind: Deployment
        namespaceResourceId:
          apiVersion: v1
          kind: Namespace
          metadata:
            name: sample-project
            labels:
              kubernetes.io/metadata.name: sample-project
              system.codezero.io/type: environment
        resourceQuery:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            namespace: sample-project
            name: sample-project-core
            labels:
              app: sample-project
              component: core
```
> [!NOTE]
> The namespaceResourceId and resourceQuery sections of the development profile above are not not needed.

### Appending More

Commands can be added by running another command and saving to the same profile. The CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl service intercept sample-project-leaf -n sample-project --save-profile profile-example.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append 
  replace 
```
...
```yaml
? This profile already exists.  What would you like to do with the existing profile? append
Command has been saved to a Development Profile. (profile-example.yaml)
```
```yaml
➜ cat profile-example.yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: profile-example
spec:
  commands:
    - command: Teleport
      params:
        resourceName: sample-project-core
        envFile: env.sh
        namespace: sample-project
        output: false
        version: 1.2.3
        kind: Deployment
        namespaceResourceId:
          apiVersion: v1
          kind: Namespace
          metadata:
            name: sample-project
            labels:
              kubernetes.io/metadata.name: sample-project
              system.codezero.io/type: environment
        resourceQuery:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            namespace: sample-project
            name: sample-project-core
            labels:
              app: sample-project
              component: core
    - command: Intercept
      params:
        remoteService: sample-project-leaf
        namespace: sample-project
        version: 1.2.3
        namespaceResourceId:
          apiVersion: v1
          kind: Namespace
          metadata:
            name: sample-project
            labels:
              kubernetes.io/metadata.name: sample-project
              system.codezero.io/type: environment
        resourceQuery:
          apiVersion: v1
          kind: Service
          metadata:
            namespace: sample-project
            name: sample-project-leaf
            labels:
              app: sample-project
              component: leaf
```

### Creating By Manually Editing

If you wish to manually edit this file, it can be simplified down by removing `version`, `output`, 
`namespaceResourceId`, and `resourceQuery` to the following:

```yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: profile-example
spec:
  commands:
    - command: Teleport
      params:
        kind: Deployment
        resourceName: sample-project-core
        envFile: env.sh
        namespace: sample-project
```

The "commands:" section of the yaml is an array, so profiles can be combined by concatenating
the command section of several profiles. Below is an example of a teleport and intercept:

```yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: teleport-intercept-sample-project
spec:
  commands:
    - command: Teleport
      params:
        kind: Namespace
        resourceName: sample-project
        namespace: sample-project
    - command: Intercept
      params:
        remoteService: sample-project-leaf
        localPort: 3010
        remotePort: 3000
        namespace: sample-project
```
