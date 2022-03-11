# Session Close

Commands to help you close open sessions (sessions are started by running commands like teleport, intercept, etc.).

## Usage

```bash
> czctl session close
```

### Example

```bash
> czctl session close --all
```

### Flags

| Flags        | Alias | Description                                                                                                                     |
|--------------|-------|---------------------------------------------------------------------------------------------------------------------------------|
| --all        | -a    | Show more about the session.                                                                                                    |
| --kubeconfig | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context    |       | The name of the Kubernetes context to use.                                                                                      |
| --quiet      | -q    | Only display error message.                                                                                                     |

### alias

```bash
> czctl session clean
```

