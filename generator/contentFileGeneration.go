package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

var (
	templateRegex = regexp.MustCompile(`{/\* render (\S*) (.*)\*/}`)
	headingRegex  = regexp.MustCompile(`#+\s+(.*)`)
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

		err = g.generateCorrespondingFiles(dir, file.Name, templatedContent)
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

func (g *Gen) generateCorrespondingFiles(dir Page, name, content string) error {
	nameNoSuffix := strings.TrimSuffix(name, ".mdx")

	// The directory containing the file is the name of the "route"
	route := dir.Name

	contentFileName := fmt.Sprintf("%s_content.mdx", nameNoSuffix)
	if dir.ShouldIgnore() { // Keep "ignored" files, but don't wrap them
		contentFileName = name
	}

	if err := g.writeGenFile(dir.Path, contentFileName, content); err != nil {
		return err
	}

	if !dir.ShouldIgnore() {
		//if err := validateContent(name, content, route); err != nil {
		//	return err
		//}

		wrapperContent := wrapDocsSection(route, nameNoSuffix)
		if err := g.writeGenFile(dir.Path, name, wrapperContent); err != nil {
			return err
		}
	}

	return nil
}

// Check that the content meets necessary criteria
// For example, the first heading should match the "route" aka directory name
func validateContent(fileName, content, route string) error {
	// Root route is a special case
	if route == "root" {
		return nil
	}

	expectedHeading := toTitleCase(route)

	firstHeadingMatch := headingRegex.FindStringSubmatch(content)

	if len(firstHeadingMatch) < 2 {
		return fmt.Errorf("no heading found in file %s. Expected the first heading to be %s", fileName, expectedHeading)
	} else if firstHeadingMatch[1] != expectedHeading {
		return fmt.Errorf("expected the first heading in file %s to be %s, but got %s", fileName, expectedHeading, firstHeadingMatch[1])
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
