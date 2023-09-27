---
sidebar_position: 5
---

# Versions

The Codezero team comprises of avid sailors and thus, our major versions releases are named after islands in the Howe Sound Region of Vancouver, British Columbia. The team has sailed extensively around the Vancouver Island region and some of us have made it far out as Hawaii.

## 2.x - Pasley
[49.3663° N, 123.4613° W](https://mapcarta.com/24543628)

Pasley is the current pre-release and is the default version when you install Codezero. This version was written from scratch for resiliency and performance based on feedback from our customers.


## 1.x - Anvil
[49.53°N 123.309°W](https://mapcarta.com/24118270)

Anvil was the initial release of Codezero. This release used Kubernetes port-forwarding and nginx reverse proxies to perform teleport and intercepts.

Anvil was released in late 2021 and can still be installed using:

```bash
curl -L https://releases.codezero.io/install-headless.sh | /bin/bash -s anvil
```

When installed, `czctl` is available as `czctl1`. The binaries for this install are typically located in `/usr/local/bin/codezero-anvil/`.

:::caution

It is safe to have both Anvil and Pasley installed though we do not recommend you use together as this can lead to unexpected behavior. Should you need to switch, please run `czctl stop` or `czctl1 stop` and then start the desired version.

:::

## Canary

We are constantly adding new features and addressing issues. As a result, we strive to have a fairly rapid release of our tools. There are times when we want to get your feedback on new features or issues. This is particularly important when there are scenarios that are difficult for us to reproduce. For this reason, we have split our releases into Stable and Canary releases.

Yes - we get that there are the Canary Islands but in this case, canary refers to the colloquial term when referring to nightly releases.

You can tell Stable versus Canary releases by the version numbers. Canary releases have pre-release labels in the semantic versions (e.g. 2.0.2-alpha.0 vs 2.0.1). In the previous example, 2.0.1 would be considered the latest Stable release until 2.0.1 is published.

### Canary

Canary releases are used for internal testing however, you are welcome to try them out. Please note that Canary releases have generally undergone light testing and may contain instabilities or features that are a work-in-progress.

:::caution

Canary release may contain security vulnerabilities or may result in loss of data. Please do not use these releases on important clusters (e.g. your primary development cluster) and we do not recommend you make Canary releases available in your organization apart from testing.

:::

We welcome feedback and bug reports related to Canary releases.

#### Canary Installation

If you'd like to try out pre-release builds, you can upgrade to the latest Canary release with:

```bash
curl -L https://releases.codezero.io | /bin/bash -s -- canary
```

### Stable

In contrast to Canary releases, Stable releases have undergone our normal testing but may contain features that are explicitly marked **Preview**. Preview features may still be a work-in-progress but should be considered stable for use.
