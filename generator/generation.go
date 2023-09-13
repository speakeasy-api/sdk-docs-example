package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var templateRegex = regexp.MustCompile(`{/\* render (\S*) (.*)\*/}`)

func (g *Gen) generateCorrespondingFiles(path, name, content string) error {
	nameNoSuffix := strings.TrimSuffix(name, ".mdx")

	relativePath, err := g.toRelativePath(path)
	if err != nil {
		return err
	}

	pathParts := strings.Split(relativePath, "/")
	finalPathPart := pathParts[len(pathParts)-1]
	isIgnoredSection := strings.HasPrefix(finalPathPart, "_")

	contentFileName := fmt.Sprintf("%s_content.mdx", nameNoSuffix)
	if isIgnoredSection {
		contentFileName = name
	}

	if err := g.writeGenFile(path, contentFileName, content); err != nil {
		return err
	}

	if !isIgnoredSection {
		wrapperContent := wrapDocsSection(finalPathPart, nameNoSuffix)
		if err := g.writeGenFile(path, name, wrapperContent); err != nil {
			return err
		}
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

		templateContentString := fmt.Sprintf("{/* rendered from %s template */}\n\n%s\n\n{/* end rendered section */}", templateName, templateContent)

		content = strings.ReplaceAll(content, match[0], templateContentString)
	}

	return content, nil
}

func (g *Gen) writeGenFile(path, name, content string) error {
	contentPath, err := g.toGenPath(fmt.Sprintf("%s/%s", path, name))
	if err != nil {
		return err
	}

	err = os.WriteFile(contentPath, []byte(content), 0644)
	if err != nil {
		return err
	}

	return nil
}

func (g *Gen) toGenPath(path string) (string, error) {
	relativePath, err := g.toRelativePath(path)
	if err != nil {
		return "", err
	}

	return filepath.Abs(fmt.Sprintf("%s/%s", genPath, relativePath))
}
