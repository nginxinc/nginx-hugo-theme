---
description: Everything
title: Everything
weight: 200
---

## before-you-begin

{{< before-you-begin >}}
Before you can set users' passwords, ensure you have [created users](#create-users) in NGINX Instance Manager. Once you've created the users, you can use one of the following options to set their passwords.
{{< /before-you-begin >}}

## bootstrap-table

{{<bootstrap-table "table">}}
| Method | Endpoint                                                            |
|--------|---------------------------------------------------------------------|
| GET    | `/api/platform/v1/systems/{systemUID}/instances`                    |
| POST   | `/api/platform/v1/security/{systemUID}/instances/{nginxUID}/config` |
{{</bootstrap-table>}}

## call-out

{{<call-out "tip" "Enhanced templating with Sprig">}}
<i class="fas fa-code-branch"></i>
 Go templating in Instance Manager includes support for the [Sprig function library](https://masterminds.github.io/sprig/), offering a wide range of additional functions that can be used in templates for advanced operations like string manipulation, data conversion, mathematics, and more.
 {{</call-out>}}

 ## caution

 {{<caution>}}
Enabling logs using the **NGINX Logs** blade on your NGINXaaS deployment is now deprecated. This feature will be removed in an upcoming update. If you have issues accessing your NGINX logs using the deprecated method, please follow the steps in this guide to access your NGINX logs.
{{</caution>}}


## comment

This one literally stops the contents being rendered... It's for markdown comments.
{{<comment>}}
This won't render anything.
{{</comment>}}

## deprecated

{{< deprecated >}}Using the helper.sh script to download your NGINX Plus certificate and key bundle is deprecated in in NGINX Controller v3.9.{{< /deprecated >}}

## download

{{< download "ngf/grafana-dashboard.json" "ngf-grafana-dashboard.json" >}}

## img

{{< img src="hero-graphic.webp" caption="hero-graphic" width="50%">}}

## important

{{< important >}}If the fingerprint is different, remove the file.{{< /important >}}

## include

{{< include "nginx-openid-repo-note.txt" >}}

## see-also

{{< see-also >}}See also!{{< /see-also >}}

