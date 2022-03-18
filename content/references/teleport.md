# Teleport

Teleport sets up your local machine to feels like it's running in-cluster.

## Usage

```bash
> czctl teleport namespace [NAMESPACE]
```

## Example

```bash
> czctl teleport namespace sample-project
```

## Arguments

| Arguments     | Description
| ------------  | -----------
| namespace     | The name of the Kubernetes namespace.

## Flags

<div class="flags-table">

| Flags           | Alias | Description
| --------------- | ----- | -----------
| --additional    | -a    | Additional namespaces to include. Repeat this flag for each additional namespace.
| --kubeconfig    | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context       |       | The name of the Kubernetes context to use.
| --clean         | -c    | Close and clean up existing teleport session.
| --quiet         | -q    | Only display error message.
| --save-profile  | -s    | Save this command to a development profile.

</div>

## More Examples

Cleanup the residue from the last command:

```bash
> czctl teleport namespace sample-project --clean
```
