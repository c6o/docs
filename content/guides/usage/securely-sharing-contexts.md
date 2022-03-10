# Securely Sharing Contexts

A kubeconfig context provides access to a Kubernetes cluster, and should be protected. When working in a team of developers, however, there may be a need to share a context amongst team members so that developers using the CodeZero CLI or Desktop app can run commands against a common cluster. Typically only a limited number of people have access to download a cluster's kubeconfig, so this presents a problem for giving developers the kubeconfig contexts they need, while not introducing security vulnerabilities.

With the CodeZero Desktop app developers can request an encrypted context from the cluster admin so that contexts can be shared safely and securely over unsecure channels.

## Requesting a Context

The developer who does not have access to download a cluster's kubeconfig can use the Desktop app or the CLI to request an encypted context.

### Using the Desktop App

1. Click on the CodeZero system tray icon and select **Contexts -> Request Context**.
2. You will be presented with a screen containing your public key. The associated private key is stored securely in a local database.
3. Copy or download your public key.
4. Send the public key to your cluster admin and wait for them to generate and send you back an encrypted context.
5. Once you have an encrypted context you can [add it](/guides/usage/adding-a-context.md) using the Desktop app.

### Using the CLI

You can use CodeZero CLI's `context request` command to save your public key to file or copy it to your clipboard. See the command reference for more details.

## Generating and Sharing an Encrypted Context

The developer or DevOps engineer who has permission to download a cluster's kubeconfig can generate an encypted context for sharing over an unsecure channel like IM or email.

### Using the Desktop App

1. Recieve a public key from the developer needing cluster access.
2. Click on the CodeZero system tray icon and select **Contexts -> Share Context**.
3. You will be presented with a screen where you will need to paste in or upload the public key, and also paste in or upload the un-encypted context.
4. Click the "Encrypt" button.
5. An encypted context will be generated and presented on the next screen. Copy or download the encrypted context and share with the developer owning the associated public key.

### Using the CLI

You can use CodeZero CLI's `context share` command to generate an encrypted context. See the command reference for more details.
