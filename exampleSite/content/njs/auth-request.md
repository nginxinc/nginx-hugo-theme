---
description: Auth Request
title: Auth Request
weight: 100
---

In this example, when a client sends a request to the `/auth` endpoint, NGINX calls the `choose_upstream` function. This function reads the token from the request's query string and then selects the appropriate backend server based on the token's value. If the token does not match a known value, the function returns a 404 error.

```nginx
load_module modules/ngx_http_js_module.so;

events {}

http {
    js_import http.js;

    server {
        listen 8000;

        location /auth {
            js_content http.auth;
        }
    }
}
```


{{< njs-playground exampleNJS=auth_request.js fnName=choose_upstream >}}