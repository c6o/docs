## Using the CLI

### Accessing Your Cluster

Many CLI commands need to interact with a Kubernetes cluster. Therefore, the CLI requires access to a `kubeconfig` for your cluster. By default, we use the default cluster in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to your `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

### Getting Help

The CLI is invoked via the `czctl` command. To get more information about individual commands, check out the CLI reference, or run:

```bash
> czctl help
```

The czctl command loosely follows the conventions of the kubectl command where each command refereneces a kubernetes resource
(like a deployment or service) and where a namespace is given (with a -n flag). With each kubernetes resource there are a number of actions that can be taken. Use `czctl <resource> --help` to see the actions available for a command and `czctl <resource> <action> --help` to see the flags
available for that action. Try:

```bash
> czctl deployment teleport --help
```

```bash
> czctl service intercept --help
```

```bash
> czctl service mount --help
```
