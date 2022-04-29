# Processor

## Methods

### attempt

▸ **attempt**(`times`: number, `sleepTime`: number, `fn`: attemptCallback): _this_

Attempts an operation several times until it either succeeds or exceeds the attempt count

**Parameters:**

| Name        | Type            | Description                                     |
| ----------- | --------------- | ----------------------------------------------- |
| `times`     | number          | Number of times execute the function            |
| `sleepTime` | number          | Number of milliseconds to sleep between atempts |
| `fn`        | attemptCallback | The function to attempt                         |

**Returns:** _this_

---

### createFile

▸ **createFile**(`file`: string, `params?`: any): _this_

Performs the create function to each document in the file

**Parameters:**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `file`    | string | path to file                     |
| `params?` | any    | parameters to substitute in file |

**Returns:** _this_

---

### deleteFile

▸ **deleteFile**(`file`: string, `params?`: any): _this_

Performs the delete function to each document in the file

**Parameters:**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `file`    | string | path to file                     |
| `params?` | any    | parameters to substitute in file |

**Returns:** _this_

---

### eachFile

▸ **eachFile**(`fn`: any, `file`: string, `params?`: any): _this_

Executes the provided function against documents from each file

**Parameters:**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `fn`      | any    | function to call                 |
| `file`    | string | path to file                     |
| `params?` | any    | parameters to substitute in file |

**Returns:** _this_

---

### upsertFile

▸ **upsertFile**(`file`: string, `params?`: any): _this_

Performs the upsert function to each document in the file

**Parameters:**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `file`    | string | path to file                     |
| `params?` | any    | parameters to substitute in file |

**Returns:** _this_
