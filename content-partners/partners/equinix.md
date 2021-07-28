# Running CodeZero on Equinix Metal #

## Prerequisites ##

1. An active Equinix Metal account.
1. A Google, GitHub, or Digital Ocean account (used for logging into CodeZero).

## Getting Prepared with Equinix Metal ##

Besides having an active Equinix Metal account, CodeZero requires a few pieces of information from your Equinix account to get set up with CodeZero:

1. An Equinix Metal user-level API key.
1. An Equinix Metal Project.

### Creating an Equinix Metal API Key ###

![API Keys >](../../_media/partners/equinix/image11.png ':size=300')

CodeZero requires a user-level API Key to create and provision your CodeZero cloud on Equinix Metal. To create a new key:

1. Navigate to the API Keys section in your Equinix Metal account portal.
2. Click “+ Add” to add a new key.
3. Give the new key a description (e.g. “CodeZero”)
4. Select Read/Write permissions.
5. Later, you will need to copy this key and provide it to CodeZero during your cloud setup.

### Create an Equinix Metal Project ###

Owners and Admins of an organization can create new projects. To create a new project in the Equinix Metal console, click + New Project from the Projects drop-down menu.

## Setting up CodeZero ##

CodeZero will guide you through the steps to configure your Equinix Metal cluster, and perform and manage the provisioning and installation processes.

### Create an Account with CodeZero ###

The first step is to create a CodeZero account. Creating an account with CodeZero is easy and completely free.

1. Navigate to `https://codezero.io`.
1. Click “Get Started”.
1. Sign in with the authentication provider of your choice (Google, GitHub or Digital Ocean).

### Create a CodeZero Cloud on Equinix Metal ###

When creating a new CodeZero Cloud, select Equinix Metal from the provider list.

![Equinix Metal ><](../../_media/partners/equinix/image6.png ':size=600')

NOTE: If you’ve already created a cloud before, you can create another by navigating to your [“My Clouds”](https://codezero.io/clouds) page:

![My Clouds](../../_media/partners/equinix/image7.png ':size=400')
![My Clouds](../../_media/partners/equinix/image13.png ':size=400')

### Configure the Equinix Metal Cluster ###

CodeZero needs a little information about your Equinix Metal account to get started. You can also provide a few customizations to control the size and location of your Kubernetes cluster. Fill in the required information and click Continue.

![Provider Options ><](../../_media/partners/equinix/image12.png ':size=500')

|Field|Description|
|---|---|
|API Key|Your Equinix Metal user-level API Key|
|Project|Select the Equinix Project you wish to use. All of your Equinix account’s projects will be listed.|
|Facility|The Equinix Facility to host your cluster. Note that only facilities with availability will be listed.|
|Machine Type|Select a Machine Type for your cluster nodes. CodeZero will generally function on even the smallest Equinix nodes, and we recommend using # of nodes to accommodate scale needs. Note: depending on the facility, different node types may be available.|
|Control Plane # Nodes|For high availability, select three or more master nodes.|
|Worker # Nodes|We recommend at least two worker nodes.|

### Name your Cloud ###

Provide a name for your CodeZero cloud. This name will be used as part of the URL to access your Cloud and applications once the Cloud is up and running.

![Name Cloud ><](../../_media/partners/equinix/image4.png ':size=500')

### Create the Cloud ###

Once the cloud creation starts, you’ll see the progress of the installation processes. This process generally takes less than 10 minutes to complete. You can safely close this window, and we will notify you by email when the cluster is ready.

![Create Cloud ><](../../_media/partners/equinix/image10.png ':size=500')

## Navigating your CodeZero Cloud ##

### Launch your CodeZero Cloud ###

When your Cloud is ready, we’ll send you an email with a link to your cloud. This link will be the same link you’d chosen during the “Name your Cloud” stage.

You can also see the status of your clouds in your CodeZero dashboard. Once all the sails turn green the cloud “name” will be clickable.  Clicking on the cloud name will launch you into your Cloud desktop.

![Launch ><](../../_media/partners/equinix/image3.png ':size=500')

### Log in to your Cloud ###

When you first launch your cloud desktop, you’ll need to authenticate using your CodeZero account.

![Login ><](../../_media/partners/equinix/image1.png ':size=500')

### The Desktop ###

Once logged in, you’ll have a full view of all the applications installed in your Cloud. Initially, only the system applications are installed, but you can easily change that by going to the “Store” application and installing the applications you want.

![Desktop ><](../../_media/partners/equinix/image2.png ':size=500')

### Install an Application ###

Installing applications to your cloud is fast and easy!  Go to the Store, and search for the application you’d like to install and follow the instructions.

To install an Application in your CodeZero Cloud:

1. Click on the “Store” icon in the left-hand sidebar.
1. Search or navigate for the application you’d like to install.
1. Click “Install” and select an edition.
1. Enter a namespace for your application (this is the folder the application will appear in).
1. Follow any additional application specific installation instructions.
1. Once done, you’ll be able to track the status of the installation in the top right corner.

### Uninstall an Application ###

To uninstall an application, find the application on your Cloud desktop, and right-click on the icon.  You can also uninstall an entire folder (namespace) at once by right-clicking on the folder.

![Uninstall ><](../../_media/partners/equinix/image5.png ':size=500')

### Launch an Application ###

Most applications consist of some sort of web dashboard. To launch into this dashboard, open the folder (namespace) that you installed the application and click on its icon. Depending on the application, this may open a new pop-up window or open the application in-line.

NOTE: some applications may take a minute or two to finish installing.
