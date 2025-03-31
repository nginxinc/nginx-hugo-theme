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


## Much nested tab group
To configure a CA cert and/or client certificate and key, a few extra steps are needed.

First, you need to create two Secrets in the `nginx-gateway` namespace. The CA must live under the key `ca.crt`:

```shell
kubectl -n nginx-gateway create secret generic nim-ca --from-file ca.crt
```

The client cert and key must be added to a TLS Secret:

```shell
kubectl -n nginx-gateway create secret tls nim-client --cert /path/to/cert --key /path/to/key
```

{{<tabs name="nim-secret-install">}}

{{%tab name="Manifests"%}}

Specify the CA Secret name in the `--usage-report-ca-secret` command-line flag on the `nginx-gateway` container. Specify the client Secret name in the `--usage-report-client-ssl-secret` command-line flag on the `nginx-gateway` container.

You also need to define the proper volume mount to mount the Secrets to the nginx container. Add the following volume to the Deployment:

```yaml
- name: nginx-plus-usage-certs
  projected:
    sources:
      - secret:
          name: nim-ca
      - secret:
          name: nim-client
```

and the following volume mounts to the `nginx` container:

```yaml
- mountPath: /etc/nginx/certs-bootstrap/
  name: nginx-plus-usage-certs
```

Finally, in the `nginx-includes-bootstrap` ConfigMap, add the following lines to the `mgmt` block:

```text
ssl_trusted_certificate /etc/nginx/certs-bootstrap/ca.crt;
ssl_certificate        /etc/nginx/certs-bootstrap/tls.crt;
ssl_certificate_key    /etc/nginx/certs-bootstrap/tls.key;
```

{{% /tab %}}

{{%tab name="Helm"%}}

Specify the CA Secret name using the `nginx.usage.caSecretName` helm value. Specify the client Secret name using the `nginx.usage.clientSSLSecretName` helm value.

{{% /tab %}}

{{</tabs>}}
