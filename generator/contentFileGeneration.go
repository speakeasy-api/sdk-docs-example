package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

var (
	templateRegex = regexp.MustCompile(`{/\* render (\S*) (.*)\*/}`)
)

func (g *Gen) generateContentFiles(dir Page) error {
	genPath, err := g.toGenPath(dir.Path)
	if err = tryMkdir(genPath); err != nil {
		return err
	}

	for _, file := range dir.Files {
		templatedContent, err := g.templateFile(file.Name, file.content)
		if err != nil {
			return err
		}

		err = g.generateCorrespondingFiles(file, templatedContent)
		if err != nil {
			return err
		}
	}

	for _, childDir := range dir.Children {
		err := g.generateContentFiles(*childDir)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) generateCorrespondingFiles(file File, content string) error {
	nameNoSuffix := strings.TrimSuffix(file.Name, ".mdx")

	// The directory containing the file is the name of the "route"
	dir := file.parent
	route := dir.Name

	// Key files need to be "wrapped" in order to provide their contents with the appropriate route context
	shouldWrap := file.IsMainFile() && !dir.ShouldIgnore()

	contentFileName := file.Name

	if shouldWrap {
		contentFileName = fmt.Sprintf("%s_content.mdx", nameNoSuffix)
		wrapperContent := wrapDocsSection(route, nameNoSuffix)
		if err := g.writeGenFile(dir.Path, file.Name, wrapperContent); err != nil {
			return err
		}
	}

	if err := g.writeGenFile(dir.Path, contentFileName, content); err != nil {
		return err
	}

	return nil
}

func (g *Gen) templateFile(name, content string) (string, error) {
	name = strings.TrimSuffix(name, ".mdx")

	matches := templateRegex.FindAllStringSubmatch(content, -1)

	for _, match := range matches {
		templateName := match[1]

		templateContent, err := os.ReadFile(fmt.Sprintf("./templates/%s.mdx.tmpl", templateName))
		if err != nil {
			return "", err
		}

		templateContentString := strings.TrimSpace(string(templateContent))
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
