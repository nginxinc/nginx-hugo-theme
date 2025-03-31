---
description: Code Blocks - Spacing and OL/UL
title: Code Blocks - Spacing and OL/UL
weight: 200
---

This is a line. 

```shell
sudo rm -rf /
```

This is the line that follows. Great.

## `h2` - Headers followed by codeblocks
```shell
sudo rm -rf /
```
### `h3` - Header
```shell
sudo rm -rf /
```
#### `h4` - Header
```shell
sudo rm -rf /
```

## Order List with single line code block


1. Create the `/etc/ssl/nginx` directory:

    ```shell
    sudo mkdir -p /etc/ssl/nginx
    ```

1. Log in to [MyF5 Customer Portal](https://account.f5.com/myf5/) and download your `nginx-repo.crt` and `nginx-repo.key` files.

1. Copy the files to the `/etc/ssl/nginx/` directory:

    ```shell
    sudo cp nginx-repo.crt nginx-repo.key /etc/ssl/nginx/
    ```

1. Install the prerequisites:

    ```shell
    sudo yum install yum-utils procps
    ```

1. Set up the yum repository by creating the file `nginx-agent.repo` in `/etc/yum.repos.d`, for example using `vi`:

    ```shell
    sudo vi /etc/yum.repos.d/nginx-agent.repo
    ```

1. Add the following lines to `nginx-agent.repo`:

    ```ini
    [nginx-agent]
    name=nginx agent repo
    baseurl=https://pkgs.nginx.com/nginx-agent/centos/$releasever/$basearch/
    sslclientcert=/etc/ssl/nginx/nginx-repo.crt
    sslclientkey=/etc/ssl/nginx/nginx-repo.key
    gpgcheck=0
    enabled=1
    ```
