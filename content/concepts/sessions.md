# Sessions

Most of the commands alter your local Development Workstation or the Kubernetes Cluster. 
The Residue created by the command are recorded in Sessions Resources which are stored either in 
Session Custom Resource Definitions in 
the Cluster or in lock files in your home CodeZero directory.

For example, when using Teleport, the Development Workstation DNS host file is altered so that you can resolve services 
in the cluster. Closing the Teleport Session cleans up all the residue added to the DNS host file.

Sessions are also used to allow team members to collaborate with each other. 
Developers can see team members with active sessions in a cluster and work together on various components of an application.