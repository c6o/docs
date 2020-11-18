# Editions

> [!WIP]
> This document is still being developed

Editions enables an applications to contain multiple levels and features.

## Goals

The goal of editions is to enable application developers to provide customers with a choice between different feature sets and capabilities.

A simple example could be a MySQL Application with three editions:

1. **preview**: non-production ready installation that gets up and running quickly
1. **standard**: production ready single instance database
1. **enterprise**: production ready HA cluster

## Convention

CodeZero Applications should follow a few standard conventions when naming their conventions:

1. Editions should contain material differences.  For example, one version may run as a single node, while another provides a HA cluster.
1. An edition named `preview` should be used to provide a non-production free version.

## Pricing

Each edition can have distinctly different pricing structures.  However, each edition can only contain a single type of tiering system.

> [!WIP]
> Advanced pricing mechanisms are still in progress
