# Agnostic Theming - Proposal Interfaces (9/16/25)

This document contains proposal interfaces fulfilling the requirements and criteria
laid out in docs-platform/629.

Nothing in this document should be considered final and is subject to change.

## Site Config

```yaml
params:
  # Collection of product groups or false to disable the product-selector
  productSelector: <false | ProductGroup[]> 
    - groupLabel: <string>
      items: <Product[]>
          # Product Group Label
        - title: <string>
          # The common top-level path for all internal documents within a domain; i.e. 'nginx' for NGINX+. 
          # Supply if the link is external to the site.
          url: <string | undefined>
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
    # Used for dark mode variant assets 
    dark:
      logo: <string>
      iconLogo: <string>
  footer:
    # Default to &copy;{currentYear} F5, Inc. All rights reserved
    copyrightText: <string | undefined>
    items: <NavItem[]>
      - title: <string>
        # Item URL
        href: <string>
        extUrl: <bool>

```

## F5 Sites

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

## Product Selector

The product selector is one of the theme's two main mechanism's for content navigation (both internal and external).
In the context of the NGINX Docs, it's used to group products according to their broader product domains. 

```yaml
params:
  productSelector: <ProductGroup[]>
      # Product group label (i.e NGINX One)
    - groupLabel: <string>
      # Individual product landing pages within that domain                
      items: <Product[]>
          # Product Label
        - title: <string>
          # The URL prefix used for the section (Ex. 'nginx' for NGINX+).
          url: <string | undefined>
          # Whether the URL is external to the site (opens a new tab if true)
          extUrl: <bool>

```

## Styling Overrides

> Implementation detail: We ideally don't want to force theme users into raw oklch values; it would be a much nicer
surface if theme consumers could use a color keyword of their choice (rgb, hwb, hsl). However, that surface change
would require we rewrite all our current CSS variable calls

**Consumer: `assets/style.css`**
```css
:root {
  --color-brand: 56.6% 0.194 147.7;
  --color-brand-300: 0.84 0.0699 157.51;
  --color-brand-200: 0.91 0.0406 157.72;
  --color-brand-100: 0.98 0.0107 158.85;

  --color-background: 1 0 0;
  --color-foreground: 0 0 0;
  --color-shadow: 0.86 0 0;
  
  /* Dark Mode Variables */
  --dark_color-brand: 56.6% 0.194 147.7;
  --dark_color-brand-300: 0.84 0.0699 157.51;
  --dark_color-brand-200: 0.91 0.0406 157.72;
  --dark_color-brand-100: 0.98 0.0107 158.85;
  
  --dark_color-background: 1 0 0;
  --dark_color-foreground: 0 0 0;
  --dark_color-shadow: 0.86 0 0;
}
```

* Variables defined in any consumer CSS files should override reasonable defaults.
* Pre-defined theming support could be offered by creating CSS files defining these variables that are then  
  loaded based on an ID (or similar mechanism). 
  * Ex. F5 Theme or NGINX Theme

## Icon Partial

| Param         | Type                   | Note                                                                                                         |
|---------------|------------------------|--------------------------------------------------------------------------------------------------------------|
| `size`        | `"sm" \| "md" \| "lg"` | Size of rendered icon (defaults to "md"). Maps to "rem" enum                                                 |
| `set`         | `string \| undefined`  | A valid string ID for an icon set (defaults to `.Site.Params.brand.iconSet`)                                 |
| `icon`        | `string \| undefined`  | A string ID for the icon                                                                                     |
| `_iconDirect` | `string \| undefined`  | A direct path for the icon resource to render. If supplied, `set` and `icon` params are ignored in handling. |

```go-template
{{ $iconPartialParams = (dict 
   "size" "md"
   "set" "lucide"
   "icon" "lock-open"
   "_iconDirect" ""
)}}

{{ partial "icon.html" $iconPartialParams }}
```

## Additional Notes

* Some of these new schemas are breaking but given the low-level of current consumers, this is the best time to make schema adjustments before wider rollout.

### Optional Collection Definition Pattern

Several of the schemas above utilize an optional collection pattern that can be broken down into the following:

```yaml
f5Sites: <false | Collection[]>
```

When a collection is provided, the feature is toggled on. If a collection is not provided or the value is falsy, the feature is disabled. 
