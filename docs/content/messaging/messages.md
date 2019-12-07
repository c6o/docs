# Messages

`Messages` are the equivalent of Documents in a traditional operating system and make up the backbone of the Traxitt System. Data is transmitted using the predefined `Message` format below. `Messages` comprise of Metadata that describe the data and the Payload.

## Message Format

The `Message` object is defined as follows:

``` protobuf
message Message {
    string Id = 1;
    string SchemaUri = 2;
    google.protobuf.Timestamp Timestamp = 3;
    map<string, string> Labels = 4;
    repeatable string Tags = 5;
    bytes Payload = 6;
}
```

### Id

The `Message.Id` uniquely identifies the Message and is a ULID. Messages take a non-deterministic path through the system to Consumers. Consumers can use this `Id` to de-duplicate actions or to merge the `Message` as it may arrive back at a consumer several times as it is processed by the different pathways in the system.

### SchemaUri

The `Message.SchemaUri` is a Schema URI that defines the `Message.Payload` format. The Schema URL is in [JSON Schema](https://json-schema.org/understanding-json-schema/structuring.html) format.

> Note that the Schema URI doesn't have to be local to the Traxitt Application, e.g.: https://hub.traxitt.com/schemas/{app-name}/{version}/temperature, but does need to be accessible on the Internet.  You have the ability to manage your schemas in Traxitt's hub system.

> Once a schema is used by any producers and/or consumers, it should be immutable; instead, use an new schema with a different version. Once the previous schema is no longer in use then it will be marked deprecated.

### Timestamp

The `Message.Timestamp` field defines the Event Time that resulted in the `Message`. This is different than Gateway Timestamp or Processing Timestamps.

> TBD: Do we store other timestamps? Are they just part of the payload? If so, this means we don't have a standard

### Labels

`Message.Labels` are optional key value pairs that make up the key part of the `Message` Metadata. These are anything that have to do with the processing of the data as opposed to `Payload` data. `Subscriptions` can filter by `Labels`.

### Tags

`Message.Tags` are a list of optional tags (strings) that make up the key part of the `Message` Metadata. `Tags` would include things like which `Consumers` have already processed the `Message`

### Payload

The `Message.Payload` contains the body of the message and is defined by the `Message.SchemaId`