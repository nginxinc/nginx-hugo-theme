---
description: Callout - Side
title: Callout - Side
weight: 200
---

## Text is longer than callout
This is some text that should be along the left of the call out.
This assumes the callout text is shorter than the text in the callout.
If the text in the paragraph is shorter than the callout, it's likely
the content needs to be re-written.

{{<call-out "tip side-callout" "Tip for Automated Reporting" >}}
I am some call out text. Look at me go!
{{</call-out>}}

## Text is shorter than callout

This is some text that should be along the left of the call out.
This assumes the callout text is shorter than the text in the callout.
If the text in the paragraph is shorter than the callout, it's likely
the content needs to be re-written.

{{<call-out "tip side-callout" "Tip for Automated Reporting" >}}
I am some call out text. Look at me go!
{{</call-out>}}

## Very long callout with short text

Short Text

{{<call-out "tip side-callout" "Tip for Automated Reporting" >}}
If you add multiple instances to a single config sync group, simultaneously (with automation), follow these steps. Your instances will inherit your desired configuration:

Create a config sync group.
Add a configuration to the config sync group, so all instances inherit it.
Add the instances in a separate operation.
Your instances should synchronize with your desired configuration within 30 seconds.
{{</call-out>}}


## Non-side call out

This is some text that should be along the left of the call out.
This assumes the callout text is shorter than the text in the callout.
If the text in the paragraph is shorter than the callout, it's likely
the content needs to be re-written.

{{<call-out "tip inline-callout" "Tip for Automated Reporting" >}}
I am some call out text. Look at me go!
{{</call-out>}}