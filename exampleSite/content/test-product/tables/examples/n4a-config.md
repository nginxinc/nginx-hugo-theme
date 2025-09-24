---
title: NGINXaaS for Azure Config
weight: 50
type:
- how-to
---

## NGINX filesystem restrictions
NGINXaaS for Azure places restrictions on the instance's filesystem; only a specific set of directories are allowed to be read from and written to. Below is a table describing what directories the NGINX worker process can read and write to and what directories files can be written to. These files include certificate files and any files uploaded to the deployment, excluding NGINX configuration files.

{{<bootstrap-table "table table-striped table-bordered">}}
  | Allowed Directory | NGINX worker process can read/write to | Files can be written to |
  |-------------------- | -------------------- | -------------------- |
  | /etc/nginx          |                      | {{< icon "check" >}} |
  | /opt                | {{< icon "check" >}} | {{< icon "check" >}} |
  | /srv                | {{< icon "check" >}} | {{< icon "check" >}} |
  | /tmp                | {{< icon "check" >}} |                      |
  | /var/cache/nginx    | {{< icon "check" >}} |                      |
  | /var/www            | {{< icon "check" >}} | {{< icon "check" >}} |
{{</bootstrap-table>}}

Attempts to access other directories will be denied and result in a `5xx` error.

## Disallowed configuration directives
Some directives are not supported because of specific limitations. If you include one of these directives in your NGINX configuration, you'll get an error.

  {{<bootstrap-table "table table-striped table-bordered">}}
  | Disallowed Directive | Reason |
  |------------------ | ----------------- |
  | ssl_engine        | No hardware SSL accelerator is available. |
  | debug_points        | NGINXaaS does not provide access to NGINX processes for debugging. |
  | fastcgi_bind <br /> grpc_bind  <br /> memcached_bind  <br /> proxy_bind  <br /> scgi_bind  <br /> uwsgi_bind   | Source IP specification for active-active deployments is not allowed.           |
  | quic_bpf          | QUIC connection migration is not currently supported for active-active deployments.  |

{{</bootstrap-table>}}

You may find that a few directives are not listed here as either allowed or disallowed. Our team is working on getting these directives supported soon.

## Directives that cannot be overridden
Some directives cannot be overridden by the user provided configuration.

  {{<bootstrap-table "table table-striped table-bordered">}}
  | Persistent Directive | Value | Reason |
  |------------------ | ----------------------- | -----------------|
  | `user` | `nginx` | The `nginx` user has the correct permissions for accessing certificates, policy files and other auxfiles. |
  | `worker_processes` | `auto` | Set to `auto` to automatically set `worker_processes` to the number of CPU cores. |
  | `worker_connections` |   <ul><li>Standard V2 plan `4000`</li><li>basic plan `3000`</li></ul> | To ensure reasonable performance of the NGINXaaS deployment for Standard V2 plan, the `worker_connections` is fixed at 400/NCU; for basic plan this is set lower. |
  | `pid` | `/run/nginx/nginx.pid` | Set to this value to allow NGINXaaS to automatically manage the NGINX master process. |
  | `daemon` | `on` | Automatically set to `on` to allow NGINXaaS to manage the NGINX master process. |
  | `master_process` | `on` | This directive is intended for NGINX developers. |
  | `worker_cpu_affinity` | `auto` | The value `auto` allows binding worker processes automatically to available CPUs based on the current capacity of the deployment. |

{{</bootstrap-table>}}
