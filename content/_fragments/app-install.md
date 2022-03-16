To install the full desktop application, visit our [downloads page](https://codezero.io/platform/desktop#download-app), and install the appropriate installer for your Operating System.

Or run:

```bash
curl -L https://releases.codezero.io/install.sh | /bin/bash
```

> [!NOTE]
> If you are in a headless environment, or otherwise don't want to install the GUI, you can run: `curl -L https://releases.codezero.io/install-headless.sh | /bin/bash` to install a headless version of the tool (only includes `czctl` and background services)

> [!PROTIP]
> If you want to play around with pre-releases, you can install canary releases using: `curl -s curl -L https://releases.codezero.io/install.sh | /bin/bash -s canary`.  But bewarned, it has not been fully tested and may cause unexpected behaviour.

> [!WARNING]
> Previous versions allowed using npm and/or brew to install/update the CLI. Since version 1.4.0, this is no longer possible.
