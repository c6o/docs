# Session List

List open sessions (sessions are started by running commands like teleport, intercept, etc.).

## Usage

```bash
> czctl session list
```

## Example

```bash
> czctl session list --details
```

## Flags

<div class="flags-table">

| Flags        | Alias | Description                                                                                                                     |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| --details    |       | Show a detailed breakdown for sessions.                                                                                         |
| --verbose    | -v    | Show more verbose information about the session's parameters values.                                                            |
| --kubeconfig | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context    |       | The name of the Kubernetes context to use.                                                                                      |
| --quiet      | -q    | Only display error message.                                                                                                     |

</div>
