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

Place data files anywhere inside your project's `assets/` directory. The `path` parameter is relative to `assets/`.

### JSON

An array of objects. Keys become column headers, transformed with `humanize` and `title` (e.g., `rate_limit` becomes "Rate Limit").

```json
[
  { "endpoint": "/api/v1/users", "method": "GET", "status": "stable" },
  { "endpoint": "/api/v1/groups", "method": "POST", "status": "beta" }
]
```

### CSV

Standard CSV with a header row. **Headers are used exactly as written** -- no transformation is applied.

```text
Endpoint,Method,Status
/api/v1/users,GET,stable
/api/v1/groups,POST,beta
```

### YAML

An array of objects, same structure as JSON. Keys are transformed the same way as JSON.

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

The simplest usage -- renders all columns from a JSON file as a static table.

```text
{{</* data-table path="/data/api-endpoints.json" */>}}
```

{{< data-table path="/data/api-endpoints.json" >}}

### Selecting columns

Use `columns` to show only specific columns, in the order listed.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" >}}

### Hiding columns

Use `hide` to remove specific columns while keeping all others.

```text
{{</* data-table path="/data/api-endpoints.json" hide="auth,rate_limit" */>}}
```

{{< data-table path="/data/api-endpoints.json" hide="auth,rate_limit" >}}

### Overriding column headers

Use `labels` to override auto-generated headers. The format is `key:Display Label` pairs, comma-separated.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,rate_limit" labels="rate_limit:Throttle" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,rate_limit" labels="rate_limit:Throttle" >}}

### Narrow variant

Use `variant="narrow"` to constrain the table to two-thirds width.

```text
{{</* data-table path="/data/api-endpoints.json" columns="endpoint,method,status" variant="narrow" */>}}
```

{{< data-table path="/data/api-endpoints.json" columns="endpoint,method,status" variant="narrow" >}}

### CSV source

CSV headers appear exactly as written in the file.

```text
{{</* data-table path="/data/release-matrix.csv" */>}}
```

{{< data-table path="/data/release-matrix.csv" >}}

### Sortable table

Add `interactive="true"` to enable clickable column headers. Click a header to sort ascending; click again for descending.

```text
{{</* data-table path="/data/api-endpoints.json" interactive="true" */>}}
```

{{< data-table path="/data/api-endpoints.json" interactive="true" >}}

### Sortable with a default sort

Use `sort` to set the initial sort column. Append `:asc` or `:desc` for direction (default is ascending).

```text
{{</* data-table path="/data/release-matrix.csv" interactive="true" sort="Version:desc" */>}}
```

{{< data-table path="/data/release-matrix.csv" interactive="true" sort="Version:desc" >}}
