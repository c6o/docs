# Publisher / Subscriber

> Welcome to Traxitt.

<!-- tabs:start -->

## ** English **

Hello!

## ** French **

Bonjour!

## ** Italian **

Ciao!

<!-- tabs:end -->

## Publisher / Subscriber Model

Traxitt's inter-app communication is built to run on Kubernetes and to leverage resiliency, scalability and automatic deployments.

A producer of content needs to securely register with a Traxitt publisher, either via a gRPC or RESTful API call.  The producer can either stream the content or make a separate API call for each item.

A consumer of content needs to securely register with a Traxitt subscriber, either via a gRPC or RESTful API call.  The consumer will then be sent  content via a stream or an outbound separate API call will be made for each item.

## Content

### Schemas (content types)

For each account, there must be 1 or more schemas uploaded prior to producing content.  This is because content needs to be published according to a predefined schema (or multiple schemas) that consumers can subscribe to, based on these schemas.

These schemas must follow the format of [YAML](http://en.wikipedia.org/wiki/YAML). Note that [JSON schema](http://en.wikipedia.org/wiki/JSON) is valid YAML since it's a subset of the YAML specification.

It's recommended, but not enforced, that the account's schemas are kept as minimal as possible.  This will make the schemas more manageable.

### Producer content

When a producer registers, the producer must specify the content type as follows:
* By one or more schemas

If no consumers are subscribed to a schema (or schemas) at publish time, then the content is simply dropped by the Traxitt System's publisher component.  Conversely, if there's a consumer subscribed to all schemas (*) then no content is dropped.

### Subscriber content

When a consumer registers, the consumer can specify the messages or content it's interested in as follows:
* All content (*)
* Only content of a particular schema (type)
* If applicable, which subsets of the schema (projection), if not all of it
* If applicable, which content that applies to the schema, by [JAQL](http://en.wikipedia.org/wiki/JSON) filtering (selection).
* * Note that JAQL's group, join, sort, top and transform are NOT supported; instead, these operations are left to the consumer.
* * Alternatives include Pig and Hive.

For example, a consumer may subscribe to everything (*).  This may be desirable to persist all content to a time series database.  See [Time series database](#Time-series-database)

Another example, a consumer may subscribe to a schema representing Temperature and Humidity.  However, this consumer coudl specify the projection of just the humidity subset of possible data, including the sensor's location.  In addition, this consumer could also specify to only subscribe to humidity values over 65%.  This may be desirable for a high humidity alarm and/or to trigger a nearby dehumidifier to be activated.

### Handling multiple consumers for a particular schema
For now, if there are multiple consumers interested in the same content but with different projections and/or selections then the Traxitt System will simply send this content independently of each other even if there are opportunities for possible efficiency and/or performance improvements.

## Component architecture

### Loose coupling

Producers and consumers would connect to publishers and subscribers, respectively, by fully qualified service name instead of IP address or cloud hostname.  For example: publisher.traxitt.svc.local instead of 192.168.0.1 or pod123.digitalocean.com.  This way, the service will hand off the request to the appropriate load balanced publisher component.

### Time series database

Most of the time, all of the content needs to be persisted to a time series database.  This doesn't need to be a high priority but it does need to be guaranteed (dependable).  For this reason, the Traxitt System comes with this ability out of the box and can be easily configured to set this up.

After some research, ElasticSearch runs well on Kubernetes and is open source.  TimescaleDB is also open source and 
* InfluxDB not recommended for production in k8s
* [Research on Time Series DBs](https://redmonk.com/rstephens/2018/04/03/the-state-of-the-time-series-database-market/)

123

``` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
```

:octocat: Hello

``` json
{
    "foo: {
        "bar": "car"
    }
}
```

Something

> [!NOTE]
> An alert of type 'note' using global style 'callout'.

Something

> [!WARNING]
> An alert of type 'note' using global style 'callout'.

Tip

> [!TIP]
> An alert of type 'note' using global style 'callout'.

Danger

> [!DANGER]
> An alert of type 'note' using global style 'callout'.
