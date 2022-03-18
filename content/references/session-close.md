# Session Close

Close open sessions (sessions are started by running commands like teleport, intercept, etc.).

## Usage

```bash
> czctl session close
```

## Example

```bash
> czctl session close --all
```

## Flags

<div class="flags-table">

| Flags           | Alias | Description
|-----------------|-------| -----------
| --all           | -a    | Close any running sessions for the active context.
| --kubeconfig    | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context       |       | The name of the Kubernetes context to use.
| --quiet         | -q    | Only display error message.

</div>

## Aliases

```bash
> czctl session clean
```
