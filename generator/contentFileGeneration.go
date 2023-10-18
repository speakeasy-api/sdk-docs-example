package main

import (
	"bytes"
	"fmt"
	"os"
	"regexp"
	"strings"
	"text/template"
)

var (
	templateRegex = regexp.MustCompile(`{/\* render (\S*) (.*)\*/}`)
)

func (g *Gen) generateContentFiles(page Page, languages []string) error {
	genPath, err := g.toGenPath(page.Path)
	if err = tryMkdir(genPath); err != nil {
		return err
	}

	for _, file := range page.Files {
		templatedContent, err := g.templateFile(file.Name, file.content, languages)
		if err != nil {
			return err
		}

		dropRoute := page.dropFromRoutes

		err = g.generateCorrespondingFiles(file, templatedContent, dropRoute)
		if err != nil {
			return err
		}
	}

	for _, childDir := range page.Children {
		err := g.generateContentFiles(*childDir, languages)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) generateCorrespondingFiles(file File, content string, dropRoute bool) error {
	nameNoSuffix := strings.TrimSuffix(file.Name, ".mdx")

	// The directory containing the file is the name of the "route"
	dir := file.parent
	route := dir.Name

	// Key files need to be "wrapped" in order to provide their contents with the appropriate route context
	shouldWrap := file.IsMainFile() && !dir.ShouldIgnore()

	contentFileName := file.Name

	if shouldWrap {
		contentFileName = fmt.Sprintf("%s_content.mdx", nameNoSuffix)
		wrapperContent, err := wrapDocsSection(route, nameNoSuffix, dropRoute)
		if err != nil {
			return err
		}

		if err := g.writeGenFile(dir.Path, file.Name, wrapperContent); err != nil {
			return err
		}
	}

	if err := g.writeGenFile(dir.Path, contentFileName, content); err != nil {
		return err
	}

	return nil
}

func (g *Gen) templateFile(name, content string, languages []string) (string, error) {
	name = strings.TrimSuffix(name, ".mdx")

	matches := templateRegex.FindAllStringSubmatch(content, -1)

	for _, match := range matches {
		templateName := match[1]

		templateFile := "templates/toplevel.mdx.tmpl"
		if templateName == "operation" {
			templateFile = "templates/operation.mdx.tmpl"
		}

		tpl, err := templateFS.ReadFile(templateFile)
		if err != nil {
			return "", err
		}

		t, err := template.New("").Funcs(template.FuncMap{
			"toCapital": toCapital,
			"sub": func(a, b int) int {
				return a - b
			},
		}).Parse(string(tpl))
		if err != nil {
			return "", err
		}

		var buf bytes.Buffer
		err = t.Execute(&buf, map[string]interface{}{
			"Languages": languages,
		})
		if err != nil {
			return "", err
		}

		templateContent := buf.String()
		templateContentString := strings.TrimSpace(templateContent)
		templateContentString = fmt.Sprintf("{/* rendered from %s template */}\n\n%s\n\n{/* end rendered section */}", templateName, templateContentString)

		content = strings.ReplaceAll(content, match[0], templateContentString)
	}

	return content, nil
}

func (g *Gen) writeGenFile(path, name, content string) error {
	contentPath, err := g.toGenPath(fmt.Sprintf("%s/%s", path, name))
	if err != nil {
		return err
	}

	return writeFile(contentPath, content)
}

func writeFile(path, content string) error {
	err := os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		return err
	}

	return nil
}

func toCapital(s string) string {
	if s == "" {
		return ""
	}
	return strings.ToUpper(string(s[0])) + s[1:]
}
