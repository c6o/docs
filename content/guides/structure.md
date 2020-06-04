# Provisioner Structure

## Provisioner Methods

When handling a `CREATE`, `UPDATE` or `REMOVE` event from the c6o controller, or corresponding call from the CLI, the Provision Manager calls provisioner methods in stages.

To implement a provisioner, you need to implement one or more methods corresponding to the action and stages of provisioning.  There are three actions: **create**, **update** and **remove**, and three stages: **inquire**, **validate** and **apply**.

*Inquire* asks the CLI user for options. It is not used by the web UI. *Validate* ensures application spec is consistent and fills in any defaults. *Apply* does the work of the action. It is the only action method that must be implemented to perform the action.

For example, for a simple provisioner that does only installation, you'd need to implement at least `createApply()`, but you may also implement `createInquire()`, `createValidate()`, as well as `updateApply()` to implement configuring applications.

| Method | Description | CLI/Web |
|--------|-------------|---------|
| createInquire | interactively ask user for configuration options from the command line before install | CLI |
| createValidate | ensure provided install options are valid, and set any defaults | both |
| createApply | add k8s resources to the cluster | both |
| | |
| updateInquire | interactively ask user for configuration options from the command line before update | CLI |
| updateValidate | ensure update options are valid, and set any defaults | both | 
| updateApply | perform update of the application resource, for example, changing config maps | both |
| | |
| removeInquire | interactively ask user for configuration options from the command line before removal such as keeping IP addresses or data volumes | CLI |
| removeValidate | ensure removal options are valid, and set any defaults | both | 
| removeApply | remove the application resources from the cluster, leaving any the user wants to reuse such as IP addresses and data volumes. | both |

## User Interface Components

A provisioner can provide UI web components for installation, configuration (update), and removal.

### Install Web Component

The install web component is displayed during the install process.  The c6o Store displays this panel on install

The install tag should be named {app}-install-main.

> NOTE: To change the tag prefix from something other than the appliation name, the `tag-prefix` provisioner field can be used as documented [here](/references/appspec.md).

The c6o Store injects the `StoreFlowMediator` mediator as shown.  The mediator provides access to the provisioner section of the application spec.

The component can optionally implement a `begin` and `end` method called on panel set up and take down. The `end` method returns a boolean to indicate whether the UI passes validation checks.

An example install web component from the Prometheus installer is shown below.

```javascript
import { LitElement, html, customElement, property } from 'lit-element'
import { StoreFlowStep, StoreFlowMediator } from '@provisioner/common'

@customElement('prometheus-install-main')
export class PrometheusMainInstall extends LitElement implements StoreFlowStep {
    mediator: StoreFlowMediator

    get serviceSpec() {
        return this.mediator.getServiceSpec('prometheus')
    }

    @property({type: Boolean})
    isSimple = false

    render() {
        return html`
            <traxitt-form-layout>
                <traxitt-checkbox @checked-changed=${this.checkHandler('simpleService')} ?checked=${!!this.serviceSpec.simpleService}>Simple Prometheus Install</traxitt-checkbox>
                <br />
                <traxitt-checkbox @checked-changed=${this.checkHandler('alertManagerEnabled')} ?checked=${!!this.serviceSpec.alertManagerEnabled} ?disabled=${this.isSimple}>Alert Manager</traxitt-checkbox>
                <br />
                <traxitt-checkbox @checked-changed=${this.checkHandler('kubeMetricsEnabled')} ?checked=${!!this.serviceSpec.kubeMetricsEnabled} ?disabled=${this.isSimple}>Kube State Metrics</traxitt-checkbox>
                <br />
                <traxitt-checkbox @checked-changed=${this.checkHandler('nodeExporterEnabled')} ?checked=${!!this.serviceSpec.nodeExporterEnabled} ?disabled=${this.isSimple}>Node Exporter</traxitt-checkbox>
                <br />
                <traxitt-checkbox @checked-changed=${this.checkHandler('pushGatewayEnabled')} ?checked=${!!this.serviceSpec.pushGatewayEnabled} ?disabled=${this.isSimple}>Push Gateway</traxitt-checkbox>
            </traxitt-form-layout>
        `
    }

    checkHandler = (field) => (e) => {
        this.serviceSpec[field] = e.detail.value
        this.isSimple = this.serviceSpec.simpleService
    }
}
```

## Settings Component

To support application configuration, a provisioner can implement a settings web component.

This component is shown in the NavStation Settings application.  The NavStation API is injected to give the web component access to web services exposed by the provisioner.

The web component is called `{app}-settings-main`.  Again, the app name prefix can be overridden by the `tag-prefix` field.

```javascript
import { LitElement, html, customElement, property } from 'lit-element'
import { unlinkToken } from '../constants'
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/src/vaadin-combo-box'

@customElement('istio-settings-main')
export class IstioSettings extends LitElement {
    api

    @property({ type: Object })
    grafanaNamespace

    @property({ type: Object })
    grafanaOptions

    @property({ type: Object })
    prometheusNamespace

    @property({ type: Object })
    prometheusOptions

    @property({ type: Boolean })
    httpsRedirect: boolean

    @property({ type: Boolean })
    busy

    @property({ type: Boolean })
    loaded = false

    choicesService
    disposer

    get grafanaComboBox() { return this.shadowRoot.querySelector('#grafana-combo-box') as ComboBoxElement }
    get prometheusComboBox() { return this.shadowRoot.querySelector('#prometheus-combo-box') as ComboBoxElement }

    render() {
        if (!this.loaded)
            return html`Loading...`

        return html`
            ${this.renderPrometheusLink()}
            <hr />
            ${this.renderGrafanaLink()}
            <hr />
            <traxitt-checkbox @checked-changed=${this.httpsRedirectChanged} ?disabled=${this.busy} ?checked=${this.httpsRedirect}>Enable https redirect</traxitt-checkbox>
            <traxitt-button @click=${this.resetSettings} ?disabled=${this.busy}>Reset Changes</traxitt-button>
            <traxitt-button @click=${this.applyChanges} ?disabled=${this.busy}>Apply Changes</traxitt-button>
            `
    }

    renderGrafanaLink() {
        if (this.grafanaNamespace !== unlinkToken)
            return html`
            <traxitt-button @click=${this.unlinkGrafana} ?disabled=${this.busy}>Unlink Grafana in ${this.grafanaNamespace}</traxitt-button>
          `
        return html`
            <traxitt-combo-box id='grafana-combo-box' label='Select Grafana Installation'
                required value=${this.grafanaOptions[0]} .items=${this.grafanaOptions} ?disabled=${this.busy || this.prometheusNamespace === unlinkToken }></traxitt-combo-box>
            <traxitt-button @click=${this.linkGrafana} ?disabled=${this.busy || this.prometheusNamespace === unlinkToken}>Link Grafana</traxitt-button>
        `
    }

    renderPrometheusLink() {
        if (this.prometheusNamespace !== unlinkToken)
            return html`
            <traxitt-button @click=${this.unlinkPrometheus} ?disabled=${this.busy}>Unlink Prometheus in ${this.prometheusNamespace}</traxitt-button>
          `

        return html`
          <traxitt-combo-box id='prometheus-combo-box' label='Select Prometheus Installation' required value=${this.prometheusOptions[0]} .items=${this.prometheusOptions} ?disabled=${this.busy}></traxitt-combo-box>
          <traxitt-button @click=${this.linkPrometheus} ?disabled=${this.busy}>Link Prometheus</traxitt-button>
        `
    }

    httpsRedirectChanged = async (e) => {
        this.httpsRedirect = e.detail.value
    }

    linkGrafana = async () => {
        this.grafanaNamespace = this.grafanaComboBox.value
    }

    linkPrometheus = async () => {
        this.prometheusNamespace = this.prometheusComboBox.value
    }

    unlinkGrafana = async () => {
        this.grafanaNamespace = unlinkToken
    }

    unlinkPrometheus = async () => {
        // we can't link grafana without prometheus
        this.prometheusNamespace = unlinkToken
        this.grafanaNamespace = unlinkToken
    }

    resetSettings = async () => {
        await this.renderSettings(this.api.manifest)
    }

    isBusy = (manifest) => manifest.status !== 'Running' && manifest.status !== 'Error'

    renderSettings = async (manifest) => {
        // TODO: Do something else if error
        if (manifest) {
            this.busy = this.isBusy(manifest)
            this.grafanaNamespace = manifest.spec.provisioner?.['grafana-link'] || unlinkToken
            this.prometheusNamespace = manifest.spec.provisioner?.['prometheus-link'] || unlinkToken
            this.httpsRedirect = !!manifest.spec.provisioner?.httpsRedirect
        }
        const result = await this.choicesService.find({})
        this.prometheusOptions = result.prometheusOptions
        this.grafanaOptions = result.grafanaOptions
    }

    applyChanges = async (e) => {
        this.busy = true
        await this.api.patchManifest({
            spec:{
                provisioner: {
                    ...{['grafana-link']: this.grafanaNamespace},
                    ...{['prometheus-link']: this.prometheusNamespace},
                    ...{httpsRedirect: this.httpsRedirect}
                }
            }
        })
    }

    async connectedCallback() {
        super.connectedCallback()
        this.choicesService = this.api.createService('choices')
        this.api.watchManifest(this.renderSettings)
        await this.renderSettings(this.api.manifest)
        this.loaded = true
    }
}
```

## Uninstall Component

A provisioner can implement an uninstall web component. This component allows the user to select advanced uninstall options. For example, in the VSCode provisioner, you can decide whether or not to keep the allocated volume and IP address.

```javascript
import { LitElement, html, customElement } from 'lit-element'
import { StoreFlowStep, StoreFlowMediator } from '@provisioner/common'

@customElement('vscode-uninstall-main')
export class UninstallVSCode extends LitElement implements StoreFlowStep {

    mediator: StoreFlowMediator
    get serviceSpec() {
        return this.mediator.getServiceSpec('vscode')
    }

    render() {
        return html`
        <traxitt-form-layout>
        <traxitt-checkbox @checked-changed=${this.checkHandler('keep-ip')} ?checked=${!!this.serviceSpec.deprovision['keep-ip']}>Keep IP address</traxitt-checkbox>
        <br />
        <traxitt-checkbox @checked-changed=${this.checkHandler('keep-vol')} ?checked=${!!this.serviceSpec.deprovision['keep-vol']}>Keep data volume</traxitt-checkbox>
        </traxitt-form-layout>
        `
    }

    async begin() {
        this.serviceSpec.deprovision = {
            'keep-ip':false,
            'keep-vol':true
        }
    }

    checkHandler = (field) => (e) => {
        this.serviceSpec.deprovision[field] = e.detail.value
    }
}
```

## Key Libraries

### KubeClient

Much of the development of a provisioner is manipulating resources on the cluster. To make this simple, the provisioner manager exposes the kubeclient interface. This allows provisioners to manipulate cluster resources and provides status updates to the system and CLI. For more information see the [KubeClient documentation](/reference/kubeclient.md).

### Inquirer

Interactive CLI support is provided by the npm Inquirer package. Documentation on this library can be found [here](https://github.com/SBoudrias/Inquirer.js#readme).

## Provisioner Organization

A provisioner module is typically organized as follows.

* /provisioner-name
  * /k8s - kubernetes templates
  * /src - source
    * /mixins - provisioner method implementations
    * /ui - provisioner UI web components
    * index.ts - provisioner entry point
  * package.json
  * README.md
  * tsconfig.json
