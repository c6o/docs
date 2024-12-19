---
sidebar_position: 10
---

# Advanced Configuration for Space Agent

## Scaling Space Agents (Preview)

When installing Codezero with the default Helm values, it launches a single Space Agent pod within your cluster. In order to run multiple Space Agent pods, a dedicated Redis or Valkey instance is required.

```yaml
spaceagent:
  replicas: 2
  redis:
    secret: name-of-redis-secret
```

You can read more about the Space Agent configuration options in the [Codezero Helm Chart documentation](https://github.com/c6o/helm-charts/blob/pasley/README.md).

## Scaling Routers

By default, when you Serve a service variant, the Space Agent deploys a router with a single replica. This deployment configuration may result in availability disruptions if the router pod is evicted.
To specify the number of replicas for the router deployments, you can provide the desired number of replicas as a Helm chart value:

```yaml
router:
  replicas: 2
```

You can read more about the Router configuration options in the [Codezero Helm Chart documentation](https://github.com/c6o/helm-charts/blob/pasley/README.md).
