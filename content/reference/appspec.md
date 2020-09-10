# Application Spec Reference

The CodeZero Application's *Provisioning Manifest*, or *Custom Resource Definition* (CRD) is used by CodeZero to configure applications and provide information to the CodeZero apps for display. This will be part of creating and uploading your application package when creating an application in the CodeZero Hub. 

The provisioning system uses all of the fields in this manifest to deploy your application. There are two top level sections: 
* *metadata* used to describe your application to the CodeZero interfaces
* *spec* used to describe your application's provisioning behaviour, networking and storage configuration.

Within the metadata and spec sections, there are three sub-sections each. For metadata, the sub-sections are *fields*, *labels* and *annotations*. For the spec, the sub-sections are *routes*, *provisioner* and *marina*. Understanding the provisioning manifest will llow you to control your deployment and setup the CodeZero cloud operating system to automagically deploy your application for end users.

An example spec is shown below:

```yaml
apiVersion: system.codezero.io/v1
kind: App
metadata:
  name: node-red
  labels:
    system.codezero.io/edition: latest
  annotations:
    system.codezero.io/display: Node-RED
    system.codezero.io/description: "IoT programming tool for wiring together hardware devices, APIs and online services."
    system.codezero.io/iconUrl: "https://hub.codezero.io/api/assets/apps/01E8Q6AARJG3Q6XWEVDD7FYZ9V/icon"
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

These are standard k8s metadata fields and how they are used by CodeZero (c6o)

| Name      | Description                                  |
|-----------|----------------------------------------------|
| name      | Globally unique application name             |
| namespace | Namespace where the application is installed. This is used to distinguish your application components from other developer's applications |
| finalizers | set to `finalizer.app.codezero.io` after install |

### Labels

| Label                          | Description                                   |
|--------------------------------|-----------------------------------------------|
| system.codezero.io/edition     | application spec edition                      |
| system.codezero.io/interface-{interfaceName} | label for identifying applications that expose a documented service interface {interfaceName} |

### Annotations

| Annotation                     | Description |
|--------------------------------|-----------------------------------------------|
| system.codezero.io/description | Description of the application                 |
| system.codezero.io/iconUrl     | Icon for display in the Marina and other apps |
| system.codezero.io/appId | Application identifier assigned by Hub |


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

The routes section defines how the app can be accessed from outisde of the cluster.  Multiple hosts can listen on the same external https port.  Requests are routed to a designated service however, TCP based applications have to request unique ports or accept randomly assigned external ports.

Example:

```yaml
# ...
spec:
  routes:
    - type: 'http'
      targetService: 'node-red'
    - type: 'tcp'
      targetService: 'node-red'
      tcp:
        name: 'tcp-main'
        port: 1533
    - type: 'tcp'
      targetService: 'node-red'
      tcp:
        name: 'tcp-alternate'
        port: 1655
```

| Field | Description |
|-------|-----------------------------------------------|
| routes | an array of routes to access one or more hosted services |
| route.type | Must be 'http' or 'tcp'. Note that http routing implies and https |
| route.disabled | When present and set to true, the route is disabled; otherwise the route is enabled |
| route.targetService | the target service name |
| route.targetPort | optional field specifying the target service port, which is needed when multiple service ports are available |
| route.http.prefix | optional http field specifying matching prefix for a URL rewrite, e.g.: /api/ |
| route.http.rewrite | optional http field specifying URL rewrite destination, e.g.: /api/v1/ |
| route.tcp.name | mandatory tcp field specifying the TCP route name. Although arbitrary but must be unique withing an app spec. |
| route.tcp.port | optional tcp field specifying the incoming TCP port. If not present or set to zero (0) then  the port is automatically assigned. |
| route.tcp.strictPort | optional tcp field specifying whether incoming TCP port can be reassigned in case of a port conflict. |

### Navstation

When the `spec.navstation` field is set to true, the application and associated UI panel will appear in the NavStation settings application.

### Services

The services section provides information on how client applications should access application services that are advertized in an application metadata label.

For example, for the `npm-registry` interface, the metadata label section will include a label for `system.codezero.io/interface-npm-registry` and the services section will look as follows

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

