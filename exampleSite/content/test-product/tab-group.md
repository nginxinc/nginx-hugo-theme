---
description: Tab Group
title: Tab Group
weight: 200
---

## tab-group


{{<tabs name="common_steps_for_nginx_oss_and_plus">}}

{{%tab name="Ordered List With Code Block types"%}}

1. Create the `/etc/ssl/nginx` directory:

    ```shell
    sudo mkdir -p /etc/ssl/nginx
    ```

2. Upload **nginx-repo.crt** and **nginx-repo.key** files to the `/etc/ssl/nginx/` directory.

3. Install required dependencies:

    ```shell
    sudo yum install ca-certificates wget
    ```

4. Remove any previously downloaded NGINX repository files from `/etc/yum.repos.d`:

    ```shell
    sudo rm /etc/yum.repos.d/nginx*.repo
    sudo rm /etc/yum.repos.d/*app-protect*.repo
    ```

{{%/tab%}}

{{%tab name="Code Block"%}}

```shell
nginx -s reload
```

{{%/tab%}}
{{</tabs>}}