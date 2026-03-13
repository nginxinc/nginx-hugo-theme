---
title: "Data Tables"
weight: 500
toc: true
---

## Overview

The `data-table` shortcode renders tables from JSON, CSV, or YAML data files stored in the `assets/` directory.
Tables are fully rendered at build time as static HTML.
Setting `interactive="true"` progressively enhances the table with client-side column sorting -- without JavaScript, the table remains fully readable.

---

## Parameters

{{< data-table path="/data/data-table-params.csv" variant="wide" >}}

---

## Data formats

Place data files anywhere inside your project's `assets/` directory. The `path` parameter is relative to `assets/` and conventionally starts with a `/` (e.g., `/data/endpoints.json`).

### JSON

An array of objects. Keys become column headers, transformed with `humanize` and `title` by default (e.g., `rate_limit` becomes "Rate Limit"). Columns are sorted **alphabetically** -- use the `columns` parameter to control display order.

```json
[
  { "endpoint": "/api/v1/users", "method": "GET", "status": "stable" },
  { "endpoint": "/api/v1/groups", "method": "POST", "status": "beta" }
]
```

### CSV

Standard CSV with a header row. Headers are used exactly as written -- no transformation is applied. Columns appear in file order. Quoted fields with commas and escaped quotes are handled per RFC 4180.

```text
Endpoint,Method,Status
/api/v1/users,GET,stable
/api/v1/groups,POST,beta
```

### YAML

An array of objects, same structure as JSON. Keys are transformed and sorted the same way.

```yaml
- endpoint: /api/v1/users
  method: GET
  status: stable
- endpoint: /api/v1/groups
  method: POST
  status: beta
```

---

## Examples

### Static table (default)

The simplest usage -- renders all columns from a JSON file as a static table. Columns appear in alphabetical order.

```text
{{</* data-table path="/data/api-endpoints.json" */>}}
```

{{< data-table path="/data/api-endpoints.json" >}}

### Selecting columns and controlling order

Use `columns` to choose which columns to display, in the exact order listed. This is especially useful for JSON and YAML sources where the default order is alphabetical.

```text
{{</* data-table path="/data/api-endpoints.json" columns="status,endpoint,method" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="status,endpoint,method" >}}

### Hiding columns

Use `hide` to remove specific columns while keeping all others in their default order. If both `columns` and `hide` are set, `columns` is applied first, then `hide` removes from that subset.

```text
{{</* data-table path="/data/api-endpoints.json" hide="auth,rate_limit" */>}}
```

{{< data-table path="/data/api-endpoints.json" hide="auth,rate_limit" >}}

### Overriding column headers

Use `labels` to override auto-generated headers. The format is `key:Display Label` pairs, comma-separated. Unescaped colons in label values are preserved (e.g., `key:Prefix: Suffix` produces the label "Prefix: Suffix").

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,rate_limit" labels="endpoint:API Path,rate_limit:Rate Limit (req/min)" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,rate_limit" labels="endpoint:API Path,rate_limit:Rate Limit (req/min)" >}}

### Raw keys (humanize disabled)

Set `humanize="false"` to display JSON/YAML keys verbatim instead of applying humanize and title case. This has no effect on CSV sources, which always use headers as-is.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" humanize="false" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" humanize="false" >}}

### CSV source

CSV headers appear exactly as written in the file.

```text
{{</* data-table path="/data/release-matrix.csv" */>}}
```

{{< data-table path="/data/release-matrix.csv" >}}

### Narrow variant

Use `variant="narrow"` to constrain the table to two-thirds of the content area.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" variant="narrow" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" variant="narrow" >}}

### Borderless theme

Use `theme="borderless"` for a clean, minimal table without borders or row striping.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" theme="borderless" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" theme="borderless" >}}

### Static sort

Use `sort` to order rows at build time. This works on static tables without `interactive`.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" sort="endpoint:desc" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" sort="endpoint:desc" >}}

### Sortable table

Add `interactive="true"` to enable clickable column headers. Click a header to sort ascending; click again for descending.

```text
{{</* data-table path="/data/api-endpoints.json" interactive="true" */>}}
```

{{< data-table path="/data/api-endpoints.json" interactive="true" >}}

### Sortable with a default sort

Combine `sort` with `interactive="true"` to set the initial sort column and direction. The sort indicator will reflect the initial state.

```text
{{</* data-table path="/data/release-matrix.csv" interactive="true" sort="Version:desc" */>}}
```

{{< data-table path="/data/release-matrix.csv" interactive="true" sort="Version:desc" >}}

### Borderless with sorting

Combine `theme="borderless"` with `interactive="true"` for a minimal sortable table.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" theme="borderless" interactive="true" sort="endpoint:asc" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" theme="borderless" interactive="true" sort="endpoint:asc" >}}

### Markdown in cells

Set `markdownify="true"` to process cell values as markdown. Bold, italic, links, and inline code all render as formatted text.

```text
{{</* data-table path="/data/edge-cases.json" columns="markdown,normal" markdownify="true" */>}}
```

{{< data-table path="/data/edge-cases.json" columns="markdown,normal" markdownify="true" >}}

{{< caution >}}
Enabling `markdownify` also causes raw HTML in data values to be rendered as HTML, not escaped. Only use this with trusted data sources.
{{< /caution >}}

---

## Special characters

If your column names contain commas or colons, use `\,` and `\:` escape sequences in the `columns`, `hide`, `labels`, and `sort` parameters.

### Selecting columns with special characters

```text
{{</* data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" */>}}
```

{{< data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" >}}

### Label overrides with special characters

Escape sequences work in both the key and value portions of `labels`.

```text
{{</* data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" labels="col\:with\:colons:Colons\: In Key,col\,with\,commas:Commas\, In Key,normal:Just Normal" */>}}
```

{{< data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" labels="col\:with\:colons:Colons\: In Key,col\,with\,commas:Commas\, In Key,normal:Just Normal" >}}

### Sorting and hiding with special characters

```text
{{</* data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" interactive="true" sort="col\:with\:colons:desc" */>}}
```

{{< data-table path="/data/edge-cases.json" columns="col\:with\:colons,col\,with\,commas,normal" interactive="true" sort="col\:with\:colons:desc" >}}

```text
{{</* data-table path="/data/edge-cases.json" hide="col\:with\:colons,col\,with\,commas" */>}}
```

{{< data-table path="/data/edge-cases.json" hide="col\:with\:colons,col\,with\,commas" >}}

---

## Limitations

- **Plain text by default.** Cell values are rendered as escaped plain text. Markdown syntax, HTML tags, and shortcode invocations appear as literal strings. Set `markdownify="true"` to opt in to markdown processing.
- **No per-column markdownify.** The `markdownify` flag applies to all cells. There is no way to enable it for individual columns.
- **Column ordering.** JSON and YAML columns are sorted alphabetically. Use `columns` to set a specific order. CSV columns always follow file order.
- **Missing values.** If a JSON or YAML row is missing a key that other rows define, the cell renders as empty.
