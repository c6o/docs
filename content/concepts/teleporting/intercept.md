# Intercept

Intercept is CodeZero's mechanism for solving teleporting with local service discoverability.

## Overview

Discoverability is the capability for remote cluster based services to find and talk to locally running services

What is required for developers to run services and have remote services talk to them? Several issues crop up right away.

First, in a collaborative setting, not all traffic in the remote service should get routed to the developer's machine. If it were, then developers would step on each other's toes trying to take over parts of the environment and could not be sure why requests are not being routed to their local service.

Second, local machines are usually exposed to outside requests being made and no external IP address is normally exposed. Without an external address, there is no way for the request to be routed to the local machine.

This problem requires changes to both the remote cluster and the local workstation to be implemented.

On the local workstation, an IP address must be obtained so that the remote cluster can talk to it. 

On the remote cluster a proxy must determine if a request coming into a service must be routed to a local workstation IP address

In the diagram below, a sidecar is inserted that looks for traffic with a particular header. If this header matches, it is routed to the developer's local workstationg. The header can be made specific to one developer or a team of developers depending on the use case.

![Intercept](../../_media/concepts/intercept-routing.jpg ':size=500px')

## Current Best Practice

To accomplish this is a complicated feat. On the local workstation side, an IP address must be registered and a tunnel created. For the cluster service, a proxy must be configured to look at the header, and route traffic appropriately while still not interferring with normal traffic. Addtionally, this proxy is shared amoung several developers so as header routes are established or destroyed, other routes must maintained without interference. Additionally, the proxy must scale with the system being intercepted. 

1. Establish an IP address for the local box appropriate tunnels.
2. Instantiate a sidecar proxy for the remote cluster service if it doesn't already exist.
3. Modify the sidecar proxy to intercept traffic of a particular header.

All of this is tricky to manage and time-consuming to set up.

## Solution

CodeZero's **intercept** command does all of this for you. It manages a proxy and header based routes so that you can collaborate with other developers without stepping on their toes. It also establishes an IP address for your local box where routed requests can be sent to reach the locally running service.
