---
sidebar_position: 2
---

# VPNs and Traffic Shaping

In many ways, Codezero works like a Virtual Private Network (VPN). Unlike a VPN however, Codezero only handles traffic related to services in a Teamspace. 
You can use a VPN while using Codezero and both will coexist without interfering with each other.

Codezero works by creating Virtual Interfaces for services running in the Teamspace and maintains entries in the `/etc/hosts` for these interfaces.

Codezero adds DNS entries to the `/etc/hosts` file that is part of MacOS and most Linux implementations. 
On Windows, Codezero modifies the appropriate Windows hosts file which in turn, propagates entries for the _Windows Subsystem for Linux_.

When Codezero's Daemon is running, you will see entries in `/etc/hosts/` file, between the following markers

```
###
# CODEZERO
# This section is managed by Codezero. Do not edit manually.
...
...
# /CODEZERO
###
```

As you Consume in-cluster services, you will see entries in this section appear, like below:

```
127.72.0.0 sample-project-leaf
127.72.0.0 sample-project-leaf.sample-project
127.72.0.0 sample-project-leaf.sample-project.svc
127.72.0.0 sample-project-leaf.sample-project.svc.cluster.local
```

These entries help map your in-cluster services to local names and allow you to work with remote services as though they are local. 

:::caution
Do not modify the markers or the content between the markers. This will cause Codezero to malfunction!

Currently, Codezero maps ports to the 127.72.0.0/14 range but local apps that bind to 0.0.0.0 or localhost can encounter port conflicts as they attempt to bind to all local interfaces.

Also, please note that the local Codezero IP range above is subject to change.
:::
