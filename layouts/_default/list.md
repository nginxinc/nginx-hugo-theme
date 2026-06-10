# {{ .Title }}
{{ with .Params.description }}
> {{ . }}
{{- end }}

{{ if .RawContent }}{{ partial "clean-content.html" . }}{{ else }}{{ .Params.description }}{{ end }}
