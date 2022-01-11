# Environment Guide

The primary concept behind the Environment command is to help developers to develop and debug their code locally by bringing in configuration from a workload.

## Use-Case

A problem that developers encounter is that they need to locally use the same configuration that a remotely deployed service uses. Finding the configuration and setting of a remote service so that the local service can use it is a time-consuming task. Additionally, if the configuration changes on the server, the developer may not be aware of those changes when they occur. Configurations need to be updated locally as they change remotely.

CodeZero resolves this by enabling developers to bring down environment variables from workloads they are modifying and have the local configuration files update as they change on the server.





