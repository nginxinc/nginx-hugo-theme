
---
description: Callout - Code Blocks
title: Callout - Code Blocks
weight: 200
---


## Code Block Multi line with callout


Start the Docker container to connect it to NGINX One. Replace `YOUR_NGINX_ONE_DATA_PLANE_KEY_HERE` with your data plane key and `VERSION_TAG` with the version tag you pulled.

**For NGINX Plus R33 or later**:

- Use the `NGINX_LICENSE_JWT` variable to pass your JWT license. Replace `YOUR_JWT_HERE` with your JWT.

For more details, see About subscription licenses

```sh
sudo docker run \
--env=NGINX_LICENSE_JWT="YOUR_JWT_HERE" \
--env=NGINX_AGENT_SERVER_GRPCPORT=443 \
--env=NGINX_AGENT_SERVER_HOST=agent.connect.nginx.com \
--env=NGINX_AGENT_SERVER_TOKEN="YOUR_NGINX_ONE_DATA_PLANE_KEY_HERE" \
--env=NGINX_AGENT_TLS_ENABLE=true \
--restart=always \
--runtime=runc \
-d private-registry.nginx.com/nginx-plus/agent:<VERSION_TAG>
```

{{<call-out "" "Example:" "" >}}
To start the container with the `debian` image:

```sh
sudo docker run \
--env=NGINX_LICENSE_JWT="YOUR_JWT_HERE" \
--env=NGINX_AGENT_SERVER_GRPCPORT=443 \
--env=NGINX_AGENT_SERVER_HOST=agent.connect.nginx.com \
--env=NGINX_AGENT_SERVER_TOKEN="YOUR_NGINX_ONE_DATA_PLANE_KEY_HERE" \
--env=NGINX_AGENT_TLS_ENABLE=true \
--restart=always \
--runtime=runc \
-d private-registry.nginx.com/nginx-plus/agent:debian
```

{{</call-out>}}

## Code Block Single line


How to read load nginx config

```sh
nginx -s reload
```


