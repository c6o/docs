# Testing Plan

## Introduction

This document outlines Traxitt's overall tesing plan and strategy and discusses the details of what testing involves and must cover.

## Objectives

TODO

## Scope

The scope of testing includes:
* The Traxitt Installer
* The Traxitt Hub
* The Publisher/Subcriber inter-app communication system
* Traxitt apps?

## Testing Strategy

The focus for testing will be unit testing, system & integration testing, and performance & stress testing. Unit tests are automatically tested as part of the build process. System & integration testing and performance & stress testing are both manual tests and need to be performed prior to each release. And, of course, chaos testing is important given the nature of our buisness (lots of sensor data and large flow volumes).

### Unit Testing

Unit tests should be comprehensive but focus on code at the service layer and deeper. Unit tests should be specific and atomic. No dependenices between unit tests should exist. Unit tests should test both regular flow and edge cases separately. There is no value in unit testing the UI/UIX layer.

#### Participants

All developers must write their own unit tests prior to implementing the code for their new features. In addition, any issue fixes may require changes to unit tests and/or additional unit tests. If a particular area lacks coverage then it should be filled in rather than ignoring it since you didn't originally work on that area.

#### Build Automation

Developers should manually run unit tests locally prior to merging and collapsing their code.

Running the unit tests must be part of the continuous integration build process (on the master and develop branches) and if any of the unit tests fail then the build process should stop and notify the team of the error so that it can be resolved.

### System and Integration Testing

TODO

### Performance and Stress Tesing

Load testing needs to find and help identify the breaking points of the Traxitt System. In addition, the test results can be used by other departments for their materials. Load testing results should be repeatable and consistent. Each load test must produce a report, including:
* Date and time
* Hardware for Traxitt System
* * Number of nodes
* * * Number of virtual CPUs
* * * Memory
* * Number of pods for:
* * * Registry
* * * Queueing
* * * Publishers
* * * Subscribers
* * Hardware for Load Testing sofware
* * Number of nodes and pods
* * * Number of virtual CPUs
* * * Memory
* Setup the following:
* * Start off with a single producer/consumer pairing sending a burst 1000 messages
* * Continue to add each pairing sending a simultaneous 1000 message burst until an error threshold is exceeded
* Chart the message throughput as follows:
* * Average # of successful and unsuccessful messages sent end-to-end per second per pairings
* * Corresponding CPU usage
* * Corresponding memory usage
* * Corresponding blocking calls
* * Corresponding network usage

And, for the test results close to failing and failing, the following additional reports need to be created:
* CPU profile
* Memory profile
* Blocking process profile
* And, if possible, LAN bandwidth profile

#### Assumptions

* Load testing software must be run on independent, powerful hardware so as not to affect the results
* Each message will be sent with a random 1kB payload
* The message transmit error threshold is configurable and the default is 0%
* Initially, the mapping of pods to nodes is 1:1 for each component. In other words, a subscriber pod will run on it's own node, which will also run a publisher pod and a queue pod.
* The registry will always use exactly 3 pods/nodes
* The queue will use as many pods as available
* The Traxitt System components (publisher and subscriber) will use as many pods as available

### Chaos Testing

Regardless how encompassing the test suite is, once the code is running on enough pods/nodes and reaches enough complexity then errors are going to happen. Since failure is unavoidable, why not deliberately introduce it to ensure your systems and processes can deal with the failure?

### User Acceptance Testing

TODO

### Test Schedule

TODO

### Roles & Responsibilities

TODO

### Risks & Assumptions

TODO