---
sidebar_position: 3
---

# Space Agent for VMs and VPCs

In instances where services are not managed within a Kubernetes cluster, the Space Agent binary can be used outside the cluster to consume services within a Virtual Private Cloud (VPC).

You will need to download the version for your CPU architecture type:

| Arch Type | URL                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| amd64     | [https://releases.codezero.io/latest/spaceagent-linux-amd64.tar.gz](https://releases.codezero.io/latest/spaceagent-linux-amd64.tar.gz) |
| arm64     | [https://releases.codezero.io/latest/spaceagent-linux-arm64.tar.gz](https://releases.codezero.io/latest/spaceagent-linux-arm64.tar.gz) |

## Environment Variables

The following environment variables can be set to configure the Space Agent:

| Environment Variable  | Description                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `CZ_SPACE_CONFIG`     | File path to the configuration file                                                                         |
| `CZ_EXTERNAL_HOST`    | External hostname of the Space Agent                                                                        |
| `CZ_HUB_SPACE_NAME`   | Name of Teamspace                                                                                           |
| `CZ_HUB_ORG_ID`       | Your Organization ID                                                                                        |
| `CZ_HUB_ORG_APIKEY`   | Your Organization API Key                                                                                   |
| `CZ_SPACE_CA_CERT`    | File path to store the Teamspace certificate, if not specified defaults to `/etc/ssl/certs/space/ca.pem`    |
| `CZ_CLUSTER_CERT`     | File path to store the Space Agent certificate, if not specified defaults to `/etc/ssl/certs/space/tls.pem` |
| `CZ_CLUSTER_CERT_KEY` | File path to store the Space Agent private key, if not specified defaults to `/etc/ssl/certs/space/tls.key` |

## Configuration File Format

The configuration file referenced in the `CZ_SPACE_CONFIG` environment variable must list the services that you want to access via this Space Agent. Each record consists of the following fields:

| Field          | Description                                      |
| -------------- | ------------------------------------------------ |
| `name`         | The name of the service                          |
| `forwardHost`  | The host to forward consume requests to          |
| `namespace`    | Optional namespace, defaults to `default`        |
| `ports[].port` | A list of ports that the service is listening on |

Below is an example of a configuration file for two services, one on the local host and one on host `10.0.0.2`:

```yaml
- name: service-a
  forwardHost: localhost
  ports:
    - port: 80
- name: service-b
  forwardHost: 10.0.0.2
  ports:
    - port: 80
    - port: 443
```

## Example Start Script

Below is a minimal start script for a Space Agent:

```bash
#!/bin/sh

export CZ_SPACE_CONFIG=compute-services.yaml
export CZ_EXTERNAL_HOST=`curl https://ifconfig.me`
export CZ_HUB_SPACE_NAME="VM Space"
export CZ_HUB_ORG_ID="xxxxxx"
export CZ_HUB_ORG_APIKEY="xxxxxxx"

./spaceagent
```
