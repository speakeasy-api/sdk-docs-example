package main

import (
	"fmt"
	"path/filepath"
)

func (g *Gen) generatePages(pages []*Page) error {
	rootMetaJson, err := getMetaJsonContentForSubpages("", pages, true, false)
	if err != nil {
		return err
	}

	if err := writeFile("./pages/_meta.json", rootMetaJson); err != nil {
		return err
	}

	for _, page := range pages {
		if err := g.createBasePage(*page); err != nil {
			return err
		}

		if err := g.generateMetaJsonFiles(*page); err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) generateMetaJsonFiles(page Page) error {
	if page.IsRoot() || !page.IsLeaf() {
		if err := g.tryMakePageDir(page); err != nil {
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
		err := g.generateMetaJsonFiles(*childDir)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) createBasePage(page Page) error {
	if err := g.tryMakePageDir(page); err != nil {
		return err
	}

	if err := g.writePagesFile(page.Path, "[...slug].mdx", getBasePageContent(page.Name)); err != nil {
		return err
	}

	return nil
}

func (g *Gen) tryMakePageDir(page Page) error {
	path, err := g.toPagesPath(page.Path)
	if err != nil {
		return err
	}

	if err := tryMkdir(path); err != nil {
		return err
	}

	return nil
}

func (g *Gen) toPagesPath(path string) (string, error) {
	relativePath := g.toRelativePath(path)

	return filepath.Abs(fmt.Sprintf("%s/%s", pagesGenRoot, relativePath))
}

func (g *Gen) writePagesFile(path, name, content string) error {
	contentPath, err := g.toPagesPath(fmt.Sprintf("%s/%s", path, name))
	if err != nil {
		return err
	}

	return writeFile(contentPath, content)
}
