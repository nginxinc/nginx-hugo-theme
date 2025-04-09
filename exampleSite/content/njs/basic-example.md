---
description: Basic Example
title: Basic Example
weight: 100
---


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

        location / {
            js_content http.hello;
        }
    }
}
```


{{< njs-playground exampleRequest=exampleRequest.js exampleNJS=greet.js fnName=hello >}}