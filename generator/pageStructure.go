package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
	"strings"
)

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
				Name: file.Name(),
				Path: fullPath,
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
			parent:  page,
		})

		matches := pageRegex.FindAllStringSubmatch(fileString, -1)
		for _, match := range matches {
			pageOrder = append(pageOrder, match[1])
		}
	}

	var orderedDirectories []string
	for _, page := range pageOrder {
		page = toSnakeCase(page)
		if slices.Contains(directories, page) {
			orderedDirectories = append(orderedDirectories, page)
		}
	}

	for _, dir := range directories {
		// Append directories that are not "pages" but might include necessary content
		if !slices.Contains(orderedDirectories, dir) {
			orderedDirectories = append(orderedDirectories, dir)
		}
	}

	for _, pageName := range orderedDirectories {
		dirName := toSnakeCase(pageName)
		if !slices.Contains(directories, dirName) {
			return fmt.Errorf("page %s has no corresponding directory (expected a directory named %s)", pageName, dirName)
		}

		dirPath := fmt.Sprintf("%s/%s", page.Path, dirName)

		childPage := &Page{
			Name:   dirName,
			Path:   dirPath,
			parent: page,
		}

		if err := g.walkFiles(childPage); err != nil {
			return err
		}

		if childPage.Children != nil || childPage.Files != nil {
			page.Children = append(page.Children, childPage)
		}
	}

	/**
	 * Add frontmatter, if present
	 */
	mainFile, _ := page.GetMainFile()
	if mainFile != nil {
		frontMatter, err := parseFrontMatter(mainFile.content)
		if err != nil {
			return err
		}

		page.FrontMatter = frontMatter
	}

	return nil
}

func (g *Gen) toRelativePath(path string) string {
	return strings.TrimPrefix(path, g.root)
}
