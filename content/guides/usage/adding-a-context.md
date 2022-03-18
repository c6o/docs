# Adding a Context

You can use the Desktop app to merge (or remove) kubeconfig contexts in your user kubeconfig located at `~/.kube/config`.

To add a new context:

1. Click on the CodeZero system tray icon.
2. Open the **Contexts** menu and select **+ Add Context**.
3. A dialog will appear where you can either:
   - Paste in the YAML for the new context, or
   - Select a file containing the context
4. Click on the "Add Context" button.

When adding a context, it can be either plaintext or _encrypted_.

Encrypted contexts can be generated using the Desktop app for securely sharing a context with other users. Learn more about [requesting an encrypted context](/guides/usage/securely-sharing-contexts?id=requesting-a-context), or [generating an encypted context](/guides/usage/securely-sharing-contexts?id=generating-and-sharing-an-encrypted-context).

> [!PROTIP]
> Encrypted contexts can also be requested and generated using the CodeZero CLI.

You can switch your active context using the tray menu or from the Dashboard's settings screen.

> [!NOTE]
> You can also add a new context from the Manage Contexts screen under Settings.
