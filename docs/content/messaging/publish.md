# Publishing

Publishing is designed to be dead simple. The Producer sends `Messages` to the Publisher in a fire-and-forget model without any concern for any upstream Consumers.

The Publishing system does not expose any objects.

## gRPC API

Producers can use unary and streamed gRPC APIs. A Producer can either make a separate publish call each time using the `Publish` RPC when there is new content or it can open a stream and send content as it arrives using `PublishStream`.

The streamed option is recommended when the Producer generates a lot of data in short intervals whereas the unary option is recommended when data arrives infrequently and there is no need to keep connections open for infrequent data streams.

The following protobuf specification defines these RPC services.

<!-- tabs:start -->

### ** Streamed **

``` protobuf
service Publisher {
  rpc PublishStream(stream Message) returns (google.protobuf.Empty) {}
}
```

### ** Unary **

``` protobuf
service Publisher {
  rpc Publish(Message) returns (google.protobuf.Empty) {}
}
```

<!-- tabs:end -->

## REST API

> TBD - Not yet implemented