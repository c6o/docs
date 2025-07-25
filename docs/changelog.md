---
sidebar_position: 9
---

# Release Notes

We have a regular 2-week release cadence.
NOTE: Please make sure that you update your Codezero Local Agent and the in-cluster Space Agent to the same version.

## 2.20.0 [2025-07-21]

* Add [Credential Infusion for MySQL](/guides/credential-infusion#setup-credential-infusion-for-mysql).
* Various bug fixes and security updates.

## 2.19.0 [2025-06-26]

* Desktop app: Better visualization of network traffic in the Network tab.
* Desktop app: Reuse last variant condition as default value.
* No more logging in every 30 days - Codezero Local Agent now automatically refreshes tokens.
* Enable usage in CI/CD environments - `czctl` supports logging in with Org ID and API key.
* Various bug fixes and security updates.

## 2.18.0 [2025-06-10]

* Add new Login flow. This flow is making it easier to use Codezero in Devcontainers or Cloud IDEs.
* Add new Settings Dialog to change application preferences like appearance and start on login.
  You can access this dialog by clicking on your username in the lower left corner and then Settings.
* Various bug fixes and security updates.

## 2.17.2 [2025-05-25]

* Fix bug where long running connections between upstream and the Codezero router ([see details](https://docs.codezero.io/concepts/serve#details-aka-whats-happening-under-the-hood)) were prematurely closed resulting in 502 Bad Gateway errors after the first serve request was processed.
* Remove 3s timeout on connections to local variants.
* Various bug fixes and security updates.

## 2.17.1 [2025-05-08]

* Fix deadlock in Space Agent that prevented users from connecting under certain conditions when in-cluster resources were changing.

## 2.17.0 [2025-05-07]

* Add support for [consuming wildcard domains](guides/consuming-hostnames) on macOS 15+, e.g. `amazonaws.com` and all of its subdomains. Support for other operating systems will be coming in future versions.
* Teamspace selector in Desktop app now has a search filter.
* Various bug fixes and security updates.

## 2.16.1 [2025-04-09]

* Fix deadlock in Space Agent that prevented users connecting to it under certain conditions.
* Various security updates.

## 2.16.0 [2025-03-26]

* Allow override of image repository used for all deployments or individual deployments in Helm Chart.
* Fix `czctl cert install` and `czctl cert uninstall` not working under certain conditions on macOS.
* Various bug fixes and security updates.

## 2.15.0 [2025-03-19]

* Add support for serving h2c (HTTP/2 without TLS) services.
* Add support for persistent HTTP connections between cluster services and the Codezero Router.
* Add support for [consuming private cloud hostnames](guides/consuming-hostnames.mdx).
* Minor UI improvements in the app.

## 2.14.0 [2025-03-17]

* Allow setting of Kubernetes deployment and service labels for [Router deployments and services in Space Agent configuration](guides/spaceagent-config.md#router-pod-labels-and-annotations).
* Fixed bug in W3C baggage serve condition.

## 2.13.0 [2025-03-16]

* Allow setting of Kubernetes pod labels and annotations for [Router pods in Space Agent configuration](guides/spaceagent-config.md#router-pod-labels-and-annotations).

## 2.12.0 [2025-03-12]

* Add serve condition for [W3C Baggage](https://www.w3.org/TR/baggage/). For example, if you have instrumented your code with [OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/baggage/) or [Datadog](https://docs.datadoghq.com/tracing/trace_collection/trace_context_propagation/), you don't need to implement your own [header propagation](/guides/header-propagation) and can now serve a variant based on a baggage key and value.
* The Codezero Operator now automatically restarts deployments of served services to interrupt any long-running connections that may be open.
  This allows Codezero to consistently serve variants when a service has long-running connections, i.e. TCP keep-alive or HTTP keep-alive connections.
* Various bug fixes and security updates.

## 2.11.0 [2025-03-03]

* [Credential Infusion](/guides/credential-infusion) for external HTTPS domains.
* New syntax for consume rules. You can now use `service.namespace` in addition to `namespace/service`.
* Various bug fixes and security updates.

## 2.10.0 [2025-02-18]

* New [Credential Infusion](/guides/credential-infusion) for PostgreSQL and HTTP services.
* New [VSCode Extension](/getting-started/vscode).
* Added email address to [OPA input](/references/opa).
* Various bug fixes and security updates.

## 2.9.0 [2025-02-05]

* Added network traces for Consume and Serve requests.
* New UI for the [Codezero Hub](https://hub.codezero.io/).
* Improved WebSocket support.
* Improved throughput for Serve requests.
* Various bug fixes and security updates.

## 2.8.2 [2025-01-14]

* UI style tweaks in desktop app.
* Remove haproxy from Space Agent deployment.
* Change report location in `czctl diagnostics` from current working directory to the user's home directory.
* Various bug fixes and security updates.

## 2.8.1 [2024-12-18]

* Correct the port mapping in the Variant dialog. The local and remote ports were incorrectly displayed.
* Allow setting of external host and load balancer IP of Space Agent.
* Added warning triangle to variant avatars of disconnected users.
* Added avatar images to Teamspaces and services.
* Various bug fixes and security updates.

## 2.8.0 [2024-12-10]

* Added options to scale Router for improved reliability. ([docs](/guides/spaceagent-config))
* Preview: Allow Space Agent to be horizontally scaled with a Redis/Valkey backend. ([docs](/guides/spaceagent-config))
* Preview Release of Space Agent for VMs: Enabling users to consume services from virtual machines or VPCs outside of Kubernetes clusters. ([docs](/getting-started/spaceagent-vm))
* Improved User Interface of the Desktop Application, including new in-app chat with our support team and integration with our new [Codezero Tutorial](https://tutorial.codezero.dev).
* New command `czctl diagnostics` to package system diagnostics for our support team.
* New command `czctl tutorial` to connect to a demo Teamspace and open the [Codezero Tutorial](https://tutorial.codezero.dev).
* Added czctl.exe to PATH environment variable during installation for Windows users.
* Various bug fixes and security updates.

## 2.7.4 [2024-11-13]

* New Feature: `helm uninstall codezero` now deletes the Teamspace in the Hub.
* Fix(Windows): The last build was not properly timestamped which caused the validity of the code signature to expire in early November.
* Fix: Only check for updates if your computer is online.
* Fix: The menubar/tray menu was not updated after logout.
* Removed ability to connect to pre-2.7.0 Teamspaces.
* Various bug fixes and security updates.

## 2.7.3 [2024-10-31]

* Create variant target port displays cluster port in Desktop App if the default value is not numeric.
* Windows binaries are now signed.
* When switching Organizations, automatically select first Teamspace.
* Fix: Allow spaces in the installation path on Windows.

## 2.7.2 [2024-10-28]

* Fix: In some scenarios the Serve session reinstatement would not reinstate the K8s service selector properly.

## 2.7.1 [2024-10-27]

* Serve sessions are now reinstated after service deployments.
* Added ability to Serve K8s services of type LoadBalancer.
* The Desktop app now supports Dark Mode OS setting.
* New Organizations in the Hub can now add a Demo Teamspace.
* Renamed `system` service to `spaceagent` in the K8s Space Agent.
* Various bug fixes and security updates.

## 2.7.0 [2024-10-20]

:::note
The 2.7.0 CLI does not provide access to the Service Catalog in the Hub. To access the Service Catalog, use the Desktop Application or the `czctl services list` command.

* Local Agent 2.7.0 can connect to Space Agents 2.7.0 and below.
* Local Agents below version 2.6.0 cannot connect to the Space Agents 2.7.0 and above.
* **We strongly recommend updating your Local Agents of all developers to version 2.7.0 _before_ updating your Space Agents to avoid connectivity interruptions.**

:::

### Local Agent

* New [Desktop Application](/getting-started/installation#desktop-application) which provides:

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

* Preview release of [Open Policy Agent integration](/references/opa)
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

* New command: `czctl compose start` to start consume and serve sessions based on rules in `codezero-compose.yml`. You can read about this new feature in the [Codezero Compose](/references/compose) guide.

## 2.1.1 [2024-04-11]

* Fixed startup bug in Space Agent

## 2.1.0 [2024-04-11]

* New command: `czctl reset` to remove all consume and serve sessions.
* Improved startup sequence of Space Agent

## 2.0.0 [2024-02-16]

Complete rewrite of Codezero for improved stability and reliability.
