# Messaging

When developing modular systems using Service Oriented Architecture, there are a number of ways in which two services can communicate with each other. In general, services can be tightly coupled or loosely coupled.

## Tightly Coupled Services

Tightly coupled services can be anything from statically linked libraries to services communicating over a REST API. In this case, developers are fully aware of the application interface provided by the other service and software is hard coded to the contract defined by the interface.

Tightly coupled services are very common primarily because they are very easy to build. There are, however, some down sides to tightly coupled services:

1. They can be fragile. Changes made to one service can break the other service
1. The are less resilient. A service outage can cause the entire service pipeline to experience an outage
1. By definition, it is not easy to swap out one service for another unless the interface happens to match the current contract

## Loosely Coupled Services

Alternatively, developers can build loosely coupled services. Loosely coupled services use a transport mechanism that acts as a data broker between services. Services read and write to the intermediary broker (generally called an Enterprise Service Bus) which handles messaging between services. This service bus:

1. Acts as a shock absorber as the system experiences increased load
1. Is responsible for transporting messages between services
1. Can provide additional services like keeping messages in order or fanning out the messages to multiple recipients

While there is additional development complexity in building loosely coupled services, they are essential to building resilient systems that scale. Traxitt provides out of the box functions to eliminate this development complexity.

## Direct Communication

Kubernetes already has excellent features for building tightly coupled services. You can expose services internally and externally using built in constructs such as Services and Pods. Traxitt stays out of the way and lets you continue to use these familiar means of inter-service communications. The rest of this document will focus on building loosely coupled services.

## The Publisher/Subscriber Subsystem

Traxitt provides a Publisher and Subscriber (Pub/Sub) system to build loosely connected services. Services that publish data are called Producers and services that subscribe to data are called Consumers. These services talk to the Publisher and Subscriber service. An internal system called the Registry coordinates everything and is backed by etcd. You will never have to directly interact with the Registry however, it is the source of truth on all active Subscriptions.

The Traxitt Pub/Sub system is an abstraction over Queueing providers like RabbitMQ, Kafka, Azure Event Hubs etc. The Pub/Sub system provides a data centric view to services and is inspired by databases instead of queues. End users can link services through the Traxitt UI to create Subscriptions much like the File Open dialog in present day Operating Systems. Developers can create Subscriptions programmatically.

The Pub/Sub system provides service developers and users a means to:

1. Produce data without concern of who the upstream Consumer is
1. Not have to worry about the underlying queuing constructs like partitioning and topics
1. Support both stateless and stateful Consumers for Subscriptions
1. Manage authorization on which Users can access what data based on the Subscriptions they can create
1. Handle burst of data in some parts of the data pipeline without it affecting other parts of the pipeline through real time management of hot and cold paths and time-to-live

The following diagram illustrates the key components of the Pub/Sub subsystem:

``` mermaid
graph TB
    subgraph Traxitt System
    	subgraph Publishers
			pub1[Pod 1]
			pub2[Pod 2]
			pub3[Pod 3]
		end
		subgraph Subscribers
			sub1[Pod 1]
			sub2[Pod 2]
			sub3[Pod 3]
		end
		reg[Registry]
    end
	 pro1--gRPC/REST-->pub1
	 pro2--gRPC/REST-->pub3
	 pro3--gRPC/REST-->pub2
	 sub2--gRPC/REST-->con1
	 sub3--gRPC/REST-->con2
	 pub2--queue-->sub1
	 pub2--queue-->sub2
	 pub3--queue-->sub1
	 pub3--queue-->sub3
    subgraph Customer Producers
    	pro1[Producer 1]
		pro2[Producer 2]
		pro3[Producer 3]
    end
	subgraph Customer Consumers
    	con1[Consumer 1]
		con2[Consumer 2]
    end
```

The Pub/Sub engine is a Subscriber pull system which means if there are no active Subscriptions (i.e. no one wants the data), the data is dropped by the Publisher so that  system resources are not consumed unnecessarily.