# App Engine

> [!WIP]
> This document is still being developed and may be incomplete.

App Engine is a highly configurable provisioner project created by CodeZero that provides developers with a fast and easy way to onboard their applications without needing to create a customer provisioner of their own.

> [!NOTE]
> Check out the [Creating a Basic Application Guide](../guide/1-basic) to see App Engine in action.

## When to use App Engine

App Engine is intended to support the most common application use-cases. It is ideal for any application that:

1. is contained in a single docker image,
2. exposes any number of TCP or HTTP endpoints,
3. is configurable using Environment variables, and
4. only requires basic user interaction/input during installation.

### Not supported

App Engine does not cover every possible use-case though (yet).  In the event an application needs more functionality than App Engine supports, a custom Provisioner will need to be created.

A custom provisioner may be required for any applications that:

* have multiple pods and/or containers per application,
* need advanced user interaction during the installation process,
* need to run as a Stateful Set, or other advanced Kubernetes resources,
* link to other CodeZero applications, or
* expose a custom API for other applications

> [!EXPERT]
> You can read more about creating custom provisioners [here](./provisioner-code.md).

## Provisioner Specification

All the configuration for an App Engine application is stored in the provisioner spec of the [Application Manifest](./application-manifest.md#Edition-Spec-Provisioner).

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
        type: tcp
      # ... other App Engine Spec Goes here
```

### App Engine Spec

| Property         | Value(s)               | Default  | Description
| --------         | --------               | -------  | -----------
| name             | String                 | REQUIRED | Internal application name
| image            | String                 | REQUIRED | Docker image name.  Can also include tag  (ex: `image:latest`)
| package          | String                 | REQUIRED | Must alwyas be set to `@provisioner/appengine` when using App Engine.
| automated        | Boolean                | REQUIRED | For now, this property should always be set to true.
| ports            | [Port](#Port)[]   | []       | List of ports to expose for the application
| configs          | [Config](#Config)[] | []       | Container environment variables
| secrets          | [Secret](#Secret)[] | []       | List of Secret environment variables
| volumes          | [Volume](#Volume)[] | []       | List of Volume Mounts

> [!PROTIP]
> If your service only exposes a single HTTP endpoint, you can specify a port, which just takes an integer for the port (ex: `port: 8080`).

### Config

| Property | Value(s) | Default  | Description
| -------- | -------- | -------  | -----------
| name     | String   | REQUIRED | Configuration name
| env      | String   | REQUIRED | Environment variable name
| value    | String   |          | Configuration value
| label    | String   |          | Text label displayed to the user during installation.
| hint     | String   |          | A text hint displayed to the user during installation.
| fieldType | String  |          | Field type to display to user.  Currently supports 'text' or 'password'.  If empty, the user will not be prompted for this field.  (NOTE if you select password, you should probably consider having this stored as a secret as well)
| autoselect | Boolean | false   | Set to true to have the customers cursor automatically select this field on load.  Only one field should have this set to `true`.
| required | Boolean  | false    | If true, the end-user must enter a value during installation.

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
      - name: node-environment
        env: NODE_ENVIRONMENT
        value: development

        # ui properties
        label: Node Environment
        hint: "The NODE_ENVIRONMENT to run the application under.  For example: development or production"
        required: false
        fieldType: text
```

### Secret

| Property | Value(s) | Default  | Description
| -------- | -------- | -------  | -----------
| name     | String   | REQUIRED | Secret label
| env      | String   | REQUIRED | Environment variable name
| value    | String   |          | Secret value (special value: `%RANDOM`)
| label    | String   |          | Text label displayed to the user during installation.
| hint     | String   |          | A text hint displayed to the user during installation.
| fieldType | String  |          | Field type to display to user.  Currently supports 'text' or 'password'.  If empty, the user will not be prompted for this field.
| autoselect | Boolean | false   | True if user should auto select this field.
| required | Boolean  | false    | If true, the end-user must enter a value during installation.

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
      - name: mysql-password
        env: MYSQL_PASSWORD

        # ui properties
        label: MySQL Password
        hint: The password to your MySQL database.
        required: true
        fieldType: password
```

### Port

| Property   | Value(s) | Default  | Description
| --------   | -------- | -------  | -----------
| port       | Int      | REQUIRED | Port your service exposes.
| protocol   | String   | http     | Protocol type (HTTP or TCP)
| name       | String   |          | Internal port label
| targetPort | Int      |          | If using TCP and the port exposed by your application differs from what you want to expose publicly, set the internal port here.

#### Port Example

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
        protocol: http
```

### Volume

| Property  | Value(s) | Default  | Description
| --------  | -------- | -------  | -----------
| mountPath | String   | REQUIRED | Path the volume is mounted (ex: `/data`)
| size      | String   | REQUIRED | Volume Size (ex: 5Gi)
| name      | String   |          | Volume label

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
