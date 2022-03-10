# Request a Context

Generate a request for access to a Kubernetes cluster. Send the generated request to your cluster administrator to receive encrypted credentials to a cluster.

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
