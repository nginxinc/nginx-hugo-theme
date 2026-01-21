---
description: Images
title: Images
toc: true
---

While [native markdown images](https://www.markdownguide.org/basic-syntax/#images-1) will work with this theme, we suggest you use our custom `img` shortcode, which provides more features.

The `img` shortcode supports the `grid` attribute.
The following values are supported:
- `wide`
- `last-third`
- `first-third`
- `first-two-thirds` (default)

``` go-template
{{</*img src="<imageSrc>" grid="<gridValue>"*/>}}
```


## Default

By default, and image will take up the `first-two-thirds` of the grid, allowing for call out content to its right.

``` go-template
{{</*img src="hero-graphic.webp"*/>}}

{{</*call-out sideline="true"*/>}}
Here is an example of a callout to the side of an image.
{{</*/call-out*/>}}

```

{{< img src="hero-graphic.webp">}}
{{<call-out sideline="true">}}
Here is an example of a callout to the side of an image.
{{</call-out>}}


## wide

Providing the "wide" option, will make the image take up the full grid.

``` go-template
{{</*img src="hero-graphic.webp" grid="wide"*/>}}
```

{{< img src="hero-graphic.webp" grid="wide">}}


## last-third

Providing the "last-third" option, will make the image take up the last third of the grid, similar to a side call out.
This makes it possible to place an image to the right of text.

``` go-template
{{</*img src="hero-graphic.webp" grid="last-third"*/>}}
```

{{< img src="hero-graphic.webp" grid="last-third">}}
