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
- comment.html - Insert a comment that won't be rendered at build time.
- raw-html.html - Insert raw HTML into a markdown doc.

**Custom data**:

- openapi.html - Render an OpenAPI spec using ReDoc.
- metrics.html - Imports data from a JSON file and presents it in table format.

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
