---
description: Table Variations
title: Table Variations
toc: true
---
### Plain markdown
A pure markdown table, will have the default attributes of `narrow` and `borderless`.

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary.                        |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

### Table with `table` shortcode

Wrapping a table with the `table` shortcode allows for the use of variant and theme.

The `variant` parameter can be set to `narrow` or `wide`, while the `theme` parameter can be set to `bordered` or `borderless`.

The default behaviour for `table` is `wide` and `bordered`.

``` go-html-template
{{</*table*/>}}

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary.                        |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

{{</*/table*/>}}
```

Results in the following table:

{{<table variant="wide" theme="bordered">}}

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary.                        |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

{{</table>}}

Or set to `{{</*table variant="wide" theme="borderless"*/>}}`:

{{<table variant="wide" theme="borderless">}}

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary.                       |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

{{</table>}}


Or set to `{{</*table variant="narrow" theme="bordered"*/>}}`:

{{<table variant="narrow" theme="bordered">}}

| Parameter                | Description                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------|
| `NODES`                  | List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary. List of peers that receive the configuration from the primary.                       |
| `CONFPATHS`              | List of files and directories to distribute from the primary to the peers.           |
| `EXCLUDE`                | (Optional) List of configuration files on the primary not to distribute to the peers.|

{{</table>}}
