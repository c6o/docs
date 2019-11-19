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

These schemas must follow the format of [JSON Schema](https://json-schema.org/understanding-json-schema/structuring.html).

It's recommended, but not enforced, that the account's schemas are kept as minimal as possible.  This will make the schemas more manageable.

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

Producers and consumers connect to publishers and subscribers using Kubernetes' DNS-based service discovery.  For example: publisher.traxitt-system.svc.cluster.local instead of 192.168.0.1 or pod123.digitalocean.com.  This way, the service will hand off the request to the appropriate load balanced publisher component and there is no tight coupling.

### Time series database

Most of the time, all of the content needs to be persisted to a time series database.  This doesn't need to be a high priority but it does need to be complete (reliable).  For this reason, the Traxitt System comes with this ability out of the box and can be easily configured to set this up.

This time series database is useful for record keeping as well as running queries and performing analytics.

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
