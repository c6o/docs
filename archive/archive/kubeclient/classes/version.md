# Version

Represents the version and other cluster information

## Properties

### data

• **data**: _any_

The result from the cluster-info call

## Methods

### compare

▸ **compare**(`ver`: any): _number_

Compare operation for a given version

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _number_

---

### eq

▸ **eq**(`ver`: any): _boolean_

True if the given version is equal

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_

---

### gt

▸ **gt**(`ver`: any): _boolean_

True if the given version is greater than

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_

---

### gte

▸ **gte**(`ver`: any): _boolean_

True if the given version is greater than or equal

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_

---

### lt

▸ **lt**(`ver`: any): _boolean_

True if the given version is less than

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_

---

### lte

▸ **lte**(`ver`: any): _boolean_

True if the given version is less than or equal

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_

---

### neq

▸ **neq**(`ver`: any): _boolean_

True if the given version is not equal

**Parameters:**

| Name  | Type | Description             |
| ----- | ---- | ----------------------- |
| `ver` | any  | Semantic version string |

**Returns:** _boolean_
