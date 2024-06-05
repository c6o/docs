---
sidebar_position: 3
---

# Release Notes

Please make sure that you update your Codezero Local Agent and Space Agent to the same version.

## 2.3.4

* New Scoop installation package for Windows:
  You can now install and update your Local Agent via Scoop.

  ```powershell
  scoop bucket add codezero https://github.com/c6o/scoop-codezero.git;scoop install codezero
  ```

* ARM64 images for the Space Agent:
  Codezero now supports Kubernetes clusters running on ARM64 nodes.

* Bug fixes and stability improvements

## 2.3.3

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

## 2.3.2

* Bug fixes and security updates

## 2.3.1

* Prevent crash-loop when serving a resource in a non-existent namespace
* Fix CPU thrashing during system startup

## 2.3.0

* We have started to version our Helm charts. In order to upgrade your Space Agent from an earlier version to this release, please run the following:

  ```sh
  helm repo add --force-update codezero https://charts.codezero.io && helm upgrade --namespace=codezero codezero codezero/codezero --reset-values
  ```

* Bug Fix: `czctl auth login` now correctly opens a web browser on Linux
* Experimental Windows support. Please contact us to request binaries
* Various package upgrades and security patches

## 2.2.0

* New command: `czctl compose start` to start consume and serve sessions based on rules in `codezero-compose.yml`. You can read about this new feature in the [Codezero Compose](../guides/compose) guide.

## 2.1.1

* Fixed startup bug in Space Agent

## 2.1.0

* New command: `czctl reset` to remove all consume and serve sessions.
* Improved startup sequence of Space Agent

## 2.0.0

Complete rewrite of Codezero for improved stability and reliability.
