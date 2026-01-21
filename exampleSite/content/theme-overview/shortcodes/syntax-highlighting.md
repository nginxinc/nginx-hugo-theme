---
description: Syntax Highlighting
title: Syntax Highlighting
toc: true
---

See [hugo syntax highlighting](https://gohugo.io/content-management/syntax-highlighting/) for detailed instructions.

These examples are to help with theme design testing, their usage is standard markdown.

## Single line 

Wrap any text in a ` .

`console.log("hello world!")`

## Multi-line 

Wrap any text in \``` and \``` .

``` javascript
function helloWorld() {
  console.log("hello world!");
}

helloWorld();
```

## Line highlighting

All line highlighting is handled by passing options to the codeblocks

### Example with highlighting one line

Here, we also have `lineos` set to false, so line numbers are not shown.

`hcl {linenos=false,hl_lines=[2]}`


```hcl {linenos=false,hl_lines=[2]}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```

### Example with highlighting multiple consecutive lines (2-4)

`hcl {linenos=true,hl_lines="2-4"}`


```hcl {linenos=true,hl_lines="2-4"}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```

### Example with highlighting multiple non-consecutive lines

`hcl {linenos=true,hl_lines=[2,4,6]}`

```hcl {linenos=true,hl_lines=[2,4,6]}
resource "azurerm_nginx_certificate" "cert1" {
  name                     = "examplecert"
  nginx_deployment_id      = azurerm_nginx_deployment.test.id
  key_virtual_path         = "/src/cert/soservermekey.key"
  certificate_virtual_path = "/src/cert/server.cert"
  key_vault_secret_id      = azurerm_key_vault_certificate.test.secret_id
}
```