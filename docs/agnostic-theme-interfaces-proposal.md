# Agnostic Theming - Proposal Interfaces (9/16/25)

This document contains proposal interfaces fulfilling the requirements and criteria
laid out in [docs-platform/629](https://github.com/nginxinc/docs-platform/issues/620).

Nothing in this document should be considered final and is subject to change.

### Site Config

```yaml
params:
  # Collection of product groups or false to disable the product-selector
  productSelector: <false | ProductGroup[]> 
    - groupLabel: <string>
      items: <Product[]>
          # Product Group Label
        - title: <string>
          # The URL prefix used for the section (Ex. 'nginx' for NGINX+)
          url: <string>
          # Whether this link is external to the site
          extUrl: <bool | undefined>
  header:
    # Header Nav items
    navItems: <NavItem[]>
      - title: <string>
        url: <string>
        extUrl: <bool> 
    # Items in the "F5 Sites" dropdown
    f5Sites: <F5Site[]>
      - title: <string>
        description: <string>
        url: <string>
  brand:
    # String ID for the icon set (defaults to 'lucide' if not provided)
    iconSet: <string | undefined>
    # Favicon path (default './favicon.ico')
    favicon: <string | undefined>
    # Path for standard logo (located in mounted asset folder)
    logo: <string | undefined>
    # Path for icon logo (Used in small width contexts), fallback to "logo" if not defined
    iconLogo: <string | undefined>
    primary: <string | undefined>
    secondary: <string | undefined>
    # Replicates the interface for .Site.params.brand, minus iconSet and favicon
    dark:
      logo: <string>
      iconLogo: <string>
      primary: <string>
      secondary: <string>
  footer:
    # Default to &copy;{currentYear} F5, Inc. All rights reserved
    copyrightText: <string | undefined>
    items: <NavItem[]>
      - title: <string>
        # Item URL
        href: <string>
        extUrl: <boolean>

```

### F5 Sites

Collection of F5Site types. Used to define items for the "F5 Sites" dropdown.

Config location:  `.Site.Params.header.f5Sites`

```yaml
params:
  header:
    f5Sites: <F5Site[]>
      - title: <string>
        description: <string>
        url: <string>
```

### Product Selector

Defined in Hugo config as this applies sitewide. Optionally, keep `data/` files as source
instead of defined in `hugo.yaml` but less explicit.

```yaml
params:
  productSelector: ProductGroup[]
    - productGroup: <string>
      products: Product[]
          # Product Group Label (Product[])
        - title: <string>
          # The URL prefix used for the section (Ex. 'nginx' for NGINX+). Definition not required if extUrl
          url: <string | undefined>
          # Whether the URL is external to the site (opens a new tab if true)
          extUrl: <bool | undefined>
```

### Icon Partial

| Param         | Type                   | Note                                                                                                         |
|---------------|------------------------|--------------------------------------------------------------------------------------------------------------|
| `size`        | `"sm" \| "md" \| "lg"` | Size of rendered icon (defaults to "md"). Maps to "rem" enum                                                 |
| `set`         | `string \| undefined`  | A valid string ID for an icon set (defaults to `.Site.Params.brand.iconSet`)                                 |
| `icon`        | `string`               | A string ID for the icon-set                                                                                 |
| `_iconDirect` | `string \| undefined`  | A direct path for the icon resource to render. If supplied, `set` and `icon` params are ignored in handling. |

```go-template
{{ partial "icon.html" set="lucide" size="md" icon="test-icon-id" _iconDirect="" . }}
```

### Additional Notes

* Style variables defined in Hugo config may be detrimental to IDE integrations that read values for color display
  * Optionally, require theme consumers to set variables directly in a CSS file rather than config.
* Some of these new schemas are breaking but given the low-level of current consumers, this is the best time to make schema adjustments before wider rollout.

### Optional Collection Definition Pattern

Several of the schemas above utilize an optional collection pattern that can be broken down into the following:

```yaml
f5Sites: <false | Collection[]>
```

When a collection is provided, the feature is toggled on. If a collection is not provided or the value is falsy, the feature is disabled. 
