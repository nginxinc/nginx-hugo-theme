---
title: Redocly
f5-api-reference: "./api/example.json"
toc: true
---

## f5-api-reference

To render an OpenAPI specification using Redocly, you need to include the `f5-api-reference` front matter field, with a reference to an OpenAPI spec file.

The front matter of this page is:

``` yml
---
title: Redocly
f5-api-reference: "./api/example.json"
---
```

`./api/example.json` can be found in the static folder of the exampleSite content directory ([example.json](https://github.com/nginxinc/nginx-hugo-theme/blob/main/exampleSite/static/api/example.json)).


{{<call-out title="Note">}}
The redocly instance __always__ renders at the bottom of the content.
{{</call-out>}}


## API Specification
