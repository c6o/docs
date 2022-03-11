# Teleport

Teleport sets up your local machine to feels like it's running in-cluster.

## Usage

```bash
> czctl teleport namespace [namespace]
```

### Example

```bash
> czctl namespace teleport sample-project
```

### Arguments

| Arguments | Description                                       |
|-----------|---------------------------------------------------|
| workload  | Type of workload you want to teleport as.         |
| name      | The name of the workload you want to teleport as. |

### Flags

| Flags          | Alias | Description                                                                                                                     |
|----------------|-------|---------------------------------------------------------------------------------------------------------------------------------|
| --additional   | -a    | Additional namespaces to include. Repeat this flag for each additional namespace.                                               |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                       |
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                      |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                   |
| --quiet        | -q    | Only display error message.                                                                                                     |
| --save-profile | -s    | Save this command to a development profile.                                                                                     |

## More Examples

Cleanup the residue from the last command:

```bash
> czctl teleport namespace sample-project --clean
```

or

```bash
> czctl session close
```
