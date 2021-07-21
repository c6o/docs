# Intercept Reference

Intercept allows you to selectively intercept traffic to a remote service and redirect it to your local machine.

## Usage

```bash
$ czctl service intercept [service-name]
```

### Example

```bash
> czctl service intercept my-service -n my-namespace -l 3000
```

### Arguments

| Argment       | Description
| -------       | -----------
| service-name  | The name of the service you want to intercept.

### Flags

| Flags  | Alias | Description
| -----  | ----- | -----------
| --namespace | -n | The Kubernetes namespace that contain the specific workload.  This field is ignored when the workload type is namespace, otherwise defaults to 'default'
| --remotePort | -r    | The remote port number of the remote service to be intercepted.  This is optional if the service only exposes a single port.
| --localPort | -l    | The local port number that traffic should be fowarded to on this machine.
| --header | -x    | Custom intercept header and value header:value. Default is `X-C6O-INTERCEPT:yes`.
| --kubeconfig | -k | Path to a specific the kubeconfig file to use for cluster credentials.  Defaults to using the KUBECONFIG environment variable.
| --all  | -a | Intercept all traffic to this service, no matter what headers are provided.
| --clean  | -c | Close and clean up existing teleport session.
| --quiet  | -q | Only display error message.
| --wait   | -w | Wait for terminate signal and then clean up.

## Under the hood

Intercept works by:
1. intercepting traffic for a remote service
2. inspecting the traffic headers, and directing traffic to
    a. the original (in-cluster) service
    b. forwarding the request through a reverse tunnel to a developers local machine


### Intercepting Traffic

In order to route local traffic to in cluster resources, teleport does several things:

1. Creates a small light weight NGINX deployment.
2. Modifies the existing Kubernetes Service resource to direct traffic to this proxy.

> [!NOTE]
> We try to minimize any modifications to your cluster, and revert all changes once finished.  However, if any sessions close unexpectedly, run `czctl session close` to cleanup any leftover residue.

### Reverse Tunnel

When a teleport session is openned, the developers local machine creates an ngrok tunnel so it can receive traffic requests from the remote cluster without needing to change any firwarll or routing settings.

> [!PROTIP]
> A bonus of using ngrok under the hood, is it exposes a simple web dashboard to view and inspect incoming traffic at http://localhost:4040.

> [!EXPERT]
> To learn more about how ngrok works, see [https://ngrok.com/](https://ngrok.com/).
