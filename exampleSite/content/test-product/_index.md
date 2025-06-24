---
# The title is the product name
title: Test pages
weight: 100
# The URL is the base of the deployed path, becoming "docs.nginx.com/<url>/<other-pages>"
url: 
# The subtitle displays directly underneath the heading of a given page
nd-subtitle: Test pages for nginx-hugo-theme
# Indicates that this is a custom landing page
nd-landing-page: true
# Types have a 1:1 relationship with Hugo archetypes, so you shouldn't need to change this
nd-content-type: landing-page
# Intended for internal catalogue and search, case sensitive:
# Agent, N4Azure, NIC, NIM, NGF, NAP-DOS, NAP-WAF, NGINX One, NGINX+, Solutions, Unit
nd-product:
---

## About
[//]: # "These are Markdown comments to guide you through document structure. Remove them as you go, as well as any unnecessary sections."
[//]: # "Use underscores for _italics_, and double asterisks for **bold**."
[//]: # "Backticks are for `monospace`, used sparingly and reserved mostly for executable names - they can cause formatting problems. Avoid them in tables: use italics instead."

[//]: # "This initial section introduces the product to a reader: give a short 1-2 sentence summary of what the product does and its value to the reader."
[//]: # "Name specific functionality it provides: avoid ambiguous descriptions such as 'enables efficiency', focus on what makes it unique."

This is a compilation of all our shortcodes to show how they look, function, respond, and coded.

## Featured Content
[//]: # "You can add a maximum of three cards: any extra will not display."
[//]: # "One card will take full width page: two will take half width each. Three will stack like an inverse pyramid."
[//]: # "Some examples of content could be the latest release note, the most common install path, and a popular new feature."

{{<card-layout >}}
  {{<card-section showAsCards="true" isFeaturedSection="true">}}
    {{<card title="Everything" titleUrl="everything" icon="circle-dot-dashed">}}
      All shortcodes in one page.
    {{</card >}}
    {{<card title="Call Out usages" titleUrl="call-out/all-callouts/" icon="message-square">}}
      Examples for call-out shortcode
    {{</card >}}
    {{<card title="Code Block usages" titleUrl="code-blocks/code-blocks-highlighting/" icon="code">}}
      Examples for codeblock shortcode
    {{</card >}}
  {{</card-section>}}
{{</card-layout >}}

## Other Content 
[//]: # "You can add any extra content for the page here, such as additional cards, diagrams or text."

{{<card-layout >}}
  {{<card-section title="NGINX" showAsCards="true" >}}
    {{<card title="NGINX Plus" titleUrl="/nginx/" brandIcon="NGINX-Plus-product-icon-RGB" >}}
      Installing NGINX
    {{</card >}}
  {{</card-section >}}
{{</card-layout >}}