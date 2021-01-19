# Application Manifest

> [!WIP]
> This document is still being developed and may be incomplete.

The application manifest is a YAML definition file that describes all the attributes of an application and how it interacts with CodeZero.  Namely, it covers:

1. How it is displayed in the Marketplace,
2. What is used to perform provisioning and management,
3. How it behaves in the Marina, and
4. How CodeZero exposes the service to the world.

## Publishing

Using the Application Manifest, an Application developer can publish and update applications directly to the CodeZero Marketplace.

```bash
czctl app publish path/to/manifest.yaml
```

## Properties

| Property         | Value(s)               | Default  | Description
| --------         | --------               | -------  | -----------
| name             | String                 | REQUIRED | Application's display name.
| appId            | String                 | REQUIRED | Application's internal ID (must be unique).
| package          | String                 | REQUIRED | NPM package name containing the provisioner.
| icon             | [Artwork](#Artwork) |          | SVG or URL.  Must scale well to 100x100.
| description      | Text                   |          | Application description displayed in the Marketplace.
| summary          | Text                   |          | Application summary displayed in the Marketplace.
| category         | [Category](#Categories)|          | Application category.
| screenshots      | [Artworkd](#Artwork)[] |        | Array of screenshots to display in the Marketplace.
| video            | [Video](#Video)      |          | Video demo to display in the Marketplace.
| keyworks         | String[]               | []       | Keywords.
| repo             | URL                    |          | URL to application repository.
| license          | URL|Text               |          | Application license agreement.
| terms            | URL|Text               |          | Application terms of use.
| privacy          | URL|Text               |          | Application privacy policy.
| support          | URL                    |          | Support URL.
| provisioner      | [Provisioner](#Provisioner-Details) |   | Details about the provisioner code specifically.
| editions         | [Edition](#Edition)[] | REQUIRED | Array of application edition(s).  At least one edition is required.

### Edition

| Property         | Value(s)               | Default  | Description
| --------         | --------               | -------  | -----------
| name             | String                 | REQUIRED | Edition's display name.
| status           | public|private         | private  | Edition visibility in the Marketplace.
| spec             | [Spec](#Edition-Spec) | REQUIRED | Editions specifications.

### Edition Spec

| Property         | Value(s)               | Default  | Description
| --------         | --------               | -------  | -----------
| navstation       | Boolean                | false   | When the `spec.navstation` field is set to true, the application and associated UI panel will appear in the NavStation settings.
| routes           | [Route](#Edition-Route)[] |  | Array of routing information to instruct how CodeZero should route public traffic to the application
| provisioner      | [ProvisionerSpec](#Provisioner-Spec) | REQUIRED | Provisioner specific properties.
| marina           | [Marina](#Edition-Marina) |      | Defines how this edition behaves in the Marina.

### Edition Route

| Property      | Value(s) | Default  | Description
| --------      | -------- | -------  | -----------
| type          | Boolean  | REQUIRED | Must be HTTP or TCP.  Note: HTTP routing actually exposes an HTTPS endpoint externally.
| disabled      | Boolean  | false    | When present and set to true, the route is disabled.
| targetService | String   | REQUIRED | The target service port to route traffic to. Typically, the name of the NodePort service.
| targetPort    | Int      |          | The target service port.  Required if the targetService exposes multiple service ports.
| http          | [HttpRewrite](#Route-Http-Rewrite) | | Allows specifying more advanced HTTP routing rules.
| tcp           | [TcpRules](#Route-TCP-Rules) | | Required if type is TCP.

### Route HTTP Rewrite

| Property  | Value(s) | Description
| --------  | -------- | -----------
| public    | Boolean  | Specifying whether the app is accessible to the public.  Defaults to `false`.
| prefix    | String   | The URL prefix to match for a URL rewrite.
| rewrite   | String   | Rewrite destination.

### Route TCP Rules

| Property      | Value(s) | Default  | Description
| --------      | -------- | -------  | -----------
| name          | String   | REQUIRED | Arbitrary name for the route, but must be unique.
| port          | Int      |          | Incoming TCP port. If it is not present, is set to zero (0), or conflicts with an existing port, then the port is automatically assigned with a random value.
| strictPort    | Int      |          | Same as above, but do not allow reassigning of the port if there is a conflict.  Installation will FAIL if the system cannot allocate this port.

### Provisioner Spec

The provisioner spec is dedicated to provisioner specific logic, and is up to the provisioner developer to define its schema.  For example, see [App Engine's Schema](./appengine#Provisioner-Spec).

However, there are a few reserved properties used by CodeZero interally as well:

| Property  | Value(s) | Description
| --------  | -------- | -----------
| package   | String   | NPM provisioner package.  Allows overriding the default NPM package.
| ui        | String   | If set to "ignore", the customer will skip the UI components during installation.
| tag       | String   | Flags current docker image version, has specially meaning when managing image updates.

#### Edition Marina

| Property  | Value(s) | Description
| --------  | -------- | -----------
| launch    | [Launch](#Marina-Launch) | Describes how the application should be launched by the Marina desktop

#### Marina Launch

| Property  | Value(s) | Description
| --------  | -------- | -----------
| type      | String   | Type of launch behaviour.  Currently, only "inline" is available.
| popUp     | Boolean  | If true, the application will launch in a new tab, rather than in the Marina desktop iFrame.
| port      | Int      | Port to use in the URL.
| path      | String   | Path to use in the URL.

### Provisioner Details

| Property         | Value(s) | Description
| --------         | -------- | -----------
| repo             | URL      | URL to application repository.
| license          | URL|Text | Application license agreement.
| terms            | URL|Text | Application terms of use.
| privacy          | URL|Text | Application privacy policy.
| support          | URL      | Support URL.

### Categories

Each application should be placed into a related category.  Each of available categories to choose from are listed below.

**Business Applications:**
blockchain, crm, comm, contact-center, cms, dms, e-comm, e-learning, human-resources

**Technical Applications:**
analytics, ai, dashboards, databases, etl, identity, integration, iot, location, messaging, monitoring, rendering, reporting, security, storage

**Vertical Solutions:**
education, healthcare, finance, manufacturing, media, water

**Software Development:**
dev-tools, devops

### Artwork

Artwork can be provided in several different formats:

* URL to an image (PNG JPG, SVG, etc..)
* relative path to a local image file (./logo.svg, ./art/logo.jpg)
* raw SVG markup
* base 64 encoded image

> [!NOTE]
> Files have a max upload size of 500kb.

## Example Manifest

```yaml
appId: sample-service        # App internal name (all lower, no spaces); minimum 5 characters
name: FOO App Display Name   # display name
package: npm-package         # the NPM package name.  Typically id and package-name are the same, but not required.
icon: icon.svg               # see art section for rules for the values here
screenshots:
    - URL to image (PNG JPG, etc..)
    - Raw SVG markup
    - base 64 encoded image
    - could also be a path to a filename within the provisioner package itself   ./logo.svg or ./art/logo.svg
    - 500kb uploaded size. (Web UI)
summary:
    short description of the app
    this is actually markdown
    can reference markdown file in the package itself   ./docs/short.md
description:
    long description of the app
    this is actually markdown
    can reference markdown file in the package itself   ./docs/description.md
category: crm           #taken from our standard set from our UI
video:
    type: youtube
    id: videoId
keywords:
    - folksonomy for tags
    - use a single item in the array for a single tag
    - content                         #for example..
    - content management system       #for example..
provisioner:
  repo: url of source code for the provisioner
  terms:
    url for provisioners license
    this is actually markdown
    can reference markdown file in the package itself   ./docs/license.md
repo: url of source code for the application itself
support:
  url for support for the application itself
  this is actually markdown
  can reference markdown file in the package itself   ./docs/support.md
terms:
  url of terms of service
  full text of the terms of service
  multiple lines are ok
  this is actually markdown
  can reference markdown file in the package itself   ./docs/terms.md
privacy:
  url for the privacy policy
  full text of the privacy policy
  multiple lines are ok
  this is actually markdown
  can reference markdown file in the package itself   ./docs/privacy.md
editions:
  - name: foo
    status: public           #public|private|deprecated   public:everyone, private:org/person only
    spec:                   #https://docs.codezero.io/#/reference/appspec?id=spec-section
      navstation: false     #optional, default: false; When the spec.navstation field is set to true, the application and associated UI panel will appear in the NavStation settings application.
      routes:               #optional. routes which the c6o system will setup in order to route traffic to this instance
        - type: http        #Required. Must be http or tcp. Note that http routing implies and https
          disabled: false   #optional. Default:true; When present and set to true, the route is disabled
          targetService: http-service    #Required. the target service name; typically the name of the NodePort to point our ingress-gateway to
          targetPort: 80    #optional; specifying the target service port, which is needed when multiple service ports are available
          http:             #optional, only used when child props are needed
            public: true  #optional http field specifying whether the app is publicly accessible
            prefix: /api  #optional http field specifying matching prefix for a URL rewrite, e.g.: /api/
            rewrite: /api/v1/  #optional http field specifying URL rewrite destination, e.g.: /api/v1/
        - type: tcp
          disabled: false   #optional. Default:true; When present and set to true, the route is disabled
          targetService: tcp-service
          tcp:
            name: tcp-name  #mandatory tcp field specifying the TCP route name. Although arbitrary but must be unique withing an app spec.
            port: 1533      #optional tcp field specifying the incoming TCP port. If not present or set to zero (0) then the port is automatically assigned.
            strictPort: 89  #optional tcp field specifying whether incoming TCP port can be reassigned in case of a port conflict.  Installation will BREAK if the system cannot allocate this port.
      provisioner:          #default values for the provisioner to use, they are all going to be specific to the app, and will NEVER cause a bump in the version needed
        storage: 1Gi
        provisionerPropertyName: defaultValue
        tag-prefix: foo   #prefix to use for provisioner UI web components. When not set, this is the application name
        grantsAwesomeField: #weRock    - specific to the app
                            #these following fields have special meaning
        tag:                #docker image version, special meaning for updates to the docker image itself; @Narayan to clarify; can we pull these out to another section?
        ui: ignore        #optional, default: not specified;  instruct the provisioner Web UI to skip asking for more inputs;
      marina:
        launch:             #Section describing how the application should be launched by the Marina desktop
          type: inline      #inline - launch by browser   @Narayan: Can we add "info" to this, to be explicit?
          popUp: true       #optional -launch in a new tab, default: false - launch in a Marina desktop iFrame
          port: 80          #port to use in the URL, optional; default: 80
          path: /foo      #path to use in the URL, optional; default/not specified: /

  - name: stable            #our second edition in the same app package
    status: public
    spec:                   #as described above.
      routes:
      provisioner:
      marina:
```
