package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
	"strings"
)

type File struct {
	Name    string
	content string
}

var pageRegex = regexp.MustCompile(`<(\w*)\s*.*/>`)

func (g *Gen) getBasePages(path string) ([]*Page, error) {
	files, err := os.ReadDir(path)
	if err != nil {
		panic(err)
	}

	var pages []*Page

	for _, file := range files {
		fullPath := fmt.Sprintf("%s/%s", path, file.Name())
		if file.IsDir() {
			pages = append(pages, &Page{
				Name:         file.Name(),
				Path:         fullPath,
				RelativePath: g.toRelativePath(fullPath),
			})
		}
	}

	return pages, nil
}

func (g *Gen) walkFiles(page *Page) error {
	files, err := os.ReadDir(page.Path)
	if err != nil {
		panic(err)
	}

	var directories []string
	var pageOrder []string

	for _, file := range files {
		if file.IsDir() {
			directories = append(directories, file.Name())
			continue
		}

		filePath := fmt.Sprintf("%s/%s", page.Path, file.Name())

		data, err := os.ReadFile(filePath)
		if err != nil {
			return err
		}

		fileString := string(data)
		page.Files = append(page.Files, File{
			Name:    file.Name(),
			content: fileString,
		})

		matches := pageRegex.FindAllStringSubmatch(fileString, -1)
		for _, match := range matches {
			pageOrder = append(pageOrder, match[1])
		}
	}

	for _, pageName := range pageOrder {
		dirName := toDirectoryCase(pageName)
		if !slices.Contains(directories, dirName) {
			return fmt.Errorf("page %s has no corresponding directory (expected a directory named %s)", pageName, dirName)
		}

		dirPath := fmt.Sprintf("%s/%s", page.Path, dirName)

		childPage := &Page{
			Name:         dirName,
			Path:         dirPath,
			RelativePath: g.toRelativePath(dirPath),
			parent:       page,
		}

		if err := g.walkFiles(childPage); err != nil {
			return err
		}

		if childPage.Children != nil || childPage.Files != nil {
			page.Children = append(page.Children, childPage)
		}
	}

	return nil
}

func (g *Gen) toRelativePath(path string) string {
	return strings.TrimPrefix(path, g.root)
}
