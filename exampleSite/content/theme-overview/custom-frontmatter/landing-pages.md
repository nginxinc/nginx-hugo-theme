---
title: Landing pages
nd-subtitle: This is a subtitle for a landing page
toc: true
---

## Overview

Landing pages (`_index.md` files) are rendered using our [list.html](https://github.com/nginxinc/nginx-hugo-theme/blob/main/layouts/_default/list.html) layout.


## Default landing page

If `_index.md_` contains _only_ frontmatter, with no content or `nd-landing-page: true`, it will render a list of the content. 

The most basic `_index.md` example:

```yml
---
title: Default landing page
nd-subtitle: This is a subtitle for a landing page
---

```

This will render the [default landing page](/theme-overview/custom-frontmatter/default-landing-page/).

This page shows cards with the title of each page, along with its description, if it's set.

{{<call-out title="Note">}}
This page __will not__ get linked to in the sidebar. It can only be accessed through the link in the breadcrumb, or if you have the direct link.
{{</call-out>}}



## Custom landing page

If the `_index.md` file contains the `nd-landing-page: true` frontmatter field, __and__ you add some content, you can customize the contents on this page.

The page will also be added to the sidebar with the name of `Overview` under a section.

This can be treated like any other content page, and supports all expected shortcodes.


```yml
---
title: Custom landing page
nd-landing-page: true
nd-subtitle: This is a subtitle for a landing page
---

This is a custom landing page.
This page will not render the default list.

```

Will render the following [custom landing page](/theme-overview/custom-frontmatter/custom-landing-page/).

{{<call-out title="Note">}}
Note that the `Overview` section for this page is visible in the sidebar, unlike the [default landing page](/theme-overview/custom-frontmatter/default-landing-page/). 
{{</call-out>}}

## Custom subtitle

Regardless of using default or custom landing pages, `nd-subtitle` can be used to add a custom subtitle.