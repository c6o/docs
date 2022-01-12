# Configuration

Environment is CodeZero's mechanism for bringing down remote configuration to local boxes.

## Overview

Configurations for workloads are held by seven types of Kubernetes resources: `ConfigMaps`, `Secrets`, and workloads which comprise `CronJobs`, `Deployments`, `Jobs`, `Pods` and `StatefulSets`. ConfigMaps and Secrets are dedicated places to store configuration whereas workloads have other things to do.

No matter where a configuration item is stored, it is easily accessible by authorized personel through the kubectl command with the right kubeconfig authorization.

For Secrets, authentication and authorization are important because they hold sesnitive data that must be protected. Care must be taken to ensure that they aren't expose through workloads that use them. By default secrets are not encrypted, so it's important that encryption at rest be enabled. Additionally, RBAC rules for secrets should only allow access to a minimum number of need to know users.

## Hurdles

With security in place and the right access token, there are additional hurdles that developers have to leverage them in a Teleporting session. 

Once two-way communication has been established and persistent volumes mounted, it's important to bring in the configuration for the services that are running locally. 

For ConfigMaps, Secrets, and even most workloads, this is a matter of downloding the resource definition file, finding the section where the config items are recorded and translating that into the local system so that when the code starts it reads the variables that it uses. These config items are exposed as environment variables to the code, so leveraging them is a matter of exporting them into the shell where the code is running.

1. Download the resource definition.
2. Find the section with the variables and extract them.
3. Write them to a script file that can instantiate the variables in the shell where the code will be run.
4. Instantiate the variables in the environment where the code runs using the instantiation script.

This is a fair amount of cognative overload even if all the configuration is in one ConfigMap or workload definition. Often, the configuration is spread over Secrets, ConfigMaps and the workload definition making it easy to forget one important set of variables when starting to work with a new piece of code.

If any variables change while debugging the script must be udpated so that the code works in the new way. In a collaborative setting, configuration could change based on a colleagues changes, requiring the developer to then re-download the configuration and re-form the script file they are using.

## Solution

What is needed is a process that watchies all configuration for a particular piece of code and that automatically creates the script file the developers use to run code locally they are working on while leveraging remote services.

This is what CodeZero's **environment** command does. It watches a workload's configuration, whether that configuration is in a Secret, ConfigMap, or the workload resource. It is able to write that configuration in a translated format for several contexts that may be required to leverage the configuration locally (source-able shell, json, yaml or env formats). Then it updates this local configuration as it changes in the cluster.

