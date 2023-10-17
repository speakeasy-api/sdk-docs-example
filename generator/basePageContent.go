package main

import (
	"bytes"
	"text/template"
)

func getBasePageContent(page Page) (string, error) {
	frontMatter := page.FrontMatter
	if frontMatter == nil {
		frontMatter = &FrontMatter{}
	}
	if frontMatter.Title == "" {
		frontMatter.Title = page.AsTitle()
	}

	tpl, err := templateFS.ReadFile("templates/basepage.mdx.tmpl")
	if err != nil {
		return "", err
	}

	t, err := template.New("").Parse(string(tpl))
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	err = t.Execute(&buf, map[string]string{
		"Title":       frontMatter.Title,
		"Description": frontMatter.Description,
		"SRCName":     page.SrcName,
		"Name":        page.Name,
	})
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
