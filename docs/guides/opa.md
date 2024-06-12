---
sidebar_position: 8
---

# Managing Access via Open Policy Agent

:::note
This feature is currently in Preview and may be subject to change.
:::

Codezero can integrate with Open Policy Agent (OPA) via the REST API for [Named Policy Decisions](https://www.openpolicyagent.org/docs/latest/integration/#named-policy-decisions).

You need to set the following Helm Chart variables:

| Helm Chart Variable | Value                             |
| ------------------- | --------------------------------- |
| opa.enabled         | `true`                            |
| opa.url             | URL for the Named Policy Decision |

Codezero sends the following inputs to the Named Policy Decision URL:

| Input              | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| scope              | `consume` or `serve`                                                   |
| auth.userID        | the Codezero user ID                                                   |
| resource.namespace | the namespace of the resource that a user wants to consume or serve    |
| resource.service   | the service name of the resource that a user wants to consume or serve |

For example the following [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/) code restricts access to any resources in the `codezero` namespace:

```rego
package codezero

import rego.v1

import input.auth
import input.scope
import input.resource

default allow = false

allow if {
    resource.namespace != "codezero"
}
```
