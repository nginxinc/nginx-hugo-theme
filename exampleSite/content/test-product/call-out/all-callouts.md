
---
description: All Callouts
title: All Callouts
weight: 100
---


## Plain Callouts
These are the main callout types that may be used to bring attention to a section of text. You should prefer to use [Side Callouts](#side-callouts) instead.

{{<call-out>}}
This is a plain callout with no title. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<call-out>`.
{{</call-out>}}

{{<call-out "" "Custom title">}}
This is a plain callout with a title. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<call-out>` with a custom title parameter.
{{</call-out>}}

{{<before-you-begin>}}
This is a plain callout with a default title for its type. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<before-you-begin>`.
{{</before-you-begin>}}

## Side Callouts

Naturally, callouts should contain less text within them than the text it lives next to. We do this for several reasons. Firstly, it looks weird to have a big empty space in the primary content area. Secondly, if you have more text in the callout, then it stops being a callout. I have asked an LLM to lengthen this passage.

{{<call-out "side-callout">}}
This is a plain side callout with no title. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<call-out>` with the `.side-callout` class.
{{</call-out>}}

When designing effective web layouts, it's important to maintain proper balance between primary content and supplementary elements. Callouts serve as attention-grabbing devices that highlight key information, but they should remain subordinate to the main content flow. This hierarchy helps users navigate your page intuitively, guiding their attention appropriately. A well-designed callout complements the surrounding text rather than competing with it.

Additionally, concise callouts tend to be more effective at capturing user attention. When a callout becomes too verbose, users are less likely to read it entirely, defeating its purpose. The visual weight of callouts should align with their informational importance - brief, impactful statements create better engagement than lengthy explanations. Remember that white space itself is a powerful design element, creating visual breathing room that enhances readability and focus. Ultimately, the most successful callouts follow the principle of "less is more," delivering maximum impact through minimal interruption to the user's reading experience.

{{<call-out "side-callout" "Custom title">}}
This is a plain side callout with a custom title. It has a [link](#plain-callouts) to a heading on this page. Its shortcode is `<call-out>` with the `.side-callout` class, and a custom title.
{{</call-out>}}

## Important, but not urgent

This is a weird exception callout that adds just a little extra contrast to the callout.

{{<important>}}
This is an Important callout. There was previously a bug with **bold text** that we should be aware of and continue to check for. This callout was invoked with the `<warning>` shortcode. It has no custom title.
{{</important>}}

## Loud Callouts

These callouts should be used sparingly: only when it is imperative to capture the user's attention.

{{<caution>}}
This is a Caution callout. There was previously a bug with **bold text** that we should be aware of and continue to check for. This callout was invoked with the `<caution>` shortcode. It has no custom title.
{{</caution>}}

This callout especially should be used **VERY** judiciously.

{{<warning>}}
This is a Warning callout. There was previously a bug with **bold text** that we should be aware of and continue to check for. This callout was invoked with the `<warning>` shortcode. It has no custom title.
{{</warning>}}


{{<call-out "warning" "Custom warning title">}}
This is a Warning callout with a custom title. There was previously a bug with **bold text** that we should be aware of and continue to check for. This callout was invoked with the `<call-out>` shortcode with the `.warning` class, and a custom title.
{{</call-out>}}


{{<note>}}
This is a note. In oldframe it should have `note:` in bold, at the start.
{{</note>}}