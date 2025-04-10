---
description: Echo Server
title: Echo Server
weight: 100
---

This example shows how to create a simple echo endpoint. The client sends a request to the `/echo` endpoint, which calls the `echo` njs function. By default, this function returns the request details received by NGINX in JSON format.

```nginx
load_module modules/ngx_http_js_module.so;

events {}

http {
    js_import http.js;

    server {
        listen 8000;

        location /echo {
            js_content http.echo;
        }
    }
}
```


{{< njs-playground exampleNJS=echo.js fnName=echo >}}