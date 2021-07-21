# Monetize your Applications

> [!WIP]
> This document is still being developed.

The CodeZero marketplace allows software vendors to easily set pricing details for their applications, and generate revenue from their usage.

## Revenue

Revenue is managed via Stripe, and every developer that wishes to monetize an application will need to set up a Stripe account and link it with their CodeZero account.

Revenue earned through the CodeZero marketplace will then be deposited to your stripe account after a short holding period.

### Fees

> [!WIP]
> Details about billing fees coming soon.

## Editions

Editions enable application developers to create multiple tiers of features and pricing for their applications.  The goal of editions is to enable application developers to provide customers with a choice between different feature sets and capabilities.

A simple example could be a MySQL provisioner with three editions:

1. **preview**: non-production ready installation that gets up and running quickly
1. **standard**: a production ready single instance database
1. **enterprise**: production ready HA cluster

### Convention

CodeZero Applications should follow a few standard conventions when naming their conventions:

1. Editions should contain material differences.  For example, one version may run as a single node, while another provides a HA cluster.
1. An edition named `preview` should be used to provide a free version with minimal configuration needed, so customers can easily tryout the application.

### Pricing per Edition

Each edition can have distinctly different pricing structures.  However, each edition can only contain a single type of tier.

> [!WIP]
> Advanced pricing mechanisms are still in progress
