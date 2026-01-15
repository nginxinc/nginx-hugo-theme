---
description: Tab Group
title: Tab Group
toc: true
---

Tab groups let you present related content—such as code examples, configurations, or platform-specific instructions—without duplicating text or overwhelming the page.

While tab groups can reduce repetition, overusing them can make content harder to read and navigate. Important information may become hidden behind tabs, forcing readers to click around to fully understand a topic. Use tab groups when the content is truly alternative or mutually exclusive—not when it should be read together.

## Usage 

_Most_ content can be rendered within a tab group, but we have seen bugs in the past with more complex elements. 

You need to "nest" shortcodes to use tab groups. A very basic example below has different text in each group.

### Basic

``` go-html-template
{{</* tabs name="number tab groups" */>}}

  {{</* tab name="Tab group 1" */>}}
    Tab group 1
  {{</* /tab */>}}

  {{</* tab name="Tab group 2" */>}}
    Tab group 2
  {{</* /tab */>}}

{{</* /tabs */>}}
```

{{< tabs name="number tab groups" >}}

  {{< tab name="Tab group 1" >}}
    Tab group 1
  {{< /tab >}}

  {{< tab name="Tab group 2" >}}
    Tab group 2
  {{< /tab >}}

{{< /tabs >}}


### Complicated components

When populated tab groups with short codes, whitespace is very important.

Shortcode syntax _must_ be in line with the tab shortcode itself to render properly.


{{<tabs name="complex tab groups" >}}

  {{%tab name="Syntax highlighting"%}}
  Here is a code block inside a tab group.

  ``` javascript
  console.log("This is an example code block in a tab group");
  ```
  {{%/tab %}}

  {{%tab name="Callout"%}}
  {{<call-out>}}
  This is an example of a callout in a tab group.
  {{</call-out>}}
  {{%/tab %}}

{{< /tabs >}}

{{<call-out class="info">}}
It seems to be impossible to render `%` style shortcodes in a codeblock. (A rendering hugo in a hugo code fence problem 😐).

Please click on "View Source" at the bottom of this page to see the above examples source code.
{{</call-out>}}