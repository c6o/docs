# Context Add

Add a plaintext or encrypted kubeconfig context to your user kubeconfig located at `~/.kube/config`.

## Usage

```bash
> czctl context add [CONTEXT-FILENAME]
```

## Examples

```bash
> czctl context add ./encrypted-context.pem
> czctl context add ./my-regular-kubeconfig.yaml
> czctl context add
```

## Arguments

| Argument         | Description
| ----------       | -----------
| context-filename | The plaintext or encrypted kubeconfig filename.

## Flags

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --quiet        | -q    | Only display error message.
