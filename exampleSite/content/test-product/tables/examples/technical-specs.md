---
description: Platforms supported by F5 NGINX Plus and dynamically loaded modules,
  supported SSL/TLS versions, supported deployment environments, and list of modules
  built into NGINX Plus.
docs: DOCS-473
title: Technical Specs
weight: 400
type:
- concept
---


{{<bootstrap-table "table table-striped table-bordered">}}
| Distribution                        | Supported on R34                                   | Supported on R33                                       |
|-------------------------------------|----------------------------------------------------|--------------------------------------------------------|
| AlmaLinux                           | 8 (x86_64, aarch64) <br> 9 (x86_64, aarch64)       | 8 (x86_64, aarch64) <br> 9 (x86_64, aarch64)           |
| Alpine Linux                        | 3.18 (x86_64, aarch64) **(deprecated)** <br> 3.19 (x86_64, aarch64) <br> 3.20 (x86_64, aarch64) <br> 3.21 (x86_64, aarch64) **(new)** | 3.17 (x86_64, aarch64) **(deprecated)** <br> 3.18 (x86_64, aarch64) <br> 3.19 (x86_64, aarch64) <br> 3.20 (x86_64, aarch64) **(new)** |
| Amazon Linux                        | 2023 (x86_64, aarch64)                             | 2023 (x86_64, aarch64)                                 |
| Amazon Linux 2                      | LTS (x86_64, aarch64)                              | LTS (x86_64, aarch64)                                  |
| Debian                              | 11 (x86_64, aarch64) <br> 12 (x86_64, aarch64)     | 11 (x86_64, aarch64) <br> 12 (x86_64, aarch64)         |
| FreeBSD                             | 13 (amd64) <br> 14 (amd64)                         | 13 (amd64) <br> 14 (amd64)                             |
| Oracle Linux                        | 8.1+ (x86_64, aarch64) <br> 9 (x86_64)             | 8.1+ (x86_64, aarch64) <br> 9 (x86_64)                 |
| Red Hat Enterprise Linux (RHEL)     | 8.1+ (x86_64, aarch64) <br> 9.0+ (x86_64, aarch64) | 8.1+ (x86_64, aarch64) <br> 9.0+ (x86_64, aarch64)     |
| Rocky Linux                         | 8 (x86_64, aarch64) <br> 9 (x86_64, aarch64)       | 8 (x86_64, aarch64) <br> 9 (x86_64, aarch64)           |
| SUSE Linux Enterprise Server (SLES) | 15 SP2+ (x86_64)                                   | 12 SP5 (x86_64) **(deprecated)** <br> 15 SP2+ (x86_64) |
| Ubuntu                              | 20.04 LTS (x86_64, aarch64) **(deprecated)** <br> 22.04 LTS (x86_64, aarch64) <br> 24.04 LTS (x86_64, aarch64) | 20.04 LTS (x86_64, aarch64) <br> 22.04 LTS (x86_64, aarch64) <br> 24.04 LTS (x86_64, aarch64) |
{{</bootstrap-table>}}


## Dynamic Modules

Dynamic modules are supported on the [same distributions as NGINX Plus](#supported-distributions), unless noted otherwise in the table below.

{{<bootstrap-table "table table-striped table-bordered">}}
| Module           | Distribution and details                                                                                   |
|-------------------|-----------------------------------------------------------------------------------------------------------|
| AppProtect        | AlmaLinux/Rocky Linux: **Not supported**<br>Alpine Linux: **Not supported**<br>Amazon Linux 2: **x86_64 only**<br>Amazon Linux 2023: **Not supported**<br>Debian 11: **x86_64 only**<br>FreeBSD: **Not supported**<br>Oracle Linux 8: **x86_64 only**<br>RHEL 8: **x86_64 only**<br>SLES: **Not supported**<br>Ubuntu 20.04: **x86_64 only** |
| GeoIP             | Amazon Linux 2023  **Not supported**<br>RHEL/Oracle Linux/AlmaLinux/Rocky Linux 8.0+, 9: **Not supported**<br>FreeBSD: **Not supported**           |
| GeoIP2            | Amazon Linux 2: **Not supported**                                            |
| HA-Keepalived     | FreeBSD: **Not supported**<br>Alpine Linux: **Not supported**<br>Amazon Linux 2: **Not supported**<br>Amazon Linux 2023: **Not supported** |
| NGINX sync        | FreeBSD: **Not supported**<br>Alpine Linux: **Not supported**                                              |
| OpenTelemetry     | Amazon Linux 2: **Not supported**<br>SLES: **Not supported**                                               |                                                                                |
{{</bootstrap-table>}}

---