# Architecture Overview #

This diagram illustrates relationship between the c6o Hub Application Registry,  and customer's Kubernetes clusters running the c6o store, the c6o system and installed CodeZero Apps.

```mermaid
graph TB
    user(User)
    subgraph Kubernetes Cluster
        store[CodeZero Store]
        marina[Marina Desktop]
        system[c6o System]
        app1[App 1]
        app2[App 2]
    end
    developer(Developer)
    subgraph Services
        hub[c6o Hub]
        npm[NPM Registry]
    end
    user-->store
    user-->marina
    user-->app1
    user-->app2
    developer-->hub
    developer-->npm
    store-->system
    marina-->system
    system-->app1
    system-->app2
    store-->hub
    hub-->system
    npm-->system
```

Developers publish their applications by publishing application manifests to the c6o Hub, and the associated provisioner module to the npm registry.

c6o Cloud users install applications by using the c6o Store. The store accesses Hub to find available applications for installation.  When the application is installed, the application manifest is added to the cluster. The system then downloads needed provisioner modules to install the kubernetes resources.  Kubernetes then downloads needed application container images from container repositories such as Docker.


