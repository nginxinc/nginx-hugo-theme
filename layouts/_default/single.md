# {{ .Title }}
{{ with .Date }}
date: {{ .Format "2006-01-02" }}
{{- end }}
{{ with .Params.description }}
> {{ . }}
{{- end }}

{{ $page := . }}
{{ $extraContent := "" }}
{{ with .Params.contentSource }}
    {{ with site.GetPage . }}
        {{ $page = . }}
        {{/* When the delegating page has its own body, render it after the sourced content */}}
        {{ if $.RawContent }}{{ $extraContent = printf "\n\n%s" (partial "clean-content.html" $) }}{{ end }}
    {{ else }}
        {{ errorf "contentSource %q does not resolve to a page (referenced in %s)" . $.File.Filename }}
    {{ end }}
{{ end }}

{{ if $page.RawContent }}{{ partial "sub-content-vars.html" (dict "content" (printf "%s%s" (partial "clean-content.html" $page) $extraContent) "page" .) | safeHTML }}{{ else }}{{ $page.Summary | plainify | safeHTML }}{{ end }}