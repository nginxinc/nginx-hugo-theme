# {{ .Title }}
{{ with .Params.description }}
> {{ . }}
{{- end }}

{{ if .RawContent }}{{ partial "clean-content.html" . | safeHTML }}{{ else }}{{ .Params.description | safeHTML }}{{ end }}
