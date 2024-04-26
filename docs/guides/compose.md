---
sidebar_position: 6
---

# Codezero Compose

Codezero Compose is a way to define your Consume and Serve sessions in a `codezero-compose.yaml` file which can be checked into your project repository.

If you have a `codezero-compose.yaml` or `codezero-compose.yml` file in your current directory, you can start your sessions with the following command:

```sh
czctl compose start
```

## The Compose File

The following `codezero-compose.yaml` file will set the primary namespace to `sample-project`, consume all services within that namespace except the `sample-project-core` service and serve a user variant of the `sample-project-core` service.

```yaml
version: "1.0"
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

A template directive is enclosed in `{{` and `}}` blocks.
Your local environment variables are exposed in the `Env` template object.
The following example shows how you can use the `USER` environment variable as a custom header value.

```yaml
version: "1.0"
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
      type: 'header'
      key: 'X-Custom-Header'
      value: 'user-{{ .Env.USER }}'
```

In the above example, if the `USER` environment variable would be set to `joe`, any traffic to the `sample-project-core` service where the HTTP header `X-Custom-Header` is set to `user-joe` would be directed to your local machine.

## Stopping all Consume and Serve sessions

To stop all Consume and Serve sessions simply run the following command:

```sh
czctl reset
```
