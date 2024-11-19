---
slug: /getting-started
---

# Getting Started

These are the general steps for setting up a Teamspace. Apart from setting up a new Kubernetes cluster, the following steps should take less than 10 minutes to complete. These steps should be carried out by someone comfortable around Kubernetes:

1. Identify an existing Kubernetes cluster or create a new Kubernetes cluster
1. Create a [Codezero account](./teamspace-setup.md#create-a-codezero-hub-account) and Organization on the [Codezero Hub](https://hub.codezero.io/)
1. Install the Codezero Space Agent [on the Kubernetes cluster](./teamspace-setup.md#install-the-space-agent-in-your-cluster) in order to Certify it as a Teamspace
1. Invite team members to the Organization

Once a Teamspace is set up and certified, individual developers can then [install the Codezero local tools](./installation.md) to work with the Teamspace. Developers will not require credentials for the Kubernetes cluster as they authenticate to the Teamspace via the Hub.

NOTE: We currently support Github and Google authentication.
