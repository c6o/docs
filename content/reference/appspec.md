# Application Spec Reference

The CodeZero Application Custom Resource Definition (CRD) is used by CodeZero to configure applications and provide information to the CodeZero apps for display.

The system uses the application metadata fields, labels, and annotations as well as content in the `spec` section

An example spec is shown below:

```yaml
apiVersion: system.traxitt.com/v1
kind: App
metadata:
  name: node-red
  labels:
    system.traxitt.com/edition: latest
  annotations:
    system.traxitt.com/display: Node-RED
    system.traxitt.com/description: "IoT programming tool for wiring together hardware devices, APIs and online services."
    system.traxitt.com/iconUrl: "https://staging.hub.traxitt.com/api/assets/apps/01E8Q6AARJG3Q6XWEVDD7FYZ9V/icon"
spec:
  routes:
    simple:
      http:
        service: node-red
  provisioner:
    storage: 4Gi
    projects: false
    package: "@provisioner/node-red"
  marina:
    launch:
      type: inline
```

## Metadata Section

### Fields

These are standard k8s metadata fields and how they are used by c6o

| Name      | Description                                  |
|-----------|----------------------------------------------|
| name      | Globally unique application name             |
| namespace | Namespace where the application is installed |
| finalizers | set to `finalizer.app.traxitt.com` after install |

### Labels

| Label                          | Description                                   |
|--------------------------------|-----------------------------------------------|
| system.traxitt.com/edition     | application spec edition                      |
| system.traxitt.com/interface-{interfaceName} | label for identifying applications that expose a documented service interface {interfaceName} |

### Annotations

| Annotation                     | Description |
|--------------------------------|-----------------------------------------------|
| system.traxitt.com/description | Description of the applicaton                 |
| system.traxitt.com/iconUrl     | Icon for display in the Marina and other apps |
| system.traxitt.com/appId | Application identifier assigned by Hub |


## Spec Section

### Provisioner

| Field | Description |
|-------|-----------------------------------------------|
| ignore | When the provisioner section set to `ignore` the system will not call a provisioner on install |
| name | provisioner name to overrides app spec name |
| namespace | namespace to override chosen namespace for app |
| services | deprecated - list of additional provisioner sections used to install the application |
| tag-prefix | prefix to use for provisioner UI web components. When not set, this is the application name |
| package | npm package to use for provisioning. When not set, it is @provisioner/{app-name} |
| $unset | field that is to be removed during provisioning |
| *other* | All other provisioner fields and sub fields are provisioner specific |

### Marina

The Marina section describes how the application should be 'launched' from the Marina when it is clicked on. For example:

```yaml
# ....
spec:
    # ...
    marina:
        launch:
            type: 'inline',
            popUp: true
```

| Field | Description |
|-------|-----------------------------------------------|
| launch | Section describing how the application should be launched by the Marina desktop |
| launch.type | `inline` - launch by browser |
| launch.popup | `true` - launch in a new tab, default - launch in a Marina desktop iFrame |
| launch.port | port to use in the URL |
| launch.path | path to use in the URL |
| launch.tag | TODO |

### Routes

The routes section defines how the application is accessed within the cluster.

Example:

```yaml
# ...
spec:
    routes:
        simple:
            http:
                service: 'system-store',
                prefix: '/store',
                rewrite: '/'
```

| Field | Description |
|-------|-----------------------------------------------|
| routes.simple | configuration used by the internal istio virtual service for configuring ingress to the application |

### Navstation

When the `spec.navstation` field is set to true, the application and associated UI panel will appear in the NavStation settings application.

### Services

The services section provides information on how client applications should access application services that are advertized in an application metadata label.

For example, for the `npm-registry` interface, the metadata label section will include a label for `system.traxitt.com/interface-npm-registry` and the services section will look as follows

```yaml
# ...
spec:
    # ...
    services:
        npm-registry':
            protocol: 'http'
            service: 'verdaccio-service'
            auth: ['basic']
            port: 80
```

