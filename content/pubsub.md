# Publisher / Subscriber

## Publisher / Subscriber Model

Traxitt's inter-app communication is built to run on Kubernetes and to leverage resiliency, scalability and automatic deployments.

A producer of content needs to securely register with a Traxitt publisher, either via a gRPC or RESTful API call.  The producer can either stream the content or make a separate API call for each item.

A consumer of content needs to securely register with a Traxitt subscriber, either via a gRPC or RESTful API call.  The consumer will then be sent content via a stream or an outbound separate API call will be made for each item.

The Traxitt System is architected to allow many producers and many consumers.  And, for scalability and realibility reasons, the system must allow for multiple publisher and subscriber components.

The Traxitt System uses Etcd for its core registry.

``` mermaid
graph TB
    subgraph Traxitt System
       subgraph Publisher
    	 	pub1[Publisher 1]
       	pub2[Publisher 2]
       	pub3[Publisher 3]
		 end
		 subgraph Subscriber
       	sub1[Subscriber 1]
       	sub2[Subscriber 2]
       	sub3[Subscriber 3]
		end
    end
	 pro1--gRPC-->pub1
	 pro2--gRPC-->pub3
	 pro3--gRPC-->pub2
	 sub2--gRPC-->con1
	 sub3--gRPC-->con2
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

## Content

### Content contract

``` protobuf
message Message {   
    string Id = 1; // ULID
    string SchemaURI = 2;
	string GroupId = 3;
    google.protobuf.Timestamp Timestamp = 4;
    int32 TTL = 5;
    map<string, string> Labels = 6;
    map<string, string> Headers = 7;
    bytes Payload = 8;
}
```

### Schemas (content types)

For each account, there must be 1 or more schemas uploaded prior to producing content.  This is because content needs to be published according to a predefined schema (or multiple schemas) that consumers can subscribe to, based on these schemas.

These schemas must follow the format of [JSON Schema](https://json-schema.org/understanding-json-schema/structuring.html).

It's recommended, but not enforced, that the account's schemas are kept as minimal as possible.  This will make the schemas more manageable.

### Subscriptions

``` protobuf
message Subscription {
    string namespace = 1;
    string address = 2;
    bool persistent = 3;
	repeated string SchemaURIs = 4; // nil for all schemas	
	map<string, string> Filters = 5; // map SchemaURI, filter
	map<string, string> Projections = 6; // map of SchemaURI, JSON Path projection
}
```

For example:

#### Data
``` json
{
	"active": true,
	"time": "2019-01-01 10:00:00",
	"temperature": [{
		"value": "254.9",
		"unit": "Kelvin"
	},{
		"value": "-18.1",
		"unit": "C"
	},{
		"value": "-0.6",
		"unit": "F"
	}],
	"humidity": {
		"value": "0.21"
	}
}
```

#### Subscription

``` json
{
	"namespace": "" ,
 	"address": "127.0.0.1" ,
	"persistent": false,
	"SchemaURIs" : { "https://schemas.traxitt.com/ibm.com/temperature/20190101#" },
	"Filters" : 
		{ "https://schemas.traxitt.com/ibm.com/temperature/20190101#" :
			"$and: { $.Active, $.Temperature[?(@unit=='C')].Value < 0 }"
		},
	"Projections" :
		{ "https://schemas.traxitt.com/ibm.com/temperature/20190101#" :
			"$.time,$.temperature[?(@unit=='C')]"
		}	
}

```

### Producer content

When a producer registers, the producer must specify the content type as follows:
* By one or more schemas

If no consumers are subscribed to a schema (or schemas) at publish time, then the content is simply dropped by the Traxitt System's publisher component.  Conversely, if there's a consumer subscribed to all schemas (*) then no content is dropped.

Of course, there are an incredible variety of producer content sources out there.  Custom software needs to be written for each type (and possibly major version) of this content source.  Traxitt can assist customers to write adapters for their specific hardware sensors and/or data sources.  In addition, Traxitt has a library of adapters already written either by Traxitt or the developer community.

We recommend polling your sensors or data sources with a sensible predefined frequency.  In other words, choose a frequency that makes sense to capture expected changes quickly but doesn't introduce too much noise.  For example, a weather-based temperature sensor could be polled every 60 seconds and there's little value polling it more frequently than this.  Of course, take into account the sensor's accuracy and account for a follow up reading after a wild fluctuation.

### Subscriber content

When a consumer registers, the consumer can specify the messages or content it's interested in as follows:
* All content (*)
* Only content of a particular schema (type)
* If applicable, which content that applies to the schema, by [JAQL](http://en.wikipedia.org/wiki/JSON) filtering (selection).
* * Note that JAQL's group, join, sort, top and transform are NOT supported; instead, these operations are left to the consumer.
* If applicable, which subsets of the schema (projection), if not all of it.  See [W3C specification for fragement identification](https://www.w3.org/TR/2012/WD-fragid-best-practices-20121025/)
* * Alternatives include Pig and Hive.

For example, a consumer may subscribe to everything (*).  This may be desirable to persist all content to a time series database.  See [Time series database](#Time-series-database)

Another example, a consumer may subscribe to a schema representing Temperature and Humidity.  However, this consumer coudl specify the projection of just the humidity subset of possible data, including the sensor's location.  In addition, this consumer could also specify to only subscribe to humidity values over 65%.  This may be desirable for a high humidity alarm and/or to trigger a nearby dehumidifier to be activated.

### Handling multiple consumers for a particular schema
For now, if there are multiple consumers interested in the same content but with different projections and/or selections then the Traxitt System will simply send this content independently of each other even if there are opportunities for possible efficiency and/or performance improvements.

### Partitioning

Aggregation is out of scope and is a task best handled by a consumer.  However, the Traxitt System allows for partitioning to ensure that a consumer with a subscription continue to receive content from the same producers so that they can perform aggregation.  For example, let's say that the task of calculating the average temperature over a 24 hour period for each sensor in a warehouse is a job handled by 3 or more consumers (for performance and scalability reasons).  Of course, the Traxitt Ssystem cannot arbitrarily send content to any of these 3 consumers but, instead, needs to parition the content by producer and then consistenly send the content onto the same consumer unless something goes wrong (more on this later).

So, how is this achieved?  If a consumer subscribes with an existing subscription, i.e.: the messages or content they're after is a complete match, then the subscriber automatically recognizes this and assigns a partition to the preexisting consumer and this new consumer.  As such, both consumers will now get roughly half of the content.  Interestingly, this does have the side effect of the original consumer now no longer receiving content from roughly half of the producers it was receiving.

Similarly, if a third consumer subscribes with the same existing subscription then, the content is now partitioned into roughly thirds from that point forward.  Conversely, if a consumer crashes or is no longer available then the content is repartitioned into one less part until, of course, there is no partition needed and all of the content for that subscription is sent to a single consumer.

In order to partition content consistently, this is achieved by partitioning based on a hashing algorithm on the producer ID and the number of partitions at the time.

### Schema management

An account's schemas can be managed using [Traxitt's hub](#) software.  Schemas can be created, viewed, updated and deleted.  Caution should be taken when updating a schema as follows:
* When updating a schema, any existing subscribers to that schema based on $schema URI must be reevaluated and, if applicable, dropped.
* When deleting a schemam, any existing subscribers to that schema based on $schema URI must be dropped.

Schema URIs should follow the form:
http://schamas.traxitt.com/customer-namespace/id#
E.g.: https://schemas.traxitt.com/ibm.com/temperature/20190101#

### Security
Security if obviously important to the consumer/subscriber side of things to ensure that the content is sent to legitimate consumers.  However, it's also quite important to ensure that producers are allowed to publish content.

#### TLS/SSL

In a production environment, it's recommended to use server-side TLS/SSL certificates.
** See [gRPC authentication](https://grpc.io/docs/guides/auth/)

#### JWT
In addition, the Traxitt System implements JWT tokens as follows:

You can call a to a UnaryInterceptor like so if you want to verify the jwt on every request
``` go
// middleware for each rpc request. This function verifies the client has the correct "jwt".
func authInterceptor(ctx context.Context, req interface{}, usi *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
    meta, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "INTERNAL_SERVER_ERROR")
    }
    if len(meta["jwt"]) != 1 {
        return nil, status.Error(codes.Unauthenticated, "INTERNAL_SERVER_ERROR")
    }

    // perform different authorization logic per method
    if usi.FullMethod != ...

    // if code here to verify jwt is correct. if not return nil and error by accessing meta["jwt"][0]

    return handler(ctx, req) // go to function.
}
```

In your context from the client use the metadata to pass the jwt string and verify.

In Your main function remember to register it like so

``` go
// register server
myService := grpc.NewServer(
    grpc.UnaryInterceptor(authInterceptor), // use auth interceptor middleware
)
pb.RegisterTheServiceServer(myService, &s)
reflection.Register(myService)
````

Your client would need to call your server like this:

``` go
// create context with token and timeout
ctx, cancel := context.WithTimeout(metadata.NewOutgoingContext(context.Background(), metadata.New(map[string]string{"jwt": "myjwtstring"})), time.Second*1)
defer cancel()
```

Similarly, see [gRPC interceptors blog post](https://davidsbond.github.io/2019/06/14/creating-grpc-interceptors-in-go.html)

## Component architecture

The publisher and subscriber software components are written in Go (Golang) in order to take full advantage of microservice architecture and scalability on Kubernetes.

### APIs

Producers talk to the publisher component via gRPC or RESTful-based APIs.  gRPC is recommended for performance and efficiency reasons.  Both unary and streamed connections are supported in the gRPC API.

Similarly, consumers talk to the subscriber component via gRPC or RESTful-based APIs.  gRPC is recommended for performance and efficiency reasons.  Both unary and streamed connections are supported in the gRPC API.

### Coupling

The coupling of services can be either tight or loose.  A tightly coupled service or component, theservices or components are dependent on one another and, as a result, isn't very scalable.  Changes to one service or component often requires changes to a number of other services or components.  Conversely, loose coupling reduces interdependencies between components, more flexible, maintainable, scalable and stable.  For these reasons, the traxitt System is loosely coupled.

Producers and consumers connect to publishers and subscribers using Kubernetes' DNS-based service discovery.  For example: publisher.traxitt-system.svc.cluster.local instead of 192.168.0.1 or pod123.digitalocean.com.  This way, the service will hand off the request to the appropriate load balanced publisher component and there is no tight coupling.

### Time series database

Most of the time, all of the content needs to be persisted to a time series database.  This doesn't need to be a high priority but it does need to be complete (reliable).  For this reason, the Traxitt System comes with this ability out of the box and can be easily configured to set this up.

> Should we may only support 1 or more common SaaS time series DB providers OR should we support in Kubernetes.  I would think the latter due to Internet bandwidth/latency...

This time series database is useful for record keeping as well as running queries and performing analytics.

After some research, ElasticSearch runs well on Kubernetes and is open source.  TimescaleDB is also open source and 
* InfluxDB not recommended for production in k8s
* [ElasticSearch as a time series data store](https://www.elastic.co/blog/elasticsearch-as-a-time-series-data-store)
* [Research on Time Series DBs](https://redmonk.com/rstephens/2018/04/03/the-state-of-the-time-series-database-market/)

### Logging

#### Levels
The Traxitt System components have the ability to output logs at a configurable threshold level as follows:
* Fatal only
* Errors
* Warnings
* Info
* Debug (all)
At any particular level, any higher level logs will also be included.  For example: Warnings will include errors and fatal issues.

In production, the debug (all) log level should not be used for performance reasons.

(https://kubernetes.io/docs/tasks/debug-application-cluster/logging-elasticsearch-kibana/)

#### Integration
TBD re: offering out of the box, configurable logging integration with SaaS/cloud logging services.