---
title: Synchronizing NGINX Configuration in a Cluster
weight: 300
---

## Creating the nginx-sync.conf Configuration File on the Primary Node

On the primary node, create the file **/etc/nginx-sync.conf** with these contents:

```none
NODES="node2.example.com node3.example.com node4.example.com"
CONFPATHS="/etc/nginx/nginx.conf /etc/nginx/conf.d"
EXCLUDE="default.conf"
```

### Common Parameters

Use a space or newline character to separate the items in each list:


{{<table variant="narrow">}}

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary.                       |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

{{</table>}}

### Advanced Parameters

{{<table variant="wide">}}

| Parameter                | Description                                                                            | Default                 |
| ------------------------ | ---------------------------------------------------------------------------------------|-------------------------|
| `BACKUPDIR`              | Location of backup on each peer                                                        | **/var/lib/nginx-sync** |
| `DIFF`                   | Location of `diff` binary                                                              | **/usr/bin/diff**       |
| `LOCKFILE`               | Location of the lock file used to ensure only one `nginx-sync` operation runs at a time| **/tmp/nginx-sync.lock**|
| `NGINX`                  | Location of the **nginx-plus** binary                                                  | **/usr/sbin/nginx**     |
| `POSTSYNC`               | Space-separated list of file substitutions to make on each remote node in the format: </br>`'\<filename\>\|\<sed-expression\>'`<br/> The substitution is applied in place: </br>`sed -i' ' \<sed-expression\> \<filename\>` </br> For example, to substitute the IP address of *node2.example.com* (*192.168.2.2*) for the IP address of *node1.example.com* (*192.168.2.1*) in *keepalived.conf*:</br> `POSTSYNC="/etc/keepalived/keepalived.conf\|'s/192\.168\.2\.1/192.168.2.2/'"` |   |
| `RSYNC`                  | Location of the `rsync` binary                                                         | **/usr/bin/rsync**      |
| `SSH`                    | Location of the `ssh` binary                                                           | **/usr/bin/ssh**        |

{{</table>}}