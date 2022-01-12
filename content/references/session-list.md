# Session List Reference

Commands to help you list open sessions (sessions are started by running commands like teleport, intercept, etc.).

## Usage
```bash
> czctl session list
```

### Example

```bash
> czctl session list --subsessions --detail
```

### Flags

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --detail       | -d    | Show more about the session.
| --subsessions  | -s    | Show sub-session information.
| --kubeconfig   | -k    | Path to a specific the `kubeconfig` file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --context      |       | The name of the Kubernetes context to use.
| --quiet        | -q    | Only display error message.


