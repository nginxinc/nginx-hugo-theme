# nginx-hugo-theme

A documentation theme for F5 NGINX projects using [Hugo](https://gohugo.io/).

## Installation

1. Add the `nginx-hugo-theme` theme as a module mount to your project's config file:

    ```toml
    [module]
    [[module.imports]]
    path="github.com/nginxinc/nginx-hugo-theme"
    ```

## Usage

### Create a new doc

Run `hugo new <path/doc-title.md>` to add a new doc.

> Using the `hugo new` command adds *all* of our pre-configured frontmatter to the new file.

### Build the docs

- Run `hugo` to build static HTML for your docs.
- Run `hugo server` to run the Hugo development server, so you can watch your changes as you work.
  Open `localhost:1313` (`127.0.0.1:1313`) in a browser window to view the docs.  

### Shortcodes

See [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/) for an overview.

This theme contains the following custom shorcodes:

**Callouts**:

- caution.html
- important.html
- note.html
- see-also.html
- tip.html
- warning.html

**Formatting**:

- collapse.html - Make a collapsible section.
- details-disclosure.html - Renders information inside a toggleable element (open by default but can be toggled in/out of visibility).
- comment.html - Insert a comment that won't be rendered at build time.
- raw-html.html - Insert raw HTML into a markdown doc.

**Custom data**:

- openapi.html - Render an OpenAPI spec using ReDoc.
- metrics.html - Imports data from a JSON file and presents it in table format.
- ghcode.html - Rendering code from github

#### `ghcode` example
To render code directly from github at build time, you can use the `ghcode` shortcode.

_Param 1_ - The url for the `raw` github file you want to render

_Param 2_ - Options for highlighting following Hugo's [Highlight shortcode](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode)

```
{{< ghcode "https://raw.githubusercontent.com/nginxinc/kubernetes-ingress/refs/heads/main/examples/custom-resources/access-control/access-control-policy-allow.yaml" "hl_lines=4" >}}
```



### Includes

This theme contains a custom shortcode called "includes" that lets you reuse content. 

To use this shortcode:

1. Add an "includes" folder to the folder that contains your site content (for example, `content/includes`).
2. In the includes folder, create an `index.md` file and add these lines:

    ```text
    ---
    headless: true
    ---
    ```

You can reuse the content of any file in the includes directory using the following shortcode syntax:

```md
{{< include "filename.md" >}}
```

### Hugo Config

We have several **optional** custom options to add to your config `toml` or `yaml`.

### `searchOnPage`
Option to add a coveo searchbar on top of the coveo filters on a search results page.

Example:
```toml
[params]
  searchOnPage = true
```
### `featureFlags`
Options to add feature flags. Syntax denoted by prefix `disable_`.

Example:
```toml
[params]
  ...
  [params.featureFlags]
      disable_coveo = true
      disable_qualtrics = true
      disable_rich_meta = false
```

### Rich Meta - Open Graph / Social Media Integrations

This theme allows for the configuration of OpenGraph embeds and other social media integrations through
the following config parameters. Title and description properties are set implicitly based on page desc/title
and do not need to be supplied.

**Disable OpenGraph/Rich Meta Handling**

```toml
[params.featureFlags]
    disable_rich_meta = true
```

**Thumbnail**

Set the following parameter to control the image used by OpenGraph and social integrations. Must be an asset
present within the `static` directory 

```toml
[params.rich_meta]
    thumbnail = "/images/nginx-documentation-500x300.png"
    thumbnail_res = "500x300" # Width x Height
```

**Additional Meta for Social Media Providers**

To provide additional meta for certain social media providers, set the following parameters. If params
are not set handling will be skipped. 

```toml
[params.rich_meta]
    twitter_username = "@f5"
    fb_publisher = "https://www.facebook.com/f5incorporated/"
```


### `typographer`
Options to translate plain ASCII punctuation characters into typographic-punctuation HTML entities. More info [here](https://gohugo.io/configuration/markup/#typographer).

Example:
```toml
[markup]
  ...
  [markup.goldmark.extensions.typographer]
      rightDoubleQuote = '&quot;'
      leftDoubleQuote = '&quot;'
      rightSingleQuote = '&apos;'
      leftSingleQuote = '&apos;'
```