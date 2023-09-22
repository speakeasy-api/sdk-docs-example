package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
	"strconv"
	"strings"
)

var pageRegex = regexp.MustCompile(`<(\w*)\s*.*/>`)

func (g *Gen) getBasePages() ([]*Page, error) {
	path := g.root + "/pages"

	files, err := os.ReadDir(path)
	if err != nil {
		panic(err)
	}

	var pages []*Page

	for _, file := range files {
		fullPath := fmt.Sprintf("%s/%s", path, file.Name())
		if file.IsDir() {
			pages = append(pages, &Page{
				Name:    stripLeadingNumbers(file.Name()),
				SrcName: file.Name(),
				Path:    fullPath,
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

	var childPages []*Page
	var pageOrder []string

	for _, file := range files {
		if file.IsDir() {
			path := fmt.Sprintf("%s/%s", page.Path, toSnakeCase(file.Name()))
			childPages = append(childPages, &Page{
				Name:    stripLeadingNumbers(file.Name()),
				SrcName: file.Name(),
				Path:    path,
				parent:  page,
			})
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

	var orderedChildren []*Page
	for _, pageName := range pageOrder {
		pageName = toSnakeCase(pageName)
		if i := slices.IndexFunc(childPages, func(p *Page) bool { return p.Name == pageName }); i != -1 {
			orderedChildren = append(orderedChildren, childPages[i])
		}
	}

	// Append directories that are not "pages" but might include necessary content
	for _, child := range childPages {
		if !slices.Contains(orderedChildren, child) {
			orderedChildren = append(orderedChildren, child)
		}
	}

	for _, childPage := range orderedChildren {
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

func stripLeadingNumbers(dirName string) string {
	// Strip out any leading numbers (used for ordering) from the directory name (e.g. "01-foo" -> "foo")
	parts := strings.Split(dirName, "-")
	if len(parts) > 1 {
		if _, err := strconv.Atoi(parts[0]); err == nil {
			return strings.Join(parts[1:], "-")
		}
	}

	return dirName
}
