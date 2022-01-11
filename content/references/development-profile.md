## Creating a Development Profile

A development profile is created through running CLI commands with a --save-profile flag:

```bash
➜ czctl teleport namespace sample-project --save-profile profile-example.yaml

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
        resourceName: sample-project
        namespace: sample-project
        output: false
        version: 1.2.4
        kind: Namespace
        command: Teleport
```

### Appending More

Commands can be added by running another command and saving to the same profile. The CLI will ask you if you are
appending or replacing the contents of the Development Profile file.

```bash
czctl intercept service -n sample-project sample-project-leaf --save-profile profile-example.yaml
? This profile already exists.  What would you like to do with the existing profile? (Use arrow keys)
❯ append 
  replace 
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
        resourceName: sample-project
        namespace: sample-project
        output: false
        version: 1.2.4
        kind: Namespace
        command: Teleport
    - command: Intercept
      params:
        remoteService: sample-project-leaf
        namespace: sample-project
        version: 1.2.4
        remotePort: 3010
        command: Intercept
        resourceName: sample-project-leaf
```

### Creating By Manually Editing

> [!NOTE]
> Development Profiles are in preview and should be edited at your own risk. The file format is subject to change.

If you wish to manually edit this file, it can be simplified down by removing `version`, `output`. Any parameter that 
has a derived or default value can be removed (these are parameters that don't require user interaction if not given):

```yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: profile-example
spec:
  commands:
    - command: Teleport
      params:
        resourceName: sample-project
        namespace: sample-project
        kind: Namespace
        command: Teleport
```

The "commands:" section of the yaml is an array, so profiles can be combined by concatenating
the command section of several profiles. Below is a minimum parameters example of a teleport and intercept:

```yaml
apiVersion: system.codezero.io/v1alpha1
kind: DevelopmentProfile
metadata:
  name: profile-example
spec:
  commands:
    - command: Teleport
      params:
        resourceName: sample-project
        namespace: sample-project
        kind: Namespace
        command: Teleport
    - command: Intercept
      params:
        remoteService: sample-project-leaf
        namespace: sample-project
        command: Intercept
        resourceName: sample-project-leaf
```
