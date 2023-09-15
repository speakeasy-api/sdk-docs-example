package main

import (
	"fmt"
	"path/filepath"
	"strings"
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

func (g *Gen) generatePages(pages []*Page) error {
	var basePage *Page
	var otherPages []*Page
	for _, page := range pages {
		if page.Name == entrypoint {
			basePage = page
		} else {
			otherPages = append(otherPages, page)
		}

		for _, childPage := range page.Children {
			err := g.generatePagesForPage(*childPage)
			if err != nil {
				return err
			}
		}
	}

	err := g.createBasePages(basePage, otherPages)
	if err != nil {
		return err
	}

	return nil
}

func (g *Gen) generatePagesForPage(page Page) error {
	if !page.IsLeaf() {
		pagesPath, err := g.toPagesPath(page.Path)
		if err = tryMkdir(pagesPath); err != nil {
			return err
		}

		metaJson, err := getMetaJsonContent(page)
		if err != nil {
			return err
		}

		if err := g.writePagesFile(page.Path, "_meta.json", metaJson); err != nil {
			return err
		}
	}

	for _, childDir := range page.Children {
		err := g.generatePagesForPage(*childDir)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) createBasePages(rootPage *Page, otherPages []*Page) error {
	if err := g.writePagesFile(rootPage.Path, "[[...slug]].mdx", getBasePageContent(rootPage.Name)); err != nil {
		return err
	}

	metaJson, err := getRootMetaJsonContent(rootPage, otherPages)
	if err != nil {
		return err
	}

	if err := g.writePagesFile(rootPage.Path, "_meta.json", metaJson); err != nil {
		return err
	}

	for _, page := range otherPages {
		pageFileName := fmt.Sprintf("%s.mdx", page.Name)

		path, err := g.toPagesPath(page.Path)
		if err != nil {
			return err
		}
		if err := tryMkdir(path); err != nil {
			return err
		}

		if err := g.writePagesFile(page.Path, pageFileName, getBasePageContent(page.Name)); err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) toPagesPath(path string) (string, error) {
	relativePath := g.toRelativePath(path)

	// For pages directory, all "root" content needs to be promoted to the top level
	relativePath = strings.TrimPrefix(relativePath, "/"+entrypoint)

	return filepath.Abs(fmt.Sprintf("%s/%s", pagesGenRoot, relativePath))
}

func (g *Gen) writePagesFile(path, name, content string) error {
	contentPath, err := g.toPagesPath(fmt.Sprintf("%s/%s", path, name))
	if err != nil {
		return err
	}

	return writeFile(contentPath, content)
}
