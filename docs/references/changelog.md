---
sidebar_position: 3
---

# Release Notes

We have a regular 2-week release cadence.
NOTE: Please make sure that you update your Codezero Local Agent and the in-cluster Space Agent to the same version.

## 2.7.0 [2024-10-20]

:::note
The 2.7.0 CLI does not provide access to the Service Catalog in the Hub. To access the Service Catalog, use the Desktop Application or the `czctl services list` command.

* Local Agent 2.7.0 can connect to Space Agents 2.7.0 and below.
* Local Agents below version 2.6.0 cannot connect to the Space Agents 2.7.0 and above.
* **We strongly recommend updating your Local Agents of all developers to version 2.7.0 _before_ updating your Space Agents to avoid connectivity interruptions.**

:::

### Local Agent

* New [Desktop Application](/guides/installing#desktop-application) which provides:

  * Quick access to the Service Catalog
  * Easy Consume All / Clear button (blue)
  * Fast filtering for Namespace & Services at top of screen
  * Quick Switch between Teamspaces
  * Organization access (if you belong to more than one Codezero Org)
  * _Easy_ Test connect to Variants+ - (one-click copy of curl command when clicking on a user’s Variant in the Service Catalog)

* The Daemon now runs as a background service and is automatically started on startup.
* New CLI commands: `czctl consume all`, `czctl consume clear`, `czctl daemon` and `czctl services list`.
  * `czctl services list` provides your cluster service details in the terminal!
* Deprecated commands: `czctl options` and `czctl organization clear`.
* Improved connection stability.

### Space Agent

* The Operator is now enabled by default.
* The Space Agent requires fewer resources. It now only consists of System and Operator (Orchestrator has been removed).

### How to Install Desktop App using CLI?

The Desktop App contains the binary for the CLI. If you have installed the CLI via homebrew, simply run the following commands to uninstall the previous CLI czctl and install the new Desktop App:

```bash
brew uninstall codezero
brew install --cask c6o/tap/codezero-app
```


## 2.6.0 [2024-08-06]

* Preview release of our new Codezero K8s operator: Setting `operator.enabled` to `true` in the Codezero Helm chart values, will enable the use of the new Codezero K8s operator for creating Serve sessions.
* Various bug fixes and security updates.

## 2.5.2 [2024-07-23]

* Added option to run the router pod of Codezero Space Agent with privileged access. By default, the router pod runs with a security context with only the `NET_BIND_SERVICE` capability.
  When the `router.privilegedAccess` option is set to `true` in the Codezero Helm chart values, the router pods are deployed with an empty security context.
* We switched to a new auth provider resulting in a new login page.
* Various bug fixes and security updates.

## 2.5.1 [2024-07-09]

* Support use of named targetPort references in K8s service definitions
* Improved network connectivity between Local and Space Agent

## 2.5.0 [2024-06-25]

* New Teamspace installation method to facilitate automated scripting of Teamspace deployments
* Fix namespace filter in Service Catalog
* Added security context to Router pods to satisfy [Restricted Pod Security policy](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted)
* Bug fixes and security updates

## 2.4.0 [2024-06-11]

* Preview release of [Open Policy Agent integration](../../guides/opa)
* Ability to delete organizations
* Bug fixes and security updates

## 2.3.4 [2024-06-05]

* New Scoop installation package for Windows:
  You can now install and update your Local Agent via Scoop.

  ```powershell
  scoop bucket add codezero https://github.com/c6o/scoop-codezero.git;scoop install codezero
  ```

* ARM64 images for the Space Agent:
  Codezero now supports Kubernetes clusters running on ARM64 nodes.

* Bug fixes and stability improvements

## 2.3.3 [2024-05-28]

* New Homebrew installation package:
  You can now install and update your Local Agent via Homebrew.
  
  To switch to Homebrew on macOS or Linux, run the following commands:

  ```bash
  curl -L https://releases.codezero.io/uninstall.sh | /bin/bash
  brew install c6o/tap/codezero
  ```

* Fixed a bug that caused sticky HTTP connections in serve sessions when using persistent connections.
* Fixed a bug that prevented the Windows background service from starting on some machines.
* New icons for Consume and Serve

## 2.3.2 [2024-05-22]

* Bug fixes and security updates

## 2.3.1 [2024-05-13]

* Prevent crash-loop when serving a resource in a non-existent namespace
* Fix CPU thrashing during system startup

## 2.3.0 [2024-05-08]

* We have started to version our Helm charts. In order to upgrade your Space Agent from an earlier version to this release, please run the following:

  ```sh
  helm repo add --force-update codezero https://charts.codezero.io && helm upgrade --namespace=codezero codezero codezero/codezero --reset-values
  ```

* Bug Fix: `czctl auth login` now correctly opens a web browser on Linux
* Experimental Windows support. 
* Various package upgrades and security patches

## 2.2.0 [2024-04-24]

* New command: `czctl compose start` to start consume and serve sessions based on rules in `codezero-compose.yml`. You can read about this new feature in the [Codezero Compose](../guides/compose) guide.

## 2.1.1 [2024-04-11]

* Fixed startup bug in Space Agent

## 2.1.0 [2024-04-11]

* New command: `czctl reset` to remove all consume and serve sessions.
* Improved startup sequence of Space Agent

## 2.0.0 [2024-02-16]

Complete rewrite of Codezero for improved stability and reliability.
