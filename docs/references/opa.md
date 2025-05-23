---
sidebar_position: 7
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

| Input                  | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| action.operation       | `consume` or `serve`                                                   |
| action.condition.type  | `default`, `user` or `header`                                          |
| action.condition.key   | header key if the condition type is `header`                           |
| action.condition.value | header value if the condition type is `header`                         |
| auth.userID            | the Codezero user ID                                                   |
| auth.email             | the Codezero user's email address                                      |
| resource.namespace     | the namespace of the resource that a user wants to consume or serve    |
| resource.service       | the service name of the resource that a user wants to consume or serve |

For example the following [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/) code restricts access to any resources in the `codezero` namespace:

```rego
package codezero

import rego.v1

default allow := false

allow if {
    input.resource.namespace != "codezero"
}
```
