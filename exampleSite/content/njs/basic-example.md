---
description: Basic Example
title: Basic Example
weight: 100
---


To use njs in nginx:
- [install](https://nginx.org/en/docs/njs/install.html) njs scripting language


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


{{< njs-playground exampleNJS=greet.js fnName=hello >}}