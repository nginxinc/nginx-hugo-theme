---
description: Echo Server
title: Echo Server
weight: 100
---

This example demonstrates how to create a simple echo endpoint.  
The endpoint returns the details of the request sent to NGINX as JSON.  

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