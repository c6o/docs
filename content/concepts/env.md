# Environment Command

The primary concept behind the Environment command is to help developers to develop and debug their code locally by 
bringing in configuration from a workload.
The environment command is often used in conjunction with [Teleport](../concepts/teleport) and [Intercept](../concepts/intercept).

> [!PROTIP]
> The environment command can be shortened from 'environment' to 'env'

## Use-Case

One problem that developers encounter need to use the same configuration that a remotely deployed service uses locally.
Finding the configuration and setting the local service to use it is a time-consuming task. 
Additionally, if the configuration changes on the server, the developer may not be aware of those changes when they occur.

CodeZero resolves this by enabling developers to bring down environment variables from workloads they are developing and
have the local configuration files update as they change on the server.

### Access Remote Workload Configurations

```bash
> czctl environment deployment sample-project-core env.sh -n sample-project
```

### Options

There are several formats in which the local file can be written: 
yaml (.yaml or .yml), bash shell script (.sh), environment (.env), and JSON (.json)
The default is yaml, but you can modify this wit the --format or -m flag:

```bash
> czctl environment deployment sample-project-core env.json -n sample-project --format json
```
