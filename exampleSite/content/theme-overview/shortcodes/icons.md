---
description: Icons 
title: Icons
toc: true
---
The `icon` shortcode is used to render icons.

{{<icon "cat">}}
{{<icon "dog">}}
{{<icon "fish">}}

This theme currently uses [Lucide Icons](https://lucide.dev/) for it's icons.
You can find all the icon names in the [Lucide Icons List](https://lucide.dev/icons/).

## Icon usage

Once you find the icon name you need, you must provide it as the default attribute to the `icon` shortcode. See the examples in the following sections.

## Within text

To render the "book-headphones" icon on the end of this sentence {{<icon "book-headphones">}}:

``` go-html-template
{{</*icon "book-headphones"*/>}}
```
## Within a link

Or as part of a link to [http.cat - {{<icon "cat">}}](https://http.cat/):

``` go-html-template
[http.cat - {{</*icon "cat"*/>}}](https://http.cat/)
```

## Edge cases

These test that icons render correctly in contexts where Goldmark's
line-based parsing is sensitive to newlines in shortcode output.

### Icon in a heading

#### Settings {{<icon "settings">}} page

#### {{<icon "rocket">}} Launch sequence

### Icon in a table

| Feature | Status | Icon |
|---------|--------|------|
| Search | Done | {{<icon "search">}} |
| Upload | Pending | {{<icon "upload">}} |
| Alerts | Active | {{<icon "bell">}} |

### Multiple icons in a heading

#### {{<icon "shield">}} Security {{<icon "lock">}} settings

### Icon in bold / italic

This is **bold with {{<icon "star">}} icon** and *italic with {{<icon "heart">}} icon*.