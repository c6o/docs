# Intercept

Intercept allows you to selectively intercept traffic to a remote service and redirect it to your local machine.

## Usage

```bash
> czctl intercept service [service-name]
```

### Example

```bash
> czctl intercept service -n sample-project sample-project-leaf -l 3010
```

### Arguments

| Argument     | Description                                    |
| ------------ | ---------------------------------------------- |
| service-name | The name of the service you want to intercept. |

### Flags

| Flags          | Alias | Description                                                                                                                   |
| -------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| --namespace    | -n    | The Kubernetes namespace that contains the specific workload. This defaults to 'default'.                                     |
| --remotePort   | -r    | The remote port number of the remote service to be intercepted. This is optional if the service only exposes a single port.   |
| --localPort    | -l    | The local port number that traffic should be forwarded to on this machine.                                                    |
| --header       | -x    | Custom intercept header and value header:value. Default is `X-C6O-INTERCEPT:yes`.                                             |
| --kubeconfig   | -k    | Path to a specific the kubeconfig file to use for cluster credentials. Defaults to using the KUBECONFIG environment variable. |
| --context      |       | The name of the Kubernetes context to use.                                                                                    |
| --clean        | -c    | Close and clean up existing teleport session.                                                                                 |
| --quiet        | -q    | Only display error message.                                                                                                   |
| --save-profile | -s    | Save this command to a development profile.                                                                                   |

## More Examples

Intercept the remote service's port 3000 and route to localhost:4000

```bash
> czctl intercept service -n sample-project sample-project-core -l 4000
```

or to select another port

```bash
> czctl intercept service -n sample-project sample-project-core -r 3000 -l 4000
```

Clean up the previous session above:

```bash
> czctl intercept service -n sample-project sample-project-core -r 3000 -l 4000 --clean
```

Give your own custom header:

```bash
> czctl intercept service -n sample-project sample-project-leaf -l 3010 -h X-MY-HEADER:ME
```

This routes to `x-my-header:me`
