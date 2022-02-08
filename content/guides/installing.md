# Installing CodeZero

CodeZero's developer tools help in the development and testing of Kubernetes applications through
a Command Line Interface (CLI) and a Desktop application.

## Install the CodeZero CLI

[app-install](../_fragments/app-install.md ':include')

### Requirements

[app-requirements](../_fragments/app-requirements.md ':include')

### Initialize the CLI

After installing the CodeZero CLI, run:

```bash
> czctl start
```

> [!NOTE]
> CodeZero requires `sudo` access to modify your system's `hosts` file. The `hosts` file
> is used to define in-cluster DNS information on your local machine during a teleport session.

### Configure the CLI

#### Access Your Cluster

Many CLI commands need to interact with a Kubernetes cluster. Therefore, the CLI requires access to a `kubeconfig` for your cluster. By default, we use the current context in `~/.kube/config`. Alternatively, you can set the `KUBECONFIG` environment variable to the location of the `kubeconfig` file.

```bash
export KUBECONFIG=<path to kubeconfig>
```

> [!NOTE]
> Some commands let you explicitly specify a kubeconfig file.
> This is the same as configuring the `kubectl` CLI. See [here](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for more information.

## Install the Desktop app

Head over to the [CodeZero website](https://codezero.io/platform/desktop) and download the Desktop app for your platform. Run the installer.

> [!NOTE]
> At this time only MacOS and Linux are supported. The CodeZero CLI can be run on Windows using WSL, but the Desktop app requires a native Mac or Linux operating system.

Launch the app. You will likely be prompted to provide your password to give the app elevated priviledges; this is so that the app can install the CodeZero daemon (background service).

Once the app is running you will see a CodeZero icon in your system tray. Click on the tray icon and select "Dashboard" to open up the UI.

For next steps, read about [Using the CodeZero Desktop App](/guides/using-desktop-app).
