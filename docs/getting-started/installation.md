---
sidebar_position: 1
---

# Installing Local Agent

Codezero's developer tools assist in the development/testing of Kubernetes applications through a Command-Line Interface (CLI) and a Desktop application.

Use one of the supported package managers listed below for installation. From the command line, you can use an install script or download and extract a versioned archive file for your operating system to install Codezero.

## Requirements

Codezero requires:

- MacOS, Windows 10+ or Ubuntu 18.x+ to run the CLI (`czctl`)
- `sudo`/`root`/administrator permissions on your local system

## Desktop application

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="macos" label="macOS" default>
   To install Codezero on macOS:

   1. Download the latest version for your CPU architecture type:

   | Arch Type | URL                                                                                                                                    |
   | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
   | amd64     | [https://releases.codezero.io/app/latest/Codezero-latest-xd64.dmg](https://releases.codezero.io/app/latest/Codezero-latest-x64.dmg)    |
   | arm64     | [https://releases.codezero.io/app/latest/Codezero-latest-arm64.dmg](https://releases.codezero.io/app/latest/Codezero-latest-arm64.dmg) |

   2. Drag the Codezero application to the Applications folder.

   Alternatively you can use [homebrew](https://brew.sh):

   ```bash
   brew install --cask c6o/tap/codezero-app
   ```

</TabItem>
<TabItem value="windows" label="Windows">
   To install Codezero on Windows:

   1. Download the latest version for your CPU architecture type:

   | Arch Type | URL                                                                                                                                              |
   | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
   | amd64     | [https://releases.codezero.io/app/latest/CodezeroSetup-latest-x64.exe](https://releases.codezero.io/app/latest/CodezeroSetup-latest-x64.exe)     |
   | arm64     | [https://releases.codezero.io/app/latest/CodezeroSetup-latest-arm64.exe](https://releases.codezero.io/app/latest/CodezeroSetup-latest-arm64.exe) |

   2. Double click on the setup exe.
</TabItem>

</Tabs>

## Command-Line Interface (CLI)

:::note
The Desktop application contains the CLI. You only need to install the CLI when you do not or cannot install the Desktop application – for example in a [Devcontainer](https://containers.dev/).
:::

### Install with a package manager

<Tabs>
<TabItem value="homebrew" label="Homebrew" default>
   To install Codezero with [homebrew](https://brew.sh) on macOS or Linux, run:

   ```bash
   brew install c6o/tap/codezero
   ```

</TabItem>
<TabItem value="scoop" label="Scoop">
   To install Codezero with [Scoop](https://scoop.sh) on Windows, run:

   ```powershell
   scoop bucket add codezero https://github.com/c6o/scoop-codezero.git;scoop install codezero
   ```

</TabItem>
</Tabs>

### Install without a package manager

<Tabs>
<TabItem value="macos" label="macOS" default>
   To install Codezero without a package manager on macOS:

   1. Download the latest version for your CPU architecture type:

   | Arch Type | URL                                                             |
   | --------- | --------------------------------------------------------------- |
   | amd64     | [https://releases.codezero.io/latest/headless-darwin-amd64.tar.gz](https://releases.codezero.io/latest/headless-darwin-amd64.tar.gz) |
   | arm64     | [https://releases.codezero.io/latest/headless-darwin-arm64.tar.gz](https://releases.codezero.io/latest/headless-darwin-arm64.tar.gz) |

   2. Unzip the file: `tar -xzvf headless-*.tar.gz`

   Optionally, install the binary in a location where you can execute it globally (for example, `/usr/local/bin`).

   Alternatively you can use the following command to install the latest version into `/usr/local/bin`:

   ```bash
   curl -L https://releases.codezero.io/install-headless.sh | /bin/bash
   ```

</TabItem>
<TabItem value="linux" label="Linux">
   To install Codezero without a package manager on Linux:

   1. Download the latest version for your CPU architecture type:

   | Arch Type | URL                                                             |
   | --------- | --------------------------------------------------------------- |
   | amd64     | [https://releases.codezero.io/latest/headless-linux-amd64.tar.gz](https://releases.codezero.io/latest/headless-linux-amd64.tar.gz)  |
   | arm64     | [https://releases.codezero.io/latest/headless-linux-arm64.tar.gz](https://releases.codezero.io/latest/headless-linux-arm64.tar.gz)  |

   2. Unzip the file: `tar -xzvf headless-*.tar.gz`

   Optionally, install the binary in a location where you can execute it globally (for example, `/usr/local/bin`).

   Alternatively, you can use the following command to install the latest version into `/usr/local/bin`:

   ```bash
   curl -L https://releases.codezero.io/install-headless.sh | /bin/bash
   ```

</TabItem>
<TabItem value="windows" label="Windows">
   To install Codezero without a package manager on Windows:

   1. Download the latest version for your CPU architecture type:

   | Arch Type | URL                                                            |
   | --------- | -------------------------------------------------------------- |
   | amd64     | [https://releases.codezero.io/latest/headless-windows-amd64.zip](https://releases.codezero.io/latest/headless-windows-amd64.zip) |
   | arm64     | [https://releases.codezero.io/latest/headless-windows-arm64.zip](https://releases.codezero.io/latest/headless-windows-arm64.zip) |

   2. Unzip the file.

   3. Add the path to the unzipped `czctl.exe` file to your `Path` environment variable.
      To learn how to update environment variables, see the
      [Microsoft PowerShell documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.3#saving-changes-to-environment-variables).
</TabItem>

</Tabs>

## Uninstalling Codezero Local Agent

<Tabs>
<TabItem value="macos" label="macOS" default>
Run the following script to completely uninstall Codezero:

```bash
curl -L https://releases.codezero.io/uninstall-macos.sh | /bin/bash
```

</TabItem>
<TabItem value="linux" label="Linux">

Run the following script to completely uninstall Codezero:

```bash
curl -L https://releases.codezero.io/uninstall-linux.sh | /bin/bash
```

</TabItem>
<TabItem value="windows" label="Windows">
To uninstall the Desktop application:

1. From the Windows **Start** menu, select **Settings > Apps > Installed apps**.
1. Select **Codezero** from the list and then select **Uninstall**.
1. Select **Uninstall** to confirm your selection.

If you installed Codezero via Scoop, run the following command:

```powershell
scoop uninstall codezero
```

After uninstalling Codezero, there may be some residual files left behind which you can remove manually. These are:

```powershell
C:\Program Files\Codezero
C:\Users\<your user name>\AppData\Roaming\Codezero
```

</TabItem>
</Tabs>
