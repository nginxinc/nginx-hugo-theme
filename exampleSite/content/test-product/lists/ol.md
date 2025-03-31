---
description: List - OL
title: List - OL
---

The following list describes the connections, preceeded by their types in parentheses. For brevity, the suffix "process" has been omitted from the process descriptions.

1. (HTTPS)
   - Read: _NGF_ reads the _Kubernetes API_ to get the latest versions of the resources in the cluster.
   - Write: _NGF_ writes to the _Kubernetes API_ to update the handled resources' statuses and emit events. If there's more than one replica of _NGF_ and [leader election](https://github.com/nginx/nginx-gateway-fabric/tree/v/charts/nginx-gateway-fabric#configuration) is enabled, only the _NGF_ pod that is leading will write statuses to the _Kubernetes API_.
1. (HTTP, HTTPS) _Prometheus_ fetches the `controller-runtime` and NGINX metrics via an HTTP endpoint that _NGF_ exposes (`:9113/metrics` by default). Prometheus is **not** required by NGINX Gateway Fabric, and its endpoint can be turned off.
1. (File I/O)
   - Write: _NGF_ generates NGINX _configuration_ based on the cluster resources and writes them as `.conf` files to the mounted `nginx-conf` volume, located at `/etc/nginx/conf.d`. It also writes _TLS certificates_ and _keys_ from [TLS secrets](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) referenced in the accepted Gateway resource to the `nginx-secrets` volume at the path `/etc/nginx/secrets`.
   - Read: _NGF_ reads the PID file `nginx.pid` from the `nginx-run` volume, located at `/var/run/nginx`. _NGF_ extracts the PID of the nginx process from this file in order to send reload signals to _NGINX master_.
1. (File I/O) _NGF_ writes logs to its _stdout_ and _stderr_, which are collected by the container runtime.
1. (HTTP) _NGF_ fetches the NGINX metrics via the unix:/var/run/nginx/nginx-status.sock UNIX socket and converts it to _Prometheus_ format used in #2.
1. (Signal) To reload NGINX, _NGF_ sends the [reload signal](https://nginx.org/en/docs/control.html) to the **NGINX master**.
1. (File I/O)
   - Write: The _NGINX master_ writes its PID to the `nginx.pid` file stored in the `nginx-run` volume.
   - Read: The _NGINX master_ reads _configuration files_ and the _TLS cert and keys_ referenced in the configuration when it starts or during a reload. These files, certificates, and keys are stored in the `nginx-conf` and `nginx-secrets` volumes that are mounted to both the `nginx-gateway` and `nginx` containers.
1. (File I/O)
   - Write: The _NGINX master_ writes to the auxiliary Unix sockets folder, which is located in the `/var/run/nginx`
     directory.
   - Read: The _NGINX master_ reads the `nginx.conf` file from the `/etc/nginx` directory. This [file](https://github.com/nginx/nginx-gateway-fabric/blob/v/internal/mode/static/nginx/conf/nginx.conf) contains the global and http configuration settings for NGINX. In addition, _NGINX master_ reads the NJS modules referenced in the configuration when it starts or during a reload. NJS modules are stored in the `/usr/lib/nginx/modules` directory.
1. (File I/O) The _NGINX master_ sends logs to its _stdout_ and _stderr_, which are collected by the container runtime.
1. (File I/O) An _NGINX worker_ writes logs to its _stdout_ and _stderr_, which are collected by the container runtime.
1. (Signal) The _NGINX master_ controls the [lifecycle of _NGINX workers_](https://nginx.org/en/docs/control.html#reconfiguration) it creates workers with the new configuration and shutdowns workers with the old configuration.
1. (HTTP) To consider a configuration reload a success, _NGF_ ensures that at least one NGINX worker has the new configuration. To do that, _NGF_ checks a particular endpoint via the unix:/var/run/nginx/nginx-config-version.sock UNIX socket.
1. (HTTP, HTTPS) A _client_ sends traffic to and receives traffic from any of the _NGINX workers_ on ports 80 and 443.
1. (HTTP, HTTPS) An _NGINX worker_ sends traffic to and receives traffic from the _backends_.




## Regular OL

1. (File I/O) _NGF_ writes logs to its _stdout_ and _stderr_, which are collected by the container runtime.
1. (HTTP) _NGF_ fetches the NGINX metrics via the unix:/var/run/nginx/nginx-status.sock UNIX socket and converts it to _Prometheus_ format used in #2.
1. (Signal) To reload NGINX, _NGF_ sends the [reload signal](https://nginx.org/en/docs/control.html) to the **NGINX master**.
