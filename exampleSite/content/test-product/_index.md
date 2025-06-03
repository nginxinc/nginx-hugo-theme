---
description: Test pages for nginx-hugo-theme
title: Test pages
weight: 100
hasCustomContent: true
---
{{< card-layout >}}
  <!-- If there is no "title" for <card-section>, it is implied it is the main content section and not a new content section -->
  {{< card-section >}}
    {{< card title="Call Out usages" >}}
      Examples for <call-out> shortcode
    {{</ card >}}
    {{< card title="Code Block usages" >}}
      Examples for codeblock shortcode
    {{</ card >}}
  {{</ card-section >}}

  # Other Products on ExampleSite
  {{< card-section title="NGINX" showAsCards="true" >}}
    {{< card title="NGINX Plus" titleUrl="/nginx/" >}}
      Installing NGINX
    {{</ card >}}
  {{</ card-section >}}
{{</ card-layout >}}