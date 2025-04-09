---
description: Echo Server
title: Echo Server
weight: 100
---

## Basic Example
To use njs in nginx:
- [install](https://nginx.org/en/docs/njs/install.html) njs scripting language
- create an njs script file, for example, http.js. See [reference](Reference) for the list of njs properties and methods.

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


{{< njs-playground exampleRequest=exampleRequestEcho.js exampleNJS=echo.js fnName=echo >}}