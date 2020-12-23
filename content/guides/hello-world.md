# Hello World Web Application

> [!WIP]
> This document is still being developed and may be incomplete.

In this tutorial, we are going to create a very basic Hello World application in NodeJS using Express, and publish it to CodeZero.

Despite the fact that we are using NodeJS in this example, you are not limited to this for your own applications, and can develop your application in pretty much any language/environment you choose, so long as it can be packaged in a docker container.  For more advanced examples, checkout the [Docker](https://docs.docker.com/) documentation.

## Prerequisites

You'll need to:

1. Install [NPM](https://nodejs.org/en/),
1. Install [Docker](https://docs.docker.com/engine/install/), and
1. Set up a [Docker Hub account](https://hub.docker.com/signup).

## Create a NodeJS Application

First things first, create a new folder for the project, create a `package.json`, and add `express` as a dependency:

```json
{
  "name": "hello_world_server",
  "version": "1.0.0",
  "description": "Node.js Hello World",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

Next, lets create the application's business logic by creating a `server.js` file that contains:

```js
const express = require('express');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Hello World!
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

This will create a very basic web server running on port 8080.  The server will respond with "Hello World" when the root is requested.

### Test Your Application

```bash
npm install
npm start
```

Now checkout <http://localhost:8080/>, you should see "Hello World" in your browser!

## Create a Dockerfile

Next, lets configure our application to run in a Docker container.  First create a file called `Dockerfile` (there is no file extension), with the contents:

```docker
# Base docker image
FROM node:12

# Create app directory
WORKDIR /var/www/

# Bundle all the app code
COPY . .

# Install dependencies
RUN npm install

# Expose server port
EXPOSE 8080

# Finally, start the server
CMD [ "node", "server.js" ]
```

Notice how we call `COPY . .`, this will copy all the files in our project directory.  However, we don't necessarily want to copy everything, so we should set up a `.dockerignore` file to ignore the files we don't want to copy over:

```text
node_modules
npm-debug.log
```

### Build and Run in Docker

With the Dockerfile created, we can now build and run our application in docker.

```bash
docker build -t <your username>/nodejs-hello-world ./
docker run -p 12345:8080 -d <your username>/nodejs-hello-world
```

Navigate to <http://localhost:12345/>, our application is now containerized in Docker!

### Publish to Docker Hub

```bash
docker login
docker push <your username>/nodejs-hello-world
```

## Application Manifest using AppEngine

We need to create an Application Manifest in order to describe how our Application is defined and behaves in the CodeZero ecosystem.  We do this by creating a simple YAML file called `c6o.yaml`:

```yaml
name: Hello World
appId: <your-username>-helloworld  # replace this so it's unique

description:
  Hello World!

editions:
- name: preview
  scope: private
  spec:
    provisioner:
      package: @provisioner/appengine           # Provision using App Engine
      name: helloworld                          # Likely same as appId
      image: <your username>/nodejs-hello-world # Docker Hub image
      automated: true                           # should always be true
      ports:
      - port: 8080
        type: http

    routes:
    - type: http
      targetService: nodered
      targetPort: 8080

    marina:
      launch:
        type: inline
        popup: true
```

> [!NOTE]
> Check out the [Public Application using AppEngine](./appengine) for a little more details about what these properties do.

> [!EXPERT]
> Check out the [Application Manifest specification](../references/application-manifest.md) and [App Engine references](../references/appengine) for a full list of properties and configurations.

## Publish the Application

```bash
czctl app publish ./c6o.yaml
```

> [!NOTE]
> You'll need to have your CLI authenticated with your CodeZero account.  See the [Getting Started Guide](../guides/getting-started#Connect-to-the-Hub-API) for more instructions.

## Test the Application

There are two ways to install your application:

1. Using the CLI
1. Using the Store

### From the Marketplace

Navigate to the [Marketplace](https://codezero.io/marketplace), find your application, and begin the installation processes.

### Using the CLI

> [!NOTE]
> You will need the [CLI setup](./setup-cli) to connect with a CodeZero cluster using `KUBECONFIG`.

```bash
czctl install <your username>/nodejs-hello-world
```

## All Done

Congrats, you've created your first CodeZero application!
