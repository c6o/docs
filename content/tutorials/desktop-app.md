# CodeZero Desktop App Tutorial

With the [CodeZero Desktop](https://codezero.io/platform/desktop) app you can run commands like Teleport, Intercept, and Mount from your system tray, launch a visual dashboard for the state of your sessions, and view the activity of other collaborators in your cluster.

In this tutorial we are going to install the [CodeZero Desktop](https://codezero.io/platform/desktop) app and use it to run some [Development Profiles](/concepts/profiles) containing commands for Teleport and Intercept.

## Objectives

In this tutorial, you will learn

* How to install and run the CodeZero Desktop app
* How to add a cluster configuration to the Desktop app
* How to create a Development Profile using the CLI
* How to run a Development Profile from the Desktop app
* How to view running sessions and command activity

## Prerequisites

It is assumed you have the standard prerequisites:

[prerequisites](_fragments/prerequisites.md ':include')

If you are missing any of these, you can [learn about getting a Kubernetes cluster](guides/kubernetes-quickstart), clone the [Sample Kubernetes Project](https://github.com/c6o/sample-project) on GitHub, and follow this guide for [installing the CodeZero CLI](/guides/installing).

For this tutorial you will also need to be using MacOS or Linux, and have NodeJS 16+.

## Tutorial

### Set up the Sample Project

If you have already installed the Sample Project to a cluster, you can skip to the next section. If not, we are going to go through the steps in the Sample Project's README.

After cloning the repo, go into the project root in a terminal and build and run the services:

```bash
yarn install
yarn start

# On MacOS
open http://localhost:3030
```

Hit Ctrl-C to exit.

We are going to now install the Sample Project to a cluster.

1. To make things easier, grab the kubeconfig file for your cluster and copy it to the root of the Sample Project repo.
1. In your terminal, run `export KUBECONFIG=$PWD/dev-kubeconfig.yaml`.
1. Install the Sample Project to your cluster:

```bash
kubectl create ns sample-project
kubectl -n sample-project apply -f ./k8s
```

This will install all the services and deployment but will not set up ingress. If your cluster is on service provider like DigitalOcean, you can use a generic LoadBalance service by running the following:

```bash
kubectl -n sample-project apply -f ./k8s/loadbalance
```

You will then need to obtain the appropriate ingress service IP address or the LoadBalancer IP address and go to `http://IP-ADDRESS` in a browser.

```bash
kubectl get svc -n sample-project sample-project-frontend --output jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

### Run a Service Locally

```bash
yarn start-frontend
```

You should be able to access the local front-end service at `http://localhost:3030`, however you should see that the Socket and Core sections show errors. This is because the front-end is not able to access the upstream services (as expected).

### Install the Desktop app

Head over to the [CodeZero website](https://codezero.io/platform/desktop) and download the Desktop app for your platform. Run the installer.

Launch the app. You will likely be prompted to provide your password to give the app elevated priviledges; this is so that the app can install the CodeZero daemon (background service).

Once the app is running you will see a CodeZero icon in your system tray. Click on the tray icon and select "Dashboard" to open up the UI.

### Add your Configuration

Click on the tray icon again and select Configurations -> + Add Configuration. Select your cluster's kubeconfig file.

### Add a Workspace

A Workspace is a folder on your machine where you keep all your [Development Profiles](/concepts/profiles). Reminder that a Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands. This allows developers to easily get several commands running for the tasks at hand without having to remember all the command line parameters for the command line tool.

Click on the tray icon again and select Workspaces -> + Add Workspace. Select the root of the Sample Project repo.

### Run a Development Profile

The Sample Project comes with an example Development Profile with just a single Teleport command:

```yaml
apiVersion: system.codezero.io/v1alpha1
kind: DebugProfile
metadata:
  name: teleport
  namespace: sample-project
spec:
  commands:
  - command: Teleport
    params:
      namespace: sample-project
      resourceName: sample-project-core
      kind: Deployment
      envFile: ./env.sh
```

Let's run it now. Click the tray icon and select Development Profiles -> teleport. Go back to the Dashboard window and watch as your Teleport session is initiated.

Assuming our front-end service is still running locally, if we now go back to `http://localhost:3030/` and refresh the page, we should see the connections working.

Launch your favorite IDE and make changes to the code in `packages/frontend` in the Sample Project. You can make changes to the front-end code and see that you are able to test against the in cluster sockets and core services.

### Create a New Development Profile

In your terminal, in the Sample Project root, run

```bash
czctl intercept service sample-project-core -n sample-project -p 3000 --save-profile test-intercept-profile
```

This will create a new Development Profile containing a single Intercept command.

Back in the Desktop app, click on the tray icon and run this new profile.

### View Activity

From the Desktop app dashboard, click on the Activity tab to see all the commands that you have run so far. Try running the teleport Development Profile again to purposefully generate an error.

### Wrapping Up

When you have finished your work, the last thing you will want to do is close your sessions. From the Sessions tab of Desktop app's dashboard, click on the "Close My Sessions" button.

### Conclusion

This concludes the Desktop app tutorial. As a final task, see if you can figure out how to change your profile picture. Having a profile picture can be helpful when you start getting into the collaborative aspects of the Desktop app and want to see who else on your development team is running sessions.
