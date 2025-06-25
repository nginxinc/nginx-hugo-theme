---
description: Test pages for nginx-hugo-theme
title: Test pages
weight: 100
nd-landing-page: true
---
{{<card-layout>}}
  {{<card-section showAsCards="true">}}
    {{<card title="Everything" titleUrl="everything" icon="circle-dot-dashed">}}
      All shortcodes in one page.
    {{</card >}}
    {{<card title="Call Out usages" titleUrl="call-out/all-callouts/" icon="message-square">}}
      <!-- <card> - Available params: title (required: string), titleUrl (optional: string, relative path or absolute URL (e.g. https://google.com)), icon (optional: string, pulled from lucide), brandIcon (optional: string, takes priority over icon if provided) -->
      Examples for call-out shortcode
    {{</card >}}
    {{<card title="Code Block usages" titleUrl="code-blocks/code-blocks-highlighting/" icon="code">}}
      Examples for codeblock shortcode
    {{</card >}}
  {{</card-section>}}
{{</card-layout >}}

## Other Content 

[//]: # "Provide any sort of additional supporting content you may want customers to see as well (e.g. more cards, diagrams, changelogs, etc.)"
{{<card-layout>}}
  {{<card-section title="NGINX" showAsCards="true" >}}
    {{<card title="NGINX Plus" titleUrl="/nginx/" brandIcon="NGINX-Plus-product-icon-RGB" >}}
      Installing NGINX
    {{</card >}}
  {{</card-section >}}
{{</card-layout >}}