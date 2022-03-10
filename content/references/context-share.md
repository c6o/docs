# Share a Context

Generate an encrypted kubeconfig context to securely share with another user, using their public key.

## Usage

```bash
> czctl context share -k [KEY] -c [CONTEXT] [FILENAME]
```

## Examples

```bash
> czctl context share -k ./public-key.pem -c ./dev-kubeconfig.yaml ./encrypted-context.pem
> czctl context share --key ./public-key.pem --context ./a-kubeconfig.yaml ./encrypted-context.pem
> czctl context share
```

## Arguments

| Argument      | Description
| -------       | -----------
| filename      | The filename (e.g. encrypted-context.pem) of the encrypted kubeconfig context to share with a specific user (if not provided, then standard output will be used).

## Flags

<div class="flags-table">

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --key          | -k    | The recipient's public key
| --context      | -c    | The plaintext kubeconfig filename
| --quiet        | -q    | Only display error message.

</div>
