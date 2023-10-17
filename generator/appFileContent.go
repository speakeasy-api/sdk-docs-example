package main

import (
	"bytes"
	"fmt"
	"text/template"
)

func getAppFileContent(appFileProvided, isMultipage bool) (string, error) {
	importPath := "next/app"
	if appFileProvided {
		importPath = ".gen/_app"
	}

	tpl, err := templateFS.ReadFile("templates/_app.mdx.tmpl")
	if err != nil {
		return "", err
	}

	t, err := template.New("").Parse(string(tpl))
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, map[string]string{
		"ImportPath":  importPath,
		"IsMultipage": fmt.Sprintf("%t", isMultipage),
	})
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
