---
description: Choose Upstream
title: Choose Upstream
weight: 100
---

In this example, when a client sends a request to the `/` endpoint, NGINX calls the `chooseUpstream` function. This function reads the token from the request's query string and then selects the appropriate backend server based on the token's value. If the token does not match a known value, the function returns a 404 error.

```nginx
load_module modules/ngx_http_js_module.so;

http {
    js_import choose_upstream.js;

    server {
        listen 80;

        location /secure/ {
            auth_request /fetch_upstream;
            auth_request_set $backend $upstream_http_x_backend;

            proxy_pass http://$backend;
        }

        location /fetch_upstream {
            internal;

            proxy_pass http://127.0.0.1:8079;
            proxy_pass_request_body off;
            proxy_set_header Content-Length "";
            proxy_set_header X-Original-URI $request_uri;
        }

    }

    server {
        listen 127.0.0.1:8079;

        location / {
            js_content main.chooseUpstream;
        }

    }

    server {
        listen 127.0.0.1:8081;
        return 200 "BACKEND A:$uri\n";
    }

    server {
        listen 127.0.0.1:8082;
        return 200 "BACKEND B:$uri\n";
    }

}
```


{{< njs-playground exampleNJS=chooseUpstream.js fnName=chooseUpstream >}}