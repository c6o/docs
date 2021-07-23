# Provisioner Testing and Debugging

## Testing and Debugging using the CLI

The easiest way to test your provisioner is to use the CodeZero CLI (`czctl`). See setting up the CLI tool for more details on getting configured.

```
czctl provision <app-manifest.yaml> --package <path-to-provisioner-source>
```

* `app-manifest.yaml` - is the path to your application's manifest.
* `path-to-provisioner-source` - should point to the directory containing your provisioner's source code.

For example, the following would checkout the [provisioners repository](https://github.com/c6o/provisioners), and run the NextCloud provisioner based on the local source code.

```
git clone https://github.com/c6o/provisioners.git
cd provisioner
yarn install && yarn build
czctl provision packages/nextcloud/codezero.yaml --package packages/nextcloud/
```

## Testing and Debugging Web Components

