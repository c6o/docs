<!-- markdownlint-disable MD028 MD034 -->

# Intercept

Intercept allows developers to run a service locally and selectively intercept
traffic from a remote environment to their local instance.

## Use Case

Some services are not easy to debug by calling directly, and instead, it's far
easier to rely on the interactions from higher-level services to call into our
service. For example, a backend API is often easier to test by clicking through
the frontend application.

Intercept allows developers to selectively intercept traffic for a remote
service, so they do not need to run the entire stack locally, and they can debug
against real-world traffic experienced within the remote environment.

![Intercept Dataflow](https://cdn.builder.io/api/v1/file/assets/e889f09fd60f4c0ea34d2538e0096f38/df09cf542faa4e84bbcaaf572e7885fd)

## Overview

Intercept works by creating an intermediate proxy for the service to inspect
traffic and determine if the request should be directed to the original
in-cluster service, or tunnelled to a developer's local machine.

A few scenarios are possible

1. Intercept traffic with the `X-C6O-INTERCEPT` header to my local machine.
1. Specify a custom intercept header instead, so that multiple developers can
   intercept the same services (as long as each developer uses a different
   header key/value pair).

## How it Works

When an Intercept Session is initiated, we

1. Open a local tunnel and give that tunnel a random DNS name. This local tunnel
   proxies requests through any NAT or firewall to a single locally running
   service.
1. Deploy a proxy service in the cluster.
1. Create a decoy Service that routes to the intercepted Service selectors.
1. Hijack the existing service by setting the service selectors to route traffic
   to the proxy service Deployment.
1. Create a Session record that stores all the changes made to the Kubernetes
   cluster.

The Proxy service selectively routes traffic based on the request headers.

## Under the Hood

Intercept works by:

1. Intercepting traffic for a remote service
1. Inspecting for given traffic headers, and directing traffic to a. the
   original (in-cluster) service if no re-direct headers are found b. forwarding
   the request through a reverse tunnel to a developers local machine if a
   redirect header flag is given

## Intercepting Traffic

In order to route local traffic to in cluster resources, teleport does several
things:

1. Creates a small light weight NGINX deployment to inspect headers and direct
   traffic.
1. Modifies the existing Kubernetes Service resource to direct traffic to this
   proxy.

> [!NOTE] We try to minimize any modifications to your cluster, and revert all
> changes once finished. However, if any sessions close unexpectedly, run
> `czctl session close` to clean up any leftover residue or reissue the same
> command with a --close flag.

## Propagating Headers

Unless you are intercepting _all_ traffic for a particular service, traffic is
directed to the intercepted service in-cluster vs. local depending on HTTP
headers. When the intercepted service is upstream from the frontend service,
these headers need to be propagated to the intercepted service to route the
traffic properly.

For example, if we have the following route Frontend -> Core -> Leaf, in order
to intercept the Leaf service, the Core service has to propagate intercept
headers when calling the Leaf service.

Header propagation is commonly used for performance tracking, tracing, and other
diagnostic functions.

Propagating headers is language-dependent and is not hard. It generally only
requires a few lines of code.

In this pseudocode example that makes an outbound REST request, we only
propagate headers that start with `x-c6o` but you are free to use your own
convention:

```js
  propagatedHeaders = []
  for each header in request.headers
    if (header.key.startsWith('x-c6o-'))
      propagatedHeaders.push(header)

  const result = await restRequest({ url, propagatedHeaders })
```

## Reverse Tunnel

When a teleport session is opened, the developer's local machine creates a
tunnel so that it can receive traffic requests from the remote cluster without
needing to change any firewall or routing settings. We currently use `ngrok` to
create a local tunnel however this will change in time.

> [!PROTIP] A bonus of using `ngrok` under the hood, is it provides a simple web
> dashboard to view and inspect incoming traffic. When an intercept session is
> running, check out http://localhost:4040. You can have a maximum of 4
> concurrent intercept tunnels running A tunnel expires after 24 hours. Restart
> intercept to continue after expiry.

> [!EXPERT] To learn more about how ngrok works, see
> [https://ngrok.com/](https://ngrok.com/).

## Residue

This section describes what the intercept command creates within a cluster to
accomplish its task and instructions on what to do if something breaks.

The intercept command creates three resources within the namespace of the
deployment that is intercepted:

1. A Session resource
1. A reverse-proxy Deployment
1. A decoy Service for routing un re-directed traffic to the original Deployment

The intercept command modifies the Service in front of the Deployment by backing
up and then modifying the selectors to point to the intercept Deployment. This
accomplishes the task of routing requests based on headers specified by the
command.

Specifically, the following selector is used:

```yaml
app: interceptor,
system.codezero.io/session:
  [Session hash, something like: 29ad008882b59faa516d733051a9d14b2d3b6836]
```

The ports will be pointed at port 80 by the interceptor if the targetPort is
different:

```yaml
ports:
  - port: [Some port]
    protocol: TCP
    targetPort: 80
```

The hash is stored in a Session resource defined by a Session.CRD, which you can
see by issuing the command
`kubectl get session intercept-[your namespace]-[your workload name] -o yaml`.

You will see in the namespace these resources:

- `service/interceptor-[your workload name]-decoy` (this will create endpoint:
  `endpoints/interceptor-[your workload name]-decoy` )
- `deployment/interceptor-[your workload name]` (this run some pods, like:
  `pod/interceptor-[your workload name]-6cd6c6b947-8gzcq`)
- `configmap/interceptor-[your workload name]`

These have the following responsibilities respectively:

- The service is responsible for getting traffic to the original deployment
- The interceptor for the workload type (like a deployment) is responsible for
  directing traffic based on the headers in the request
- The config map configures the redirector's pods

## Cleanup

Cleanup is accomplished by reissuing the command with a `--clean` parameter or
using the `czctl session close` or `czctl session close --all` command. If this
doesn't work, it is necessary to first correct the selector to point to the
original deployment and then delete the three resource files the intercept has
created:

First correct the selector and the ports updated by the interceptor. Get the
original values from the Session:

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
  system.codezero.io/session:
    [some hash, like: 29ad008882b59faa516d733051a9d14b2d3b6836]
```

and set it to the original, correct the selector to:

```yaml
  selector:
    [some key1]: [some value1]
    [some key2]: [some value2]
    ...
```

and the ports' section will be directed to port 80:

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

The pods and endpoints will clean up upon deletion of the decoy service and the
interceptor deployment.

### Example Cleanup

First correct the selector:

```bash
> kubectl edit service -n sample-project service/sample-project-server
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
  app: sample-project
  component: backend
```

Then delete the residue resources

```bash
> kubectl delete service -n sample-project interceptor-sample-project-server-decoy
> kubectl delete deployment -n sample-project interceptor-sample-project-server
> kubectl delete configmap -n sample-project interceptor-sample-project-server
> kubectl delete session -n sample-project intercept-sample-project-server
```

Ngrok may also be left running and can be stopped by force if necessary:

```bash
➜ ps xau | grep 'ngrok' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
67103 -> /Users/username/.codezero/bin/ngrok/ngrok start
➜ sudo kill -9 67103
```

## Closing Intercept

Run `czctl session close` to end the Intercept session or reissue the same
command with a --close flag. The session close command will clean up all the
residue added to the Kubernetes cluster and restore the intercepted service to
its original state.

## Command Reference

See the [Intercept](/references/command-line?id=intercept) command reference for
more information.
