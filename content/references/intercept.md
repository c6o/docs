# Intercept Reference

Intercept allows you to selectively intercept traffic to a remote service and redirect it to your local machine.

## Usage

```bash
> czctl service intercept [service-name]
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
| --kubeconfig | -k    | Path to a specific the kubeconfig resource to use for cluster credentials. Defaults to using the KUBECONFIG environment variable.
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

## Residue

This section describes what the intercept command creates within a cluster to accomplish its task and instructions on what to do if something breaks.

The intercept command creates three resources within the namespace of the deployment that is intercepted:
1. A Session resource
2. A reverse-proxy Deployment
3. A decoy Service for routing un re-directed traffic to the original Deployment

The intercept command modifies the Service in front of the Deployment by backing up and then modifying the selectors to point to the intercept Deployment. This accomplishes the task of routing requests based on headers specified by the command.

Specifically, the following selector is used:
```yaml
app: interceptor,
system.codezero.io/session: [Session hash, something like: 29ad008882b59faa516d733051a9d14b2d3b6836]
```

The ports will be pointed at port 80 by the interceptor if the targetPort is different:
```yaml
  ports:
  - port: [Some port]
    protocol: TCP
    targetPort: 80
```

The hash is stored in a Session resource defined by a Session.CRD, which you can see by issuing the command `kubectl get session intercept-[your namespace]-[your workload name] -o yaml`.

You will see in the namespace these resources:

* `service/interceptor-[your workload name]-decoy` (this will create endpoint: `endpoints/interceptor-[your workload name]-decoy` )
* `deployment/interceptor-[your workload name]` (this run some pods, like: `pod/interceptor-[your workload name]-6cd6c6b947-8gzcq`)
* `configmap/interceptor-[your workload name]`

These have the following responsibilities respectively:

* The service is responsible for getting traffic to the original deployment
* The interceptor for the workload type (like a deployment) is responsible for directing traffic based on the headers in the request
* The config map configures the redirector's pods

## Cleanup

Cleanup is accomplished by reissuing the command with a `--clean` parameter or using the `czctl session close` or `czctl session close --all` command. If this doesn't work, it is necessary to first correct the selector to point to the original deployment and then delete the three resource files the intercept has created:

First correct the selector and the ports updated by the interceptor. Get the original values from the Session:
```bash
> kubectl get session -n [your namespace] -o yaml
```
```yaml
...
 restore-service:
      ops:
      - op: replace
        path: /spec/selector
        value:
          [some key1]: [some value1]
          [some key2]: [some value2]
      - op: replace
        path: /spec/ports
        value:
        - name: unsecure
          port: [some port]
          protocol: TCP
          targetPort: [some port]
      service:
        apiVersion: v1
        kind: Service
        metadata:
          name: [workload name]
          namespace: [your namespace
...
```
```bash
> kubectl edit service [your service name] -n [your namespace]
```

Find the section that has this:
```yaml
  selector:
    app: interceptor
    system.codezero.io/session: [some hash, like: 29ad008882b59faa516d733051a9d14b2d3b6836]
```
and set it to the original, correct the selector to:

```yaml
  selector:
    [some key1]: [some value1]
    [some key2]: [some value2]
    ...
```
and the ports section will be directed to port 80:
```yaml
  ports:
  - name: unsecure
    port: [some port]
    protocol: TCP
    targetPort: 80
```
Correct this to the original port given in the Session resource.
```yaml
  ports:
  - name: unsecure
    port: [some port]
    protocol: TCP
    targetPort: [some port]
```

Then delete the intercept residue resources
```bash
> kubectl delete service interceptor-[your workload name]-decoy -n [your namespace]
> kubectl delete deployment interceptor-[your workload name] -n [your namespace]
> kubectl delete configmap interceptor-[your workload name] -n [your namespace]
> kubectl delete session interceptor-[your workload name] -n [your namespace]
```

The pods and endpoints will clean up upon deletion of the decoy service and the interceptor deployment.

### Example Cleanup

First correct the selector:
```bash
> kubectl edit service service/halyard-backend -n halyard
```

The selector and ports looks like so when intercept is active:
```yaml
  ports:
  - port: 3000
    protocol: TCP
    targetPort: 80
  selector:
    app: interceptor
    system.codezero.io/session: 29ad008882b59faa516d733051a9d14b2d3b6836
```
In this example, it should look like so when corrected:
```yaml
  ports:
  - port: 3000
    protocol: TCP
    targetPort: 3000
  selector:
    app: halyard
    component: backend
```
Then delete the residue resources
```bash
> kubectl delete service interceptor-halyard-backend-decoy -n halyard
> kubectl delete deployment interceptor-halyard-backend -n halyard
> kubectl delete configmap interceptor-halyard-backend -n halyard
> kubectl delete session intercept-halyard-halyard-backend -n halyard
```
