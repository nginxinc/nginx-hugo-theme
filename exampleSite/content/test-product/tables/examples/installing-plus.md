---
description: Install and upgrade F5 NGINX Plus with step-by-step instructions for
  the base package and dynamic modules on all supported Linux distributions.
title: Installing NGINX Plus
weight: 100
---

## Install Dynamically Loadable Modules {#install_modules}

NGINX Plus functionality can be extended with dynamically loadable modules. They can be added or updated independently of the core binary, enabling powerful capabilities such as advanced security, traffic shaping, telemetry, embedded scripting, geolocation, and many more.

Dynamic modules are shared object files (`.so`) that can be loaded at runtime using the [`load_module`](https://nginx.org/en/docs/ngx_core_module.html#load_module) directive in the NGINX configuration.

 ### Types of dynamic modules

{{< bootstrap-table "table table-striped table-bordered" >}}
| Type                    | Description        | Distribution Method   | F5 NGINX Support|
|-------------------------|--------------------|-----------------------|-----------------|
| [NGINX-authored](#nginx-authored-dynamic-modules) | Developed and distributed by NGINX | Packaged binaries from `nginx-plus` official repo | Full support |
| [NGINX-certified Community](#nginx-certified-community-dynamic-modules) | Tested and distributed by NGINX | Packaged binaries from `nginx-plus` official repo | Installation and basic configuration support |
| [NGINX Certified Partner](#nginx-certified-partner-dynamic-modules) | Partner-built modules verified through [NGINX’s certification](https://www.f5.com/go/partner/nginx-certified-module-program-documentation) | Provided by partners | Provided by partners |
| [Community](#community-dynamic-modules) | Developed and distributed by third‑party contributors | [Self-compiled](#install_modules_oss) | No support|
{{< /bootstrap-table >}}

 ### NGINX-authored dynamic modules

NGINX-authored dynamic modules are developed and officially maintained by the F5 NGINX team. These modules are available as packaged binaries for various operating systems and can be installed [from the `nginx-plus` repository](#install-from-official-repository).

{{< bootstrap-table "table table-striped table-bordered" >}}
| Name                            | Description                       | Package name       |
|---------------------------------|-----------------------------------|--------------------|
| [GeoIP](https://nginx.org/en/docs/http/ngx_http_geoip_module.html) | Enables IP-based geolocation using the precompiled MaxMind databases. | [`nginx-plus-module-geoip`](#) |
| [Image-Filter](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html) | Adds on-the-fly support for JPEG, GIF, PNG, and WebP image resizing and cropping. | [`nginx-plus-module-image-filter`](#)                   |
| [njs Scripting Language](https://nginx.org/en/docs/njs/) | Adds JavaScript-like scripting for advanced server-side logic in NGINX configuration file. | [`nginx-plus-module-njs`](#) |
| [OpenTelemetry](https://github.com/nginxinc/nginx-otel) | Adds distributed tracing support via OpenTelemetry. | [`nginx-plus-module-otel`](#) |
| [Perl](https://nginx.org/en/docs/http/ngx_http_perl_module.html)| Integrates Perl scripting for advanced customization. | [`nginx-plus-module-perl`](#) |
| [XSLT](https://nginx.org/en/docs/http/ngx_http_xslt_module.html) | Applies XSLT transformations to XML responses. | [`nginx-plus-module-xslt`](#) |
{{< /bootstrap-table >}}

 ### NGINX-certified community dynamic modules

NGINX-certified community dynamic modules are popular third‑party modules tested and distributed by F5 NGINX, with installation and basic configuration support provided. They are also distributed as precompiled packages for various operating systems and can be installed [from the `nginx-plus` repository](#install-from-official-repository).

{{< bootstrap-table "table table-striped table-bordered" >}}
| Name                            | Description                       | Package name     |
|---------------------------------|-----------------------------------|--------------------|
| [Brotli](https://github.com/google/ngx_brotli) | Brotli compression support with modules for dynamic compression and for serving pre-compressed `.br` files. | [`nginx-plus-module-brotli`](#) |
| [Encrypted-Session](https://github.com/openresty/encrypted-session-nginx-module) | AES-256 based encryption/decryption of NGINX variables. | [`nginx-plus-module-encrypted-session`](#) |
| [FIPS Status Check](https://github.com/ogarrett/nginx-fips-check-module) | Verifies if OpenSSL is operating in FIPS mode. | [`nginx-plus-module-fips-check`](#)|
| [GeoIP2](https://github.com/leev/ngx_http_geoip2_module)  | Uses MaxMind GeoIP2 for enhanced geolocation. | [`nginx-plus-module-geoip2`](#)|
| [Headers-More](https://github.com/openresty/headers-more-nginx-module) | Extends the NGINX [Headers](https://nginx.org/en/docs/http/ngx_http_headers_module.html) module to modify request and response headers. | [`nginx-plus-module-headers-more`](#) |
| [HTTP Substitutions Filter](https://github.com/yaoweibin/ngx_http_substitutions_filter_module) | Enables regex and string-based substitutions in response bodies. | [`nginx-plus-module-subs-filter`](#) |
| [Lua](https://github.com/openresty/lua-nginx-module) | Embeds Lua programming language. | [`nginx-plus-module-lua`](#)|
| [NGINX Developer Kit](https://github.com/vision5/ngx_devel_kit) | Provides helper macros for module development. | [`nginx-plus-module-ndk`](#) |
| [Phusion Passenger](https://www.phusionpassenger.com/library/install/nginx/) | Application server for Node.js, Python, Ruby. | [`nginx-plus-module-passenger`](#) |
| [Prometheus-njs](https://github.com/nginx/nginx-prometheus-exporter) | Converts [NGINX Plus metrics](https://demo.nginx.com/swagger-ui/) into Prometheus format. | [`nginx-plus-module-prometheus`](#) |
| [RTMP](https://github.com/arut/nginx-rtmp-module) | Adds streaming capabilities (RTMP, HLS, MPEG-DASH, FFmpeg support).| [`nginx-plus-module-rtmp`](#) |
| [Set-Misc](https://github.com/openresty/set-misc-nginx-module) | Adds `set_*` directives for scripting (extend NGINX [Rewrite](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html) module). | [`nginx-plus-module-set-misc`](#) |
| [SPNEGO for Kerberos](https://github.com/stnoonan/spnego-http-auth-nginx-module) | Adds support for [GSS‑API based](https://www.rfc-editor.org/rfc/rfc2743) SPNEGO/Kerberos authentication. | [`nginx-plus-module-auth-spnego`](#) |
{{< /bootstrap-table >}}