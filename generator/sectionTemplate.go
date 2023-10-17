package main

import (
	"bytes"
	"strings"
	"text/template"
)

func wrapDocsSection(route, name string) (string, error) {
	if strings.HasPrefix(route, "/") {
		route = route[1:]
	}
	route = toSnakeCase(route)

	upper := strings.Title(name)

	tpl, err := templateFS.ReadFile("templates/section.mdx.tmpl")
	if err != nil {
		return "", err
	}

	t, err := template.New("").Parse(string(tpl))
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, map[string]string{
		"ImportName": upper,
		"ImportPath": name,
		"Route":      route,
		"Component":  upper,
	})
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
