# Request a Context

Request access to a Kubernetes cluster securely. Send your public key to your cluster administrator to receive an encrypted kubeconfig context.

## Usage

```bash
> czctl context request [FILENAME]
```

## Examples

```bash
> czctl context request ./public-key.pem
> czctl context request --regenerate ./public-key.pem
> czctl context request
```

## Arguments

| Argument      | Description
| -------       | -----------
| filename      | The filename (e.g. public-key.pem) to write your public key to (if not provided, the public key will be copied to the clipboard).

## Flags

<div class="flags-table">

| Flags          | Alias | Description
| -------------- | ----- | -----------
| --regenerate   | -r    | Regenerate your public/private key pair
| --output       | -o    | Output the public key to the terminal
| --quiet        | -q    | Only display error message.

</div>
