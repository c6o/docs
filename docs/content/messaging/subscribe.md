# Subscribing

A `Subscription` describes the type of data a Consumer wishes to receive. The Traxitt System handles everything with respect to delivering data from Producers within the cluster. One can think of a Traxitt `Subscription` as a living database query.

## Subscription Format

The `Subscription` request is as follows:

``` protobuf
message Subscription {
    string SchemaUri = 1;
	  Partition Partition = 2;
	  repeated Selector Filters = 3;
    repeated Selector Projections = 4;
    bool Persistent = 5;
    string Address = 6;
}

message Partition {
    string Field = 1;
    string Namespace = 2;
    map<string, string> LabelSelectors = 3;
}

message Selector {
    string Provider = 1;
    string Query = 2;
}
```

### SchemaUri

The `Subscription.SchemaUri` defines the schema Uri of the messages that the consumer is interested in.

> Traxitt has a reserved schema URI that can be referenced when subscriptions need to see every message produced.  This is useful when a consumer is writing all messages to a time series database or log.  In this case, use https://traxitt.com/schemas/v1/all

### Partition

When subscribing to data, Traxitt can send data to a Kubernetes Service or a Pod depending on the `Address` specified. If data is sent to a Service, Kubernetes takes care of routing the Message to a Pod. This is fine if your Service is a stateless service and it does not matter which Pod processes the Message. An example stateless service is an Alerting service that looks at a Message and triggers an alert.

If, however, you have a stateful service, you can use the `Subscription.Partition` to specify how to partition the data so it gets routed to a specific Pod. The `Partition.Field` is a JSON Path string to a field in the `Message.Payload`. For instance, if your `Message.Payload` has a `DeviceId` field and you set this to the `Subscription.Partition.Field`, the system will route the message to a Pods such that Messages for a given `DeviceId` will always be routed to the same Pod. If the Pod is no longer responsive, the system will elect a new Pod for the `Message` for the given `DeviceId`

Messages are delivered to the first available Pod that is in he `Partition.Namespace` and that matches the `Partition.LabelSelectors`.

If the `Partition.Field` is missing on the `Message.Payload`, the message is dropped.

### Filters

The consumer may not be interested in all of the messages even if they have the same schema.  For example: an alert/alarm consumer of temperature sensors may only be interested in data flowing from sensors in a particular warehouse and, of those, only those that are either below or above certain alert/alarm thresholds.

Use the `Subscription.Filters` to specify one or more filters to select which messages to receive.  If multiple filters are specified then the intersection of the resulting messages will only be sent, i.e.: an AND logical operator is applied across multiple filters.

Each filter must specify the `Selector.Provider` and have the `Selector.Query`, which will be applied against each message to determine whether or not it should be sent. The query format depends on the provider.

> TBD: Initially, only PartiQL will be supported.

### Projections

Often, consumers may not be interested in all of the message content and, in fact, it is good practice for consumers to specify just the content they want to consumer from the messages.  This not only reduces unnecessary noise in messaging but can greatly increase the system performance.

The consumer can specify one or more projections in the `Subscription.Projections`.  If multiple projections are specified then the union of the projections will be sent, i.e.: a union/combination of each of the projections will be sent as the final message.

Each projection must specify the `Selector.Provider` and have the `Selector.Query`, which will be applied against each message to determine the subset of message content to be sent.  The query can be as a simple or complicated as long as it is supported by the provider.

> TBD: Initially, only PartiQL will be supported.
> TBD: Determine what to use as the projection format, e.g.: JSON Path.

### Persistence

Subscriptions can be either Persistent or Transient as specified by the `Subscription.Persistent` field. A persistent subscription will continue to buffer messages even if all of the Consumers stop responding. Buffered messages will be retained based on the Traxitt System configuration settings. In contrast, should a Consumer endpoint fail to acknowledge messages to a transient subscription, the Subscriber will terminate the subscription.

### Address

The `Subscription.Address` defines where data is delivered. This is only applicable for unary `Subscriptions` (see below)

## gRPC API

Consumers can also choose between unary and streamed gRPC APIs. The streamed option is the simpler of the two. When `SubscribeStream` is called, the Consumer receives messages as a streamed response. When the Consumer wishes to end the subscription, simply close the stream and the Subscription will be cleaned up. The `Subscription.Address` field is ignored for streamed subscriptions.

For the unary option, the Consumer has to set up a gRPC endpoint where the Subscriber will send Messages. The Address of the gRPC service is in the `Subscription.Address` field. This can be a Kubernetes `Service`, an individual `Pod` or even an external endpoint. The call to `Subscribe` returns a `SubscriptionToken`. When the Consumer is done with the Subscription, it has to call `Unsubscribe` with this token to end the Subscription.

<!-- tabs:start -->

### ** Streamed **

``` protobuf
service Subscriber {
  rpc SubscribeStream(Subscription) returns (stream Message) {}

```

### ** Unary **

``` protobuf
service Subscriber {
  rpc Subscribe(Subscription) returns (SubscriptionToken) {}
  rpc Unsubscribe(SubscriptionToken) returns (google.protobuf.Empty) {}
}

message SubscriptionToken {
    string Token = 1;
}
```

### Consumer RPC Endpoint

Messages to Consumers that subscribe using the unary API will be sent to the following RPC call. This has to be implemented at the endpoint specified at `Subscription.Address`:

``` protobuf
service Consumer {
  rpc ProcessMessage(Message) returns (google.protobuf.Empty) {}
}
```

<!-- tabs:end -->

## REST API

> TBD - Not yet implemented
