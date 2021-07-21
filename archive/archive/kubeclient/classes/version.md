# Version

Represents the version and other cluster information

## Properties

###  data

• **data**: *any*

The result from the cluster-info call

## Methods

###  compare

▸ **compare**(`ver`: any): *number*

Compare operation for a given version

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *number*

___

###  eq

▸ **eq**(`ver`: any): *boolean*

True if the given version is equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*

___

###  gt

▸ **gt**(`ver`: any): *boolean*

True if the given version is greater than

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*

___

###  gte

▸ **gte**(`ver`: any): *boolean*

True if the given version is greater than or equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*

___

###  lt

▸ **lt**(`ver`: any): *boolean*

True if the given version is less than

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*

___

###  lte

▸ **lte**(`ver`: any): *boolean*

True if the given version is less than or equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*

___

###  neq

▸ **neq**(`ver`: any): *boolean*

True if the given version is not equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ver` | any | Semantic version string  |

**Returns:** *boolean*
