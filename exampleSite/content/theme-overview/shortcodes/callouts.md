---
description: Callouts
title: Callouts
toc: true
---

Callouts are Hugo shortcodes used to visually highlight supplementary, important, or high-risk information without disrupting the primary content flow.

## Plain

These are the main callout types that may be used to bring attention to a section of text. The callouts can be rendered in the center of the body or [on the side](#side).

### Basic
The most basic callout wraps a "box" around text.

``` go-html-template
{{</*call-out*/>}}
This is a plain callout with no title. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<call-out>`.
{{</*/call-out*/>}}
```

{{<call-out>}}
This is a plain callout with no title. It has a [link](#plain-callouts) to a heading on this page.
{{</call-out>}}

### Custom title
A title can be added with the `title` parameter

``` go-html-template
{{</*call-out title="Custom Title"*/>}}
This is a plain callout with title.
{{</*/call-out*/>}}
```


{{<call-out title="Custom Title">}}
This is a plain callout with title.
{{</call-out>}}


## Side
All callout types can also be rendered to the _side_ using the `sideline="true"` parameter.

``` go-html-template
{{</*call-out sideline="true"*/>}}
This is a plain side callout with no title.
{{</*/call-out*/>}}
```

Naturally, callouts should contain less text within them than the text it lives next to. We do this for several reasons. Firstly, it looks weird to have a big empty space in the primary content area. Secondly, if you have more text in the callout, then it stops being a callout. I have asked an LLM to lengthen this passage.

{{<call-out sideline="true">}}
This is a plain side callout with no title.
{{</call-out>}}

## Important, but not urgent
This is a weird exception callout that adds just a little extra contrast to the callout.

``` go-html-template
{{</*call-out class="important"*/>}}
This is an important callout.
{{</*/call-out*/>}}
```

{{<call-out class="important">}}
This is an important callout.
{{</call-out>}}

## Loud

These callouts should be used sparingly: only when it is imperative to capture the user’s attention.

### Warning

``` go-html-template
{{</*call-out class="warning"*/>}}
This is a warning callout.
{{</*/call-out*/>}}
```

{{<call-out class="warning">}}
This is a warning callout.
{{</call-out>}}

### Caution

``` go-html-template
{{</*call-out class="caution"*/>}}
This is a caution callout.
This callout especially should be used VERY judiciously.
{{</*/call-out*/>}}
```

{{<call-out class="caution">}}
This is a caution callout.
This callout especially should be used VERY judiciously.
{{</call-out>}}


### Custom titles

Loud callouts also accept custom titles.

``` go-html-template
{{</*call-out class="caution" title="Custom Title"*/>}}
This is a caution callout with a custom title.
{{</*/call-out*/>}}
```

{{<call-out class="caution" title="Custom Title">}}
This is a caution callout with a custom title.
{{</call-out>}}