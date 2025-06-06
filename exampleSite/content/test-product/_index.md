---
description: Test pages for nginx-hugo-theme
title: Test pages
weight: 100
hasCustomContent: true
---
<!-- <card-layout> - Available params: title (required: string)-->
{{< card-layout >}}
  <!-- <card-section> - Available params: title (required: string), showAsCards (optional: boolean, default false) -->
  <!-- If there is no "title" for <card-section>, it is implied it is the main content section and not a new content section -->
  {{< card-section >}}
    {{< card title="Call Out usages" >}}
      <!-- <card> - Available params: title (required: string), titleUrl (optional: string, relative path or absolute URL (e.g. https://google.com)) -->
      Examples for call-out shortcode
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