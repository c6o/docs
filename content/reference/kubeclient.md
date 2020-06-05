# KubeClient Reference

The KubeClient provides an easy to use interface to kubernetes clusters. It can be used in direct mode, where changes are immediate, or in a batch mode where commands are added to a command stack and then executed sequentially when the command stack is ended.

## API Examples

### Direct Mode - Cluster

The following snippet illustrates the use of the KubeClient to retrieve the config map resources that have the specified labels.

```javascript
let result = await this.manager.cluster.list({
    kind: 'ConfigMap',
    metadata: {
        namespace,
        labels: {
            'system.traxitt.com/app-name': 'grafana',
            'system.traxitt.com/app-namespace': 'monitoring',
        }
    }
})
if (result.error) throw result.error
```

### Batch Mode - Processor Command Stack

The following snippet creates a new cluster object, and then executes a list of command sequentially.

A command stack is created with the `begin()` method, and execution on the stack begins when `end()` is called as shown.

```javascript
const cluster = new Cluster({})
cluster
    .begin('Install dev services')
    .list(this.devPods)
    .do((result, processor) => {

        if (result?.object?.items?.length == 0) {
            processor
                .upsertFile('../k8s/configMap.yaml', { namespace, publicKey })
                .upsertFile('../k8s/pvc.yaml', { namespace, storage })
                .upsertFile('../k8s/deployment.yaml', { namespace, image })
                .upsertFile('../k8s/svc.yaml', { namespace })
                .upsertFile('../k8s/devSvc.yaml', { namespace })
        }
    })
    .end()
```

In some cases, you may need to execute arbitrary Typescript code in the middle of a command sequence. This is done using the `do` method as shown. You provide `do()` with a callback that has the result from the previous command, and the processor command stack.

## Functionality

The KubeClient functionality is available in both direct and batch mode except where indicated.

* CRUD - perform create, read list, update, patch or delete on a specified kubernetes document.

* exec - run the command and args on a specified pod.

* watch - watch a specified kubernetes resource

* Files - CRUD using file handlebar templates

* Attempt - repeatedly call a function a number of times with a delay until it succeeds

* portForward - set up a portForward to cluster service for access

## Status Reporting

The KubeClient can be supplied with an instance of the Status object.  Status object maintains the state of the execution of a command stack for display on the command line or other real time status display.

