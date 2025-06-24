---
description: Test pages for nginx-hugo-theme
title: Test pages
weight: 100
hasCustomContent: true
---

## About

[//]: # "Give a short 1-2 sentence summary of what the product does and its value to a customer."
This is a compilation of all our shortcodes to show how they look, function, respond, and coded.

## Featured Content

[//]: # "Maximum of three cards available to display."
[//]: # "Each card should be less than 10 words for a description."
[//]: # "If more than three cards are placed here, they are not displayed."
[//]: # "If there is one card, it will take full width and be the only card in the row."
[//]: # "If there is two cards, one card will take half width and there will be two cards in a row."
[//]: # "If there is three cards, there will be two rows, where first row has two equal-sized cards, and second row will have a full width card. Can we inversed in order to feature content."
<!-- <card-layout> - Available params: title (required: string)-->
{{<card-layout >}}
  <!-- <card-section> - Available params: title (required: string), showAsCards (optional: boolean, default "false"), isFeaturedSection (optional: boolean, default "false") -->
  <!-- If there is no "title" for <card-section>, it is implied it is the main content section and not a new content section -->
  {{<card-section showAsCards="true" isFeaturedSection="true">}}
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
{{<card-layout >}}
  {{<card-section title="NGINX" showAsCards="true" >}}
    {{<card title="NGINX Plus" titleUrl="/nginx/" brandIcon="NGINX-Plus-product-icon-RGB" >}}
      Installing NGINX
    {{</card >}}
  {{</card-section >}}
{{</card-layout >}}