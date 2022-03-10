# Context Add

Add a plaintext or encrypted kubeconfig context to your user kubeconfig located at `~/.kube/config`.

## Usage

```bash
> czctl context add [CONTEXT]
```

## Examples

```bash
> czctl context add ./context.czconfig
> czctl context add ./my-regular-kubeconfig.yaml
> czctl context add
```

## Arguments

| Argument      | Description
| -------       | -----------
| context       | The plaintext or encrypted kubeconfig filename.

## Flags

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --quiet        | -q    | Only display error message.
