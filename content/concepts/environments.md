# Environments

When looking at your Microservices Graph be it in Production or a pre-Production environment, it helps to think of alterations to this graph as a new, Ephemeral Environment.

CodeZero provides you a set of primitives: Teleport, Intercept and Mount which can be configured and composed to re-shape the Microservices Graph in order to work on a feature or an issue. These tools allow you to essentially create a new Logical Ephemeral Environment without affecting the traffic flow in the underlying Physical Environment.