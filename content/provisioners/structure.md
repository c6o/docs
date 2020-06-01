# Provisioner Structure

```
Provisioner Structure
	Application spec overview
		Structure, keywords, parts of the spec.
	Create, Update, Remove actions
	Phases - Inquire, Validate, Apply
	User Interface
		Install, Remove and Settings Panel
		Install/Remove Mediator
		NavStation API
	Libraries used
		KubeClient
		Inquire
File structure of a provisioner
	K8s templates
	srce
	User interface
```

## Architecture

Diagram showing system, provisioner manager, provisioner

## Provisioner Methods

To implement a provisioner, you need to implement one or more methods corresponding to the action and phases of provisioning.  For example, for a simple provisioner that does only installation, you'd need to implement at least `createApply()`, but you may also implement `createInquire()`, `createValidate()`, as well as `updateApply()` to implement configuring applications.

Table of methods and descriptions, example of these:

Method
Description
Example
