# Adding a Context

You can use the Desktop app to merge (or remove) kubeconfig contexts in your user kubeconfig located at `~/.kube/config`.

To add a new context, go to the system tray menu under **Contexts** and select **+ Add Context**. A dialog will appear where you can either paste in the YAML for the new context, or you can select a file containing the context.

When adding a context, it can be either plaintext or *encrypted*. Encrypted contexts can be generated using the Desktop app for securely sharing a context with other users. Learn more about [requesting an encrypted context](/guides/usage/securely-sharing-contexts?id=requesting-a-context), or [generating an encypted context](/guides/usage/securely-sharing-contexts?id=generating-and-sharing-an-encrypted-context). Note that encrypted contexts can also be requested and generated using the CodeZero CLI.

You can switch your active context using the tray menu or from the Dashboard's settings screen.
