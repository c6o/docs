# App Engine

> [!WIP]
> This document is still being developed and may be incomplete.

App Engine is a highly configurable provisioner created by CodeZero that provides developers with a fast and easy way to onboard their applications without creating a customer provisioner of their own.

> [!NOTE]
> Check out the [Creating a Basic Application Guide](../guides/appengine) to see App Engine in action.

## When to use App Engine

App Engine supports the most common application use-cases. It is ideal for any application that:

1. is contained in a single docker image,
2. exposes any number of TCP or HTTP endpoints,
3. configurable using Environment variables, and
4. only requires standard user interaction/input during installation.

### Not supported

App Engine does not cover every possible use-case (yet). If an application needs more functionality than App Engine supports, you need to create a custom Provisioner.

A custom provisioner may be necessary for any applications that:

* have multiple pods or containers per application,
* need advanced user interaction during the installation process,
* need to run as a Stateful Set or other advanced Kubernetes resources,
* link to other CodeZero applications, or
* expose a custom API for other applications

> [!EXPERT]
> You can read more about creating custom provisioners [here](../guides/custom-provisioner).

## Provisioner Specification

The [Provisioner Spec](./application-manifest.md#Provisioner-Spec) defines the App Engine specific configuration and controls the provisioner's behaviour.

```yaml
name: packageName
package: @provisioner/appengine
# ... other Application Manifest properties go here
editions:
- name: preview
  spec:
    # ... routes, marina, etc
    provisioner:
      package: @provisioner/appengine
      name: nodered
      image: nodered/node-red
      automated: true
      ports: 
      - port: 1880
        protocol: tcp
      # ... other App Engine Spec Goes here
```

### App Engine Spec

| Property         | Value(s)               | Default  | Description
| --------         | --------               | -------  | -----------
| name             | String                 | REQUIRED | Internal application name.
| image            | String                 | REQUIRED | Docker image name. Can also include tag (ex: `image:latest`).
| package          | String                 | REQUIRED | Must always be set to `@provisioner/appengine` when using AppEngine.
| automated        | Boolean                | REQUIRED | For now, this property should always be set to true.
| ports            | [Port](#Port)[]   | []       | List of ports to expose for the application.
| volumes          | [Volume](#Volume)[] | []       | List of volumes to mount.
| flow             | [Flow](#Flow)       |          | List of values and controls to inquiry from the end user.
| configs          | [Config](#Config)[] | []       | Name value pair of environment variables.
| secrets          | [Config](#Config)[] | []       | Name value pair of secret environment variables. Same as configs, except they will be stored as a secret within Kubernetes.

### Config

Configs are a KeyValue pair to define environment variables for the application. The value is either a string or object of type [Generator](#Generator).

> [!NOTE]
> If the variable value contains sensitive information (ex: passwords, keys, tokens), then use the [secrets](#Secret) property instead.

Several reserved values have special meaning. If the value matches one of these reserved values, it is replaced at run-time by the appropriate value:

| Value         | Description
| -----         | -----------
| $PUBLIC_FQDN  | Resolves to the application instance's fully qualified domain name (ex: `myapp-mynamespace.mycloud.codezero.cloud`).
| $PUBLIC_URL   | URL to access this application instance, if a public HTTP route is provided (ex: `https://myapp-mynamespace.mycloud.codezero.cloud`). 

#### Config Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      configs:
        MY_ENV_VAR: my_value
```

### Generator

| Property           | Value(s)  | Default  | Description
| --------           | --------  | -------  | -----------
| generate.length    | Int       | `10`       | Length of the generated string.
| generate.numbers   | Boolean   | `false`    | Whether to include numbers.
| generate.symbols   | Boolean   | `false`    | Whether to include symbols.
| generate.lowercase | Boolean   | `true`     | Whether to include uppercase characters.
| generate.uppercase | Boolean   | `true`     | Whether to include lowercase characters.
| generate.exclude   | String    |          | A set of characters to exclude from the generated string.
| generate.strict    | Boolean  | false     | Require string to include at least one character from each pool.
| generate.excludeSimilarCharacters | Boolean  | false | Exclude similar chars, like 'i' and 'l'.

> [!EXPERT]
> See [generate-password](https://www.npmjs.com/package/generate-password) for more details on the generate options.

#### Generator Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      configs:
        SOME_RANDOM_ENV:
          generate:
            length: 12
            numbers: true
```

### Secret

Secrets are the same structure as [Configs](#Config), just under the `secrets` property. Store variables that contain potentially sensitive information as a secret instead of a standard [Config](#Config).

> [!EXPERT]
> Under the hood, Kubernetes stores these values as a `Secret`. Check out the Kubernetes [documentation](https://kubernetes.io/docs/concepts/configuration/secret/) to learn more about how Secrets work.

#### Secret Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      secrets:
        ADMIN_PASSWORD:
          generate:
            length: 12
            numbers: true
```

### Port

| Property   | Value(s) | Default  | Description
| --------   | -------- | -------  | -----------
| port       | Int      | REQUIRED | The port to expose.
| protocol   | String   | `TCP`    | Protocol type (`TCP` or `UDP`).
| name       | String   |          | Internal label.
| containerPort | Int   |          | The port that the application is listening to in the container (if different than `port`).

#### Ports Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      ports:
      - port: 80
        protocol: tcp
```

### Volume

| Property  | Value(s) | Default  | Description
| --------  | -------- | -------  | -----------
| mountPath | String   | REQUIRED | Path the volume is mounted (ex: `/data`)
| size      | String   | REQUIRED | Volume Size (ex: 5Gi)
| name      | String   |          | Volume label
| subPath   | String   |          | Mount a specific subpath of the volume.

#### Volume Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      volumes:
      - mountPath: /var/www/data
        size: 5Gi
```


### Flows

Flows are responsible for defining a list of questions presented to the end-user during installation.

Flows is an array of [Steps](Step), where each step defines one or more [Prompts](#Prompt) that the user must answer.

> [!PROTIP] The answer to prompts can alter which steps and prompts display to the user.

> [!EXPERT]
> The WebUI and CLI use the Flows configuration to determine how to interact with the end-user, so you only need to write one set of rules for both uses.

### Step

A step defines a collection of questions and can even group sets of questions into separate sections.

| Property  | Value(s) | Description
| --------  | -------- | -----------
| name      | String   | Title for this step of the installation processes.
| skip      | function | A function expression, if it resolves to true, this step is skipped.
| sections  | [Section](#Section)[] | A section allows the developer to group a set of questions within the step.
| prompts   | [Prompt](#Prompt)[]   | If no sections are required, list a set of prompts for this step.

> [!WARNING]
> You cannot use both `sections` and `prompts` in the same step.

> [!PROTIP]
> Both `sections` or `prompts` can be an array or single object.

#### Step Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      flow:
      - name: Step 1
        prompts: 
        - name: USER_NAME
          message: What is your name?
```

### Section

| Property  | Value(s) | Description
| --------  | -------- | -----------
| title     | String   | Title for this section.
| prompts   | [Prompt](#Prompt)[] | A list of questions to ask the user.

> [!PROTIP]
> `prompts` can be an array of prompts or a single prompt.

#### Section Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      flow:
      - name: Step 1
        sections: 
        - title: Section 1
          prompts: 
          - name: FIRST_NAME
            message: What is your first name?
        - title: Section 2
          prompts: 
          - name: LAST_NAME
            message: What is your last name?
```

### Prompt

| Property  | Value(s) | Default  | Description
| --------  | -------- | -------  | -----------
| type      | String   | `input`    | Supported types: `input`, `number`, `confirm`, `list`, `rawlist`, `expand`, `checkbox`, `password`, or `editor`.
| name      | String   | REQUIRED | Environment variable name that contains the answer.
| message   | String   |          | Short message used to prompt the user for an answer.
| default   | String   |          | A default value for the prompt.
| choices   | String[] |          | List of potential answers available.
| validate  | function |          | Validation function. If the result is false, do not allow the user to proceed.
| when      | function  |         | Present this prompt if the function resolves to `true`.
| askAnswered | Boolean | `false`   | Even if already answered, ask again.
| mask      | Char      |         | Character to use to hide the user's actual input.
| c6o       | [C6O](#Prompt-Extensions) | | Object containing C6O specific properties.

> [!EXPERT]
> Individual prompts are based on [inquirer](https://www.npmjs.com/package/inquirer), with a few CodeZero specific [extensions](#Prompt-Extensions).

#### Prompt Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      flow:
      - name: Step 1
        prompts: 
        - type: list
          name: DOMINANT_HAND
          message: What is your dominant hand?
          choices:
          - Right
          - Left
          - Both
          - Neither
```

### Prompt Extensions

| Property  | Value(s) | Default  | Description
| --------  | -------- | -------  | -----------
| target    | String   | `configs`| Where should the variable be stored?  Valid values: `configs`, `secrets`, `transient`.
| label     | String   |          | An additional label use when displaying the input field.
| required  | Boolean  | `false`  | Require a response.
| generate  | [Generator](#Generator) |   | Provide the user an option to auto-generate a value.
| generateMessage | String |      | Message to the user regarding the auto-generation of the value.
| value     | String    |         | 
| maxlength | Int       |         | Maximum length allowed.
| min       | Int       | `1`     | Require the response to be larger than `min` (when the prompt type is `number`).
| max       | Int       | `32767` | Require the response to be less than `max` (when the prompt type is `number`).
| hasControls | Boolean | `true`  | Display numeric toggle controls (when prompt type is `number`).
| step      | Int       | `1`     | Amount to increase/decrease the value by each step (when hasControls is `true` and prompt type is `number`).
| errorMessage | String |         | Message to display when there is a validation error.
| dataSource  | [DataSource](#Data-Sources)  |         | Populate a list of choices using an external data source (currently, only `timezone` is supported)

#### Prompt Extensions Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      flow:
      - name: Step 1
        prompts: 
        - type: password
          name: ADMIN_PASSWORD
          message: Initial admin password
          c6o:
            label: Admin Password
            target: secrets
            required: true
            generateMessage: Generate a strong password?
            generate:
              length: 16
```

### Data Sources

Data Sources are used to populate the list options with commonly used values automatically. Currently, the only supported data source is `timezone`, but more to come.

#### Timezone Example

```yaml
# ...
editions:
- # ...
  spec:
    # ...
    provisioner:
      # ...
      flow:
      - name: Step 1
        prompts: 
        - type: list
          name: TZ
          message: What timezone are you in?
          c6o:
            dataSource: timezone
```