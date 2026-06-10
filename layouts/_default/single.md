# {{ .Title }}
{{ with .Date }}
date: {{ .Format "2006-01-02" }}
{{- end }}
{{ with .Params.description }}
> {{ . }}
{{- end }}

{{ if .RawContent }}{{ partial "clean-content.html" . }}{{ else }}{{ .Summary | plainify }}{{ end }}
