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

If you have already installed the Sample Project to a cluster, you can skip to the next section. If not, head on over to the [GitHub repo](https://github.com/c6o/sample-project) and go through the steps in the Sample Project's README.

### Run a Service Locally

If you haven't already, go through the [Developing Edge Services](https://docs.codezero.io/#/tutorials/edge) tutorial, which will show you how to run a teleport command using the CodeZero CLI to debug a locally running service. Close the teleport at the end because we are going to run it again in this tutorial, but using the Desktop app.

### Install the Desktop app

Head over to the [CodeZero website](https://codezero.io/platform/desktop) and download the Desktop app for your platform. Run the installer.

Launch the app. You will likely be prompted to provide your password to give the app elevated priviledges; this is so that the app can install the CodeZero daemon (background service).

Once the app is running you will see a CodeZero icon in your system tray. Click on the tray icon and select "Dashboard" to open up the UI.

### Add your Configuration

Click on the tray icon again and select Configurations -> + Add Configuration. Select your cluster's kubeconfig file. If your kubeconfig is not selectable in the file chooser dialog try changing the dialog option to "show all files".

### Add a Workspace

A Workspace is a folder on your machine where you keep all your [Development Profiles](/concepts/profiles). Reminder that a Development Profile is a simple manifest file that defines a specific set of reproducible CodeZero commands. This allows developers to easily get several commands running for the tasks at hand without having to remember all the command line parameters for the command line tool.

Click on the tray icon again and select Workspaces -> + Add Workspace. Select the root of the Sample Project repo.

### Run a Development Profile

Run the Sample Project's front-end service locally by going to the root of the repo in your terminal and running `yarn start-frontend`. Like in the previous tutorial, if you go to `http://localhost:3030/` in a browser you should see that the Socket and Core sections show errors.

The Sample Project comes with an example Development Profile with just a single Teleport command. Let's run it now. Click the tray icon and select Development Profiles -> teleport. Go back to the Dashboard window and watch as your Teleport session is started.

 Let's revisit localhost now, but we want to go to `http://localhost:3030?teleport=1` this time, and refresh the page. We should see the connections all working. If you're curious what's happening under the hood, have a look at `index.js` in the frontend folder, and you will see code that uses this URL paramater to tell the frontend service to talk to `http://sample-project-core` now instead of `http://localhost:3030` because we are teleported.

Launch your favorite IDE and make changes to the code in `packages/frontend` in the Sample Project. You can make changes to the front-end code and see that you are able to test against the in-cluster sockets and core services.

When you are done, click the 'Close' button to stop your Teleport session.

### Create a New Development Profile

In your terminal, in the Sample Project root, stop the frontend service (CTRL-C) and run:

```bash
czctl intercept service sample-project-core -n sample-project -p 3000 --save-profile intercept
```

This will create a new Development Profile containing a single Intercept command targeting the sample-project-core service in our cluster. Since we are going to be routing traffic from the cluster to our local machine, we need to get the core service running locally. In your terminal, run:

```bash
yarn start-core
```

You should see the output `Core API cluster listening on http://localhost:3000`.

> When running `yarn start-core`, if you see an error related to "port already in use", check that you aren't debugging some other service on port 9229. The 'start-core' script is configured to start up in inspect mode.

Back in the Desktop app, click on the tray icon and run the new 'intercept' profile under the Development Profiles menu option.

> If for some reason you don't see the new profile, make sure the intercept profile that was created ends in *.yaml, or try switching workspaces and coming back.

Once the Intercept is running, you will see an entry for it on the Dashboard, and an ngrok URL. Click on the URL to open the link in a browser. There's no web UI here, but add `/api` to the end of your URL and you should see a JSON output.

Open up `sample-project/packages/core/index.js` and make a change to the `where` variable. Restart your locally running core service (`yarn start-core`) and go back and refresh your ngrok URL ending with `/api`. You should see your change for the "where" key.

What's happening under the hood is you're hitting a public internet address that tunnels back to your local machine and returns whatever is output by your locally running service.

### View Activity

From the Desktop app dashboard, click on the Activity tab to see all the commands that you have run so far. Try running the intercept Development Profile again to purposefully generate an error. Click on the command with the error to see what caused it.

### Wrapping Up

When you have finished your work, the last thing you will want to do is close your sessions. From the Sessions tab of Desktop app's dashboard, click on the "Close My Sessions" button.

### Conclusion

This concludes the Desktop app tutorial. As a final task, see if you can figure out how to change your profile picture. Having a profile picture can be helpful when you start getting into the collaborative aspects of the Desktop app and want to see who else on your development team is running sessions.
