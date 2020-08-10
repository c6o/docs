# Result

A result can be a KubeObject, error or other

## Properties

###  error

• **error**: *any*

The resulting error

___

###  object

• **object**: *KubeObject*

The resulting Kubernetes resource

___

###  other

• **other**: *any*

A non-Kubernetes resource result

## Methods

### `Static` from

▸ **from**(`fn`: any): *Promise‹[Result](result.md)›*

Executes a function and generates a result

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | any | Function to safely execute  |

**Returns:** *Promise‹[Result](result.md)›*
