# Result

A result can be a KubeObject, error or other

## Properties

### error

• **error**: _any_

The resulting error

---

### object

• **object**: _KubeObject_

The resulting Kubernetes resource

---

### other

• **other**: _any_

A non-Kubernetes resource result

## Methods

### `Static` from

▸ **from**(`fn`: any): _Promise‹[Result](result.md)›_

Executes a function and generates a result

**Parameters:**

| Name | Type | Description                |
| ---- | ---- | -------------------------- |
| `fn` | any  | Function to safely execute |

**Returns:** _Promise‹[Result](result.md)›_
