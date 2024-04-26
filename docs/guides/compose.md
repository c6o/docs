---
sidebar_position: 6
---

# Using Compose Files

Compose simplifies the definition of multiple Consume and Serve requests in a single, comprehensible YAML configuration file. This allows you to setup a more involved local development environment _Session_, with a single command.

You can start your session with the following command:

```bash
czctl compose start
```

If you do not specify a file `compose start` looks for a `codezero-compose.yaml` or `codezero-compose.yml`. Alternatively, using specific compose files allows you to define several local environments, each designed to work with a different part of the application. For example, you could have the following set of files depending on whether you want to work on the `frontend` or `api` service:

```bash
czctl compose start -f frontend-compose.yaml
czctl compose start -f api-compose.yaml
```

## The Compose File Format

A Compose file is made up of a `Header` and optional `Consume` and `Serve` sections.

:::note
Strings in YAML can be wrapped both in single and double quotes. In some cases, they can also be unquoted. Strings containing any of the following characters must be quoted: `: { } [ ] , & * # ? | - < > = ! % @`. Although you can use double quotes, for these characters it is more convenient to use single quotes, which avoids having to escape any backslash `\`
:::

### Header

The Compose File header requires a version:

```yaml
version: 1.0
```

### Consume

The file may contain at most one Consume field. The Consume section may include a `primaryNamespace` field.

The Consume section would typically include an array of `rules`. The order of rules is important just like the `czctl consume edit` command.

The following example shows a Consume record:

```yaml
consume:
  primaryNamespace: sample-project
  rules:
    - sample-project/*
    - '!sample-project/sample-project-core'
```

### Serve

The file may contain at most one Serve field. The Serve section is comprised of an array of Serve records.

The Serve record consists of a `namespace`, `service`, `ports` and optionally, a `condition` field.

Ports specify the `local` and `remote` port numbers.

Condition types are explained in detail in [Tutorials > Serving Local Variants > Condition Types](../tutorials/serve.mdx#condition-types)

#### User Condition Type

Like `czctl serve ...`, the absence of a condition defaults to condition `user`.

```yaml
serve:
  - namespace: sample-project
    service: sample-project-core
    ports:
      - local: 3000
        remote: 3000
```

#### Default Condition Type

The `default` condition type takes no additional parameters:

```yaml
serve:
  - namespace: sample-project
    service: sample-project-core
    ports:
      - local: 3000
        remote: 3000
    condition:
      type: default
```

#### Header Condition Type

The `header` condition type takes two parameters. The `key` parameter is case insensitive:

```yaml
serve:
  - namespace: sample-project
    service: sample-project-core
    ports:
      - local: 3000
        remote: 3000
    condition:
      type: header
      key: my-header
      value: header-value
```

### Complete Example

The following `codezero-compose.yaml` file will set the primary namespace to `sample-project`, consume all services within that namespace except the `sample-project-core` service and serve a user variant of the `sample-project-core` service.

```yaml
version: 1.0
consume:
  primaryNamespace: sample-project
  rules:
    - sample-project/*
    - '!sample-project/sample-project-core'
serve:
  - namespace: sample-project
    service: sample-project-core
    ports:
      - local: 3000
        remote: 3000
```

## Templating

Compose uses the [text/template](https://pkg.go.dev/text/template) library to support template directives enclosed in `{{` and `}}` blocks.
Your local environment variables are accessible in the `Env` template object.

:::tip
Compose files are designed to be checked into your version control system together with your source code. Use templates to keep sensitive information out of the file.
:::

The following example shows how you can use the `USER` environment variable as a custom header value.

```yaml
version: 1.0
consume:
  primaryNamespace: sample-project
  rules:
    - sample-project/*
    - '!sample-project/sample-project-core'
serve:
  - namespace: sample-project
    service: sample-project-core
    ports:
      - local: 3000
        remote: 3000
    condition:
      type: header
      key: x-custom-header
      value: 'user-{{ .Env.USER }}'
```

In the above example, if the `USER` environment variable would be set to `joe`, any traffic to the `sample-project-core` service where the HTTP header `x-custom-header` is set to `user-joe` would be directed to your local machine.

## Cleaning Up

To stop all Consume and Serve sessions run the following command:

```sh
czctl reset
```
