---
description: Code Blocks - highlighting
title: Highlighting 
weight: 200
---

{{<warning>}}
There is an option to use the `highlight` shortcode from Hugo but we have disabled that feature as it is redundant to using ticks. All usage will throw an error in the Hugo build.
{{</warning>}}

## Example with highlighting one line
```hcl {linenos=false,hl_lines=[16]}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```

## Example with highlighting multiple consecutive lines (2-4)
```hcl {linenos=true,hl_lines="2-4"}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```
{{<call-out "side-callout" "Note">}}
Values you can use for `hl_lines` are all non-zero positive integers. If you include a line number in `hl_lines` that does not exist (e.g. `16` in this example), it will highlight until the end.
{{</call-out>}}

## Example with highlighting multiple non-consecutive lines
```hcl {linenos=true,hl_lines=[2,4,6]}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```