---
description: Code Blocks - Huge codeblocks
title: Huge codeblock
weight: 300
---

## nginx conf sample

```nginx
# Global Configuration
user nginx;
worker_processes auto;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    keepalive_timeout 65;

    # Standalone IP addresses for upstream definitions
    upstream backend {
        server 192.168.0.1:8080;  # IP address without a port
        server 192.168.0.2;  # Another standalone IP
        server 10.0.0.1 max_fails=2 fail_timeout=10s; # Failover setup
    }

    # Proxy settings
    server {
        listen 80;
        server_name www.example.com;

        root /usr/share/nginx/html;

        location /api/ {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass http://192.168.1.100;  # Proxying to an IP without a port
        }

        location /images/ {
            root /img;
            autoindex on;
        }
    }

    # ACL with standalone IP ranges
    acl_list {
        allow 192.168.1.0;     # Specific single IP without port
        allow 192.168.0.0/16;  # IP range without ports
        deny 10.1.0.1;         # Single forbidden IP
    }

    # Static file serving with regex
    location ~* \.(gif|png|jpg|jpeg)$ {
        expires 30d;
        access_log off;
    }

    # Standalone IPs used for error logging
    error_log /var/log/nginx/error.log warn;
    error_log 192.168.1.200;  # Logs sent to external IP
}
```