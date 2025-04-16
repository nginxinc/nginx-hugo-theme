
---
description: Callout - Param types
title: Callout - Param types
weight: 100
---

Hugo supports named an unnamed params.
Named are more readable.
The callout shortcode aims to support both, but **not** in the same shortcode instance.


## The two callouts below using **unnamed** params

{{<call-out "" "Custom title" "fa fa-check-circle" "true">}}
This callout uses the icon check-circle. **This should be an inline callout.**
{{</call-out>}}

{{<call-out "" "Custom title" "fa fa-check-circle" "false">}}
This callout uses the icon check-circle. **This should be an sideline callout.**
{{</call-out>}}

## The two callouts below using **named** params
This should work exactly the same as the two callouts above

{{<call-out title="Custom title" icon="fa fa-check-circle" inline="true">}}
This callout uses the icon check-circle. **This should be an inline callout.**
{{</call-out>}}

{{<call-out title="Custom title" icon="fa fa-check-circle" inline="asdas">}}
This callout uses the icon check-circle. **This should be an sideline callout.**
{{</call-out>}}
