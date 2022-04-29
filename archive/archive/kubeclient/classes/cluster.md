# Cluster

## Properties

### info

• **info**: _[Version](version.md)_

The Kubernetes cluster-info

---

### processor

• **processor**: _[Processor](processor.md)_

The currently executing processor. Each begin/end block starts a new processor.

## Methods

### begin

▸ **begin**(`stageName?`: string): _[Processor](processor.md)_

Start a new processor. A Processor is a stack of operations that execute sequentially.
The results of each step are passed onto the next step. Begin has to have a matching end

**Parameters:**

| Name         | Type   | Description         |
| ------------ | ------ | ------------------- |
| `stageName?` | string | Displayed in the UI |

**Returns:** _[Processor](processor.md)_

---

### create

▸ **create**(`document`: KubeDocument, `owners?`: Array‹KubeDocument›): _Promise‹[Result](result.md)›_

Create a given resource

**Parameters:**

| Name       | Type                | Description                                                                              |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------- |
| `document` | KubeDocument        | The Kubernetes resource                                                                  |
| `owners?`  | Array‹KubeDocument› | Kubernetes resource that own this resource. Deleting the owner will delete this resource |

**Returns:** _Promise‹[Result](result.md)›_

---

### delete

▸ **delete**(`document`: KubeDocument): _Promise‹[Result](result.md)›_

Delete a Kubernetes resource

**Parameters:**

| Name       | Type         | Description                       |
| ---------- | ------------ | --------------------------------- |
| `document` | KubeDocument | The Kubernetes resource to delete |

**Returns:** _Promise‹[Result](result.md)›_

---

### exec

▸ **exec**(`document`: KubeDocument, `command`: string | string[], `stdout?`: Writable, `stderr?`: Writable, `stdin?`: Readable): _Promise‹[Result](result.md)›_

**Parameters:**

| Name       | Type                   |
| ---------- | ---------------------- |
| `document` | KubeDocument           |
| `command`  | string &#124; string[] |
| `stdout?`  | Writable               |
| `stderr?`  | Writable               |
| `stdin?`   | Readable               |

**Returns:** _Promise‹[Result](result.md)›_

---

### list

▸ **list**(`document`: KubeDocument, `options?`: listOptions): _Promise‹[Result](result.md)›_

Gets a list of a given document kind. document.metadata.name is ignored

**Parameters:**

| Name       | Type         | Description                  |
| ---------- | ------------ | ---------------------------- |
| `document` | KubeDocument | The Kubernetes resource      |
| `options?` | listOptions  | Flags for the list operation |

**Returns:** _Promise‹[Result](result.md)›_

---

### patch

▸ **patch**(`document`: KubeDocument, `patch`: Partial‹KubeObject›): _Promise‹[Result](result.md)›_

Patch a Kubernetes resource

**Parameters:**

| Name       | Type                | Description                      |
| ---------- | ------------------- | -------------------------------- |
| `document` | KubeDocument        | The Kubernetes resource to patch |
| `patch`    | Partial‹KubeObject› | Fields to patch                  |

**Returns:** _Promise‹[Result](result.md)›_

---

### portForward

▸ **portForward**(`containerPort`: number, `document`: KubeDocument): _Promise‹[Result](result.md)›_

**Parameters:**

| Name            | Type         |
| --------------- | ------------ |
| `containerPort` | number       |
| `document`      | KubeDocument |

**Returns:** _Promise‹[Result](result.md)›_

---

### put

▸ **put**(`document`: KubeDocument, `newDoc`: KubeDocument, `params?`: putOptions): _Promise‹[Result](result.md)›_

Replaces a Kubernetes resource

**Parameters:**

| Name       | Type         | Description                              |
| ---------- | ------------ | ---------------------------------------- |
| `document` | KubeDocument | The Kubernetes resource to match exactly |
| `newDoc`   | KubeDocument | The Kubernetes resource to replace       |
| `params?`  | putOptions   | Additional options for the put call      |

**Returns:** _Promise‹[Result](result.md)›_

---

### read

▸ **read**(`document`: KubeDocument): _Promise‹[Result](result.md)›_

Gets a given resource

**Parameters:**

| Name       | Type         | Description             |
| ---------- | ------------ | ----------------------- |
| `document` | KubeDocument | The Kubernetes resource |

**Returns:** _Promise‹[Result](result.md)›_

---

### toAddress

▸ **toAddress**(`document`: KubeDocument): _Promise‹KubeObjectAddress›_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `document` | KubeDocument |

**Returns:** _Promise‹KubeObjectAddress›_

---

### toString

▸ **toString**(`document`: KubeDocument): _string_

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `document` | KubeDocument |

**Returns:** _string_

---

### upsert

▸ **upsert**(`document`: KubeDocument, `owners?`: Array‹KubeDocument›): _Promise‹[Result](result.md)›_

Upsert a Kubernetes resource. This performs a read first and a create or patch depending
on the results

**Parameters:**

| Name       | Type                | Description                              |
| ---------- | ------------------- | ---------------------------------------- |
| `document` | KubeDocument        | The Kubernetes resource to upsert        |
| `owners?`  | Array‹KubeDocument› | Owners are passed to create if inserting |

**Returns:** _Promise‹[Result](result.md)›_

---

### version

▸ **version**(): _Promise‹[Version](version.md)›_

**Returns:** _Promise‹[Version](version.md)›_

---

### watch

▸ **watch**(`document`: KubeDocument, `callback`: watchCallback, `error`: watchDone): _Promise‹[Result](result.md)›_

**Parameters:**

| Name       | Type          |
| ---------- | ------------- |
| `document` | KubeDocument  |
| `callback` | watchCallback |
| `error`    | watchDone     |

**Returns:** _Promise‹[Result](result.md)›_
