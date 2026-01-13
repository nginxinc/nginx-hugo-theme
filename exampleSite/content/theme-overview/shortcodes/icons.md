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