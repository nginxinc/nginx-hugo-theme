---
title: Shortcode usage
toc: true
---
This page demonstrates the `shortcode-usage` shortcode.

The usage is as follows:
``` go-html-template
{{</* shortcode-usage name="include" */>}}
{{</* shortcode-usage name="icon" */>}}
{{</* shortcode-usage name="call-out" */>}}
```
`shortcode-usage` uses regex to parse the shortcode name and attributes. The output shows usages grouped by shortcode name, and sorted by the number of usages.

{{< shortcode-usage name="include" >}}
{{< shortcode-usage name="icon" >}}
{{< shortcode-usage name="call-out" >}}
