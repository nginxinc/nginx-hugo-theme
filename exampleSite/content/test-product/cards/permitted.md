---
description: Card usage
title: Usage
weight: 100
---
## General usage
The structure of a card looks like the following:
```plaintext
  <card-section>
      <card title="SOME_TITLE">SOME CONTENT icon="SOME_LUCIDE_ICON">SOME_CONTENT<\card>
      ...
      <card>...<\card>
  </card-section>
```

and will render as the following:
<div data-testid="cards-test__basic">
  {{<card-section>}}
    {{<card title="SOME_TITLE">}}
      SOME CONTENT
    {{</card >}}
  {{</card-section>}}
</div>

Essentially, you have some `card` shortcodes that can only be put inside a `card-section` shortcode to group content together better.

### Params 
To support customization, there are also some params you can add to the shortcode `<card>` such as `title`, `titleUrl`, `icon`, `brandIcon`, `isFullSize`.

* `title` (required) - Title of the card. 
<br>
* `titleUrl` (optional) - URL for the card.
<br>
* `icon` (optional) - Custom icon using <a href="https://lucide.dev/icons/">lucide</a> icons.
<br>
* `brandIcon` (optional) - Custom icon using image from  `nginx-hugo-theme/static/images/icons`.
  * Usage: `<card brandIcon="NGINX-App-Protect-WAF-product-icon"...>`
<br>
* `isFullSize` (optional) - Boolean indicating whether or not the card should be full size. By default, cards are half sized.
  * Usage: `<card isFullSize="true"...>`

For the `<card-section>`, there are some params you can add such as `title` and `isFeaturedSection`.
* `title` - Title of the section.
<br>
* `isFeaturedSection` (optional) - Boolean indicating whether or not the section is a featured one - will discuss later down the page. By default, false.

### Additional Information
While it may come immediate, you can't use a `<card>` shortcode on its own in your markdown or else the build will fail. This is because if you call a card, there is no way to structure it in a writer-friendly customizable way. 

## Featured Section
Denoted by the param `isFeaturedSection` in the shortcode `<card-section>`, this block of cards can contain only up to three cards. The usage as seen below:
```plaintext 
  <card-section isFeaturedSection="true">
    <card ... >...</card>
    <card ... >...</card>
    <card ... >...</card>
    <card ... >...</card>
  </card-section>
```

<div data-testid="cards-test__featuredSection">
  {{<card-section isFeaturedSection="true">}}
    {{<card title="Everything" titleUrl="everything" icon="circle-dot-dashed">}}
      All shortcodes in one page.
    {{</card >}}
    {{<card title="Call Out usages" titleUrl="call-out/all-callouts/" icon="message-square">}}
      Examples for call-out shortcode
    {{</card >}}
    {{<card title="Code Block usages" titleUrl="code-blocks/code-blocks-highlighting/" icon="code">}}
      Examples for codeblock shortcode
    {{</card >}}
    {{<card title="Code Block usages" titleUrl="code-blocks/code-blocks-highlighting/" icon="code">}}
      Examples for codeblock shortcode
    {{</card >}}
  {{</card-section>}}
</div>