---
description: Card usage
title: Usage
weight: 100
---
## General usage
The structure of a card looks like the following:
```plaintext
<card-layout >
    <card-section>
        <card title="SOME_TITLE">SOME CONTENT icon="SOME_LUCIDE_ICON"><\card>
        ...
        <card>SOME CONTENT<\card>
    </card-section>
</card-layout >
```

and will render as the following:
{{<card-layout >}}
  {{<card-section>}}
    {{<card title="SOME_TITLE">}}
      SOME CONTENT
    {{</card >}}
  {{</card-section>}}
{{</card-layout >}}

### Params 
To support customization, there are also some params you can add to the shortcode `<card>` such as `title`, `titleUrl`, `icon`, `brandIcon`, `isFeatured`, `isFullSize`.

* `title` - Title of the card.
<br>
* `titleUrl` - URL for the card.
<br>
* `icon` - Custom icon using <a href="https://lucide.dev/icons/">lucide</a> icons.
<br>
* `brandIcon` - Custom icon using image from  `nginx-hugo-theme/static/images/icons`.
  * Usage: `<card brandIcon="NGINX-App-Protect-WAF-product-icon"...>`
<br>
* `isFeatured` - Boolean indicating whether or not the card should be the first one and full size. By default, false.
  * Usage: `<card isFeatured="true"...>`
<br>
* `isFullSize` - Boolean indicating whether or not the card should be full size. By default, cards are half sized.
  * Usage: `<card isFullSize="true"...>`

For the `<card-section>`, there are some params you can add such as `title`, `isFeaturedSection`, and `showAsCards`.
* `title` - Title of the section.
<br>
* `isFeaturedSection` - Boolean indicating whether or not the section is a featured one - will discuss later down the page. By default, false.
<br> 
* `showAsCards` - Boolean indicating whether or not the cards in the section should appear with borders. By default, false.

### Additional Information
While it may come immediate, you can't use a `<card>` shortcode on its own in your markdown or else the build will fail. This is because if you call a card, there is no way to structure it in a writer-friendly customizable way. 

## Show as cards
As you can see from the above example in 'General usage', it renders as a plain box that does not resemble a card. To change the appearance and render as a card, use the param `showAsCards` in the shortcode `<card-section>`. The usage as seen below:
```plaintext
<card-layout >
    <card-section showAsCards="true">
        <card title="SOME_TITLE">SOME CONTENT icon="SOME_LUCIDE_ICON"><\card>
        ...
        <card>SOME CONTENT<\card>
    </card-section>
</card-layout >
```
and will render as the following:
{{<card-layout >}}
  {{<card-section showAsCards="true">}}
    {{<card title="SOME_TITLE">}}
      SOME CONTENT
    {{</card >}}
  {{</card-section>}}
{{</card-layout >}}

## Featured Cards
Denoted by the param `isFeaturedSection` in the shortcode `<card-layout>`, this block of cards can contain only up to three cards.

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
    {{<card title="Code Block usages" titleUrl="code-blocks/code-blocks-highlighting/" icon="code">}}
      Examples for codeblock shortcode
    {{</card >}}
  {{</card-section>}}
{{</card-layout >}}
