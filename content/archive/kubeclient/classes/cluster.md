# Cluster

## Properties

###  info

• **info**: *[Version](version.md)*

The Kubernetes cluster-info

___

###  processor

• **processor**: *[Processor](processor.md)*

The currently executing processor. Each begin/end block starts a new processor.

## Methods

###  begin

▸ **begin**(`stageName?`: string): *[Processor](processor.md)*

Start a new processor. A Processor is a stack of operations that execute sequentially.
The results of each step are passed onto the next step. Begin has to have a matching end

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`stageName?` | string | Displayed in the UI  |

**Returns:** *[Processor](processor.md)*

___

###  create

▸ **create**(`document`: KubeDocument, `owners?`: Array‹KubeDocument›): *Promise‹[Result](result.md)›*

Create a given resource

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The Kubernetes resource |
`owners?` | Array‹KubeDocument› | Kubernetes resource that own this resource. Deleting the owner will delete this resource  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  delete

▸ **delete**(`document`: KubeDocument): *Promise‹[Result](result.md)›*

Delete a Kubernetes resource

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The kubernetes resource to delete  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  exec

▸ **exec**(`document`: KubeDocument, `command`: string | string[], `stdout?`: Writable, `stderr?`: Writable, `stdin?`: Readable): *Promise‹[Result](result.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | KubeDocument |
`command` | string &#124; string[] |
`stdout?` | Writable |
`stderr?` | Writable |
`stdin?` | Readable |

**Returns:** *Promise‹[Result](result.md)›*

___

###  list

▸ **list**(`document`: KubeDocument, `options?`: listOptions): *Promise‹[Result](result.md)›*

Gets a list of a given document kind. document.metadata.name is ignored

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The kubernetes resource |
`options?` | listOptions | Flags for the list operation  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  patch

▸ **patch**(`document`: KubeDocument, `patch`: Partial‹KubeObject›): *Promise‹[Result](result.md)›*

Patch a Kubernetes resource

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The kubernetes resource to patch |
`patch` | Partial‹KubeObject› | Fields to patch  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  portForward

▸ **portForward**(`containerPort`: number, `document`: KubeDocument): *Promise‹[Result](result.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`containerPort` | number |
`document` | KubeDocument |

**Returns:** *Promise‹[Result](result.md)›*

___

###  put

▸ **put**(`document`: KubeDocument, `newDoc`: KubeDocument, `params?`: putOptions): *Promise‹[Result](result.md)›*

Replaces a Kubernetes resource

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The kubernetes resource to match exactly |
`newDoc` | KubeDocument | The kubernetes resource to replace |
`params?` | putOptions | Additional options for the put call  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  read

▸ **read**(`document`: KubeDocument): *Promise‹[Result](result.md)›*

Gets a given resource

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The kubernetes resource  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  toAddress

▸ **toAddress**(`document`: KubeDocument): *Promise‹KubeObjectAddress›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | KubeDocument |

**Returns:** *Promise‹KubeObjectAddress›*

___

###  toString

▸ **toString**(`document`: KubeDocument): *string*

**Parameters:**

Name | Type |
------ | ------ |
`document` | KubeDocument |

**Returns:** *string*

___

###  upsert

▸ **upsert**(`document`: KubeDocument, `owners?`: Array‹KubeDocument›): *Promise‹[Result](result.md)›*

Upsert a Kubernetes resource. This performs a read first and a create or patch depending
on the results

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`document` | KubeDocument | The Kubernetes resource to upsert |
`owners?` | Array‹KubeDocument› | Owners are passed to create if inserting  |

**Returns:** *Promise‹[Result](result.md)›*

___

###  version

▸ **version**(): *Promise‹[Version](version.md)›*

**Returns:** *Promise‹[Version](version.md)›*

___

###  watch

▸ **watch**(`document`: KubeDocument, `callback`: watchCallback, `error`: watchDone): *Promise‹[Result](result.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | KubeDocument |
`callback` | watchCallback |
`error` | watchDone |

**Returns:** *Promise‹[Result](result.md)›*
