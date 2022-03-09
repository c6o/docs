To install the full desktop application, visit our [downloads page](https://codezero.io/platform/desktop#download-app), and install the appropriate installer.

You can also install a headless version of CodeZero (does not include the desktop GUI) using brew:

```bash
brew install c6o/tools/czctl
```

Or, you can run:

```bash
`/bin/bash -c "$(curl https://storage.googleapis.com/c6o-releases/install-headless.sh)"
```

> [!PROTIP]
> If you want to play around with pre-releases, you can install our canary version using: `brew install c6o/tools/czctl-canary`.  But bewarned, it may cause unexpected behaviour.

> [!WARNING]
> Previous versions allowed using npm to install/update the CLI. Since version 1.4.0, this is  no longer possible.
