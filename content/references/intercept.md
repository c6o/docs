# Intercept Reference

Intercept allows you to selectively intercept traffic to a remote service and redirect it to your local machine.

## Usage

```bash
$ czctl service intercept [service-name]
```

### Example

```bash
> czctl service intercept my-service -n my-namespace -l 3010
```

### Arguments

| Argment       | Description
| -------       | -----------
| service-name  | The name of the service you want to intercept.

### Flags

| Flags        | Alias | Description
| ------------ | ----- | -----------
| --namespace  | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.
| --remotePort | -r    | The remote port number of the remote service to be intercepted. This is optional if the service only exposes a single port.
| --localPort  | -l    | The local port number that traffic should be fowarded to on this machine.
| --header     | -x    | Custom intercept header and value header:value. Default is `X-C6O-INTERCEPT:yes`.
| --kubeconfig | -k    | Path to a specific the kubeconfig file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
| --clean      | -c    | Close and clean up existing teleport session.
| --quiet      | -q    | Only display error message.

## More Examples

Intercept the remote service's port 3000 and route to localhost:3010

```bash
> czctl service intercept my-service -n my-namespace -l 3010 -r 3000
```

Clean up the previous session above:
```bash
> czctl service intercept my-service -n my-namespace -l 3010 -r 3000 --clean
```

Give your own custom header: 
```bash
> czctl service intercept my-service -n my-namespace -l 3010 -h X-MY-HEADER:ME
```
This routes to `x_my_header:me` or `x-my-header:me`

## Under the hood

Intercept works by:
1. intercepting traffic for a remote service
2. inspecting for given traffic headers, and directing traffic to
    a. the original (in-cluster) service if no re-direct headers are found
    b. forwarding the request through a reverse tunnel to a developers local machine if a redirect header flag is given

### Intercepting Traffic

In order to route local traffic to in cluster resources, teleport does several things:

1. Creates a small light weight NGINX deployment to inspect headers and direct traffic.
2. Modifies the existing Kubernetes Service resource to direct traffic to this proxy.

> [!NOTE]
> We try to minimize any modifications to your cluster, and revert all changes once finished. However, if any sessions close unexpectedly, run `czctl session close` to cleanup any leftover residue.

### Reverse Tunnel

When a teleport session is openned, the developers local machine creates a tunnel so it can receive traffic requests from the remote cluster without needing to change any firwarll or routing settings.

> [!PROTIP]
> Ngrok is used under the hood which exposes a simple web dashboard to view and inspect incoming traffic at http://localhost:4040.

> [!EXPERT]
> To learn more about how ngrok works, see [https://ngrok.com/](https://ngrok.com/).
