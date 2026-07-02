# {{ .Title }}

{{ $header := partial "f5-doc-metadata.html" . -}}
{{- with .Params.description -}}
{{- $line := printf "> %s" . -}}
{{- if $header -}}{{- $header = printf "%s\n%s" $header $line -}}{{- else -}}{{- $header = $line -}}{{- end -}}
{{- end -}}
{{- if $header -}}
{{ $header }}
{{- printf "\n\n---\n\n" -}}
{{ end -}}
{{ if .RawContent }}{{ partial "clean-content.html" . | safeHTML }}{{ else }}{{ .Params.description | safeHTML }}{{ end }}
