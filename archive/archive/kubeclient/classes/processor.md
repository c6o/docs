# Processor

## Methods

###  attempt

▸ **attempt**(`times`: number, `sleepTime`: number, `fn`: attemptCallback): *this*

Attempts an operation several times until it either succeeds or exceeds the attempt count

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`times` | number | Number of times execute the function |
`sleepTime` | number | Number of milliseconds to sleep between atempts |
`fn` | attemptCallback | The function to attempt  |

**Returns:** *this*

___

###  createFile

▸ **createFile**(`file`: string, `params?`: any): *this*

Performs the create function to each document in the file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | path to file |
`params?` | any | parameters to substitute in file  |

**Returns:** *this*

___

###  deleteFile

▸ **deleteFile**(`file`: string, `params?`: any): *this*

Performs the delete function to each document in the file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | path to file |
`params?` | any | parameters to substitute in file  |

**Returns:** *this*

___

###  eachFile

▸ **eachFile**(`fn`: any, `file`: string, `params?`: any): *this*

Executes the provided function against documents from each file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | any | function to call |
`file` | string | path to file |
`params?` | any | parameters to substitute in file  |

**Returns:** *this*

___

###  upsertFile

▸ **upsertFile**(`file`: string, `params?`: any): *this*

Performs the upsert function to each document in the file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | path to file |
`params?` | any | parameters to substitute in file  |

**Returns:** *this*
