---
description: Basic Example
title: Basic Example
weight: 100
---

In this example, the client sends a request to `/`, which calls the `hello` njs function. By default, the function returns status code `200` and the message `Hello World`.


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