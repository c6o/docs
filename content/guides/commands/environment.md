# Environment

The primary concept behind the Environment command is to help developers to develop and debug their code locally by bringing in configuration from a workload.

## Use-Case

A problem that developers encounter is that they need to locally use the same configuration that a remotely deployed service uses. Finding the configuration and setting of a remote service so that the local service can use it is a time-consuming task. Additionally, if the configuration changes on the server, the developer may not be aware of those changes when they occur. Configurations need to be updated locally as they change remotely.

CodeZero resolves this by enabling developers to bring down environment variables from workloads they are modifying and have the local configuration files update as they change on the server.

## Under the Hood

The Environment command starts a watch of the configuration files of the workload and writes to the given environment file as configuration changes in the cluster.

## Residue

The environment command makes no changes to your remote cluster and the only residue is the file where the configuration is written and the watcher process.

However, if the environment watcher continues to run after a clean/close has been performed, you will need to find the process id and do a `kill -9` of the environment monitor process.

Here's an example of getting the process ids and using `kill -9` to end these processes:

```bash
> ps xau | grep 'child.js' | grep -v 'grep' |  awk '{print $2 " -> " $11, $12}'
65120 -> /Users/username/.codezero/bin/czdaemon/czdaemon /snapshot/node-monorepo/gulpfile.js/tmp/czdaemon/package/lib/engine/services/monitors/env/child.js
```

```bash
> sudo kill -9 65120
```
