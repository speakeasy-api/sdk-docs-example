package main

import (
	"fmt"
	"path/filepath"
)

// Needed to enable dynamic routing
const basePageNameOverride = "[...slug]"

func (g *Gen) generatePages(pages []*Page) error {
	if len(pages) == 0 {
		return fmt.Errorf("no pages provided")
	}

	isMultipage := len(pages) > 1

	if isMultipage {
		rootMetaJson, err := getMetaJsonContentForSubpages("", pages, true, false)
		if err != nil {
			return err
		}

		if err := writeFile("./pages/_meta.json", rootMetaJson); err != nil {
			return err
		}
	}

	for _, page := range pages {
		if err := g.createBasePage(*page, isMultipage); err != nil {
			return err
		}

		if err := g.createMetaJsonFiles(*page); err != nil {
			return err
		}
	}

	return nil
}

func needsPagesEntry(page Page) bool {
	return (page.IsRoot() || !page.IsLeaf()) && !page.IsFlat()
}

func (g *Gen) createMetaJsonFiles(page Page) error {
	if needsPagesEntry(page) {
		if err := g.tryMakePageDir(page); err != nil {
			return err
		}

		metaJson, err := getMetaJsonContent(page)
		if err != nil {
			return err
		}

		if err := g.writePagesFile(page, "_meta.json", metaJson); err != nil {
			return err
		}
	}

	for _, childDir := range page.Children {
		err := g.createMetaJsonFiles(*childDir)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) createBasePage(page Page, isMultipage bool) error {
	if err := g.tryMakePageDir(page); err != nil {
		return err
	}

	basePageName := basePageNameOverride
	if isMultipage {
		basePageName = fmt.Sprintf("%s.mdx", basePageName)
	} else {
		basePageName = fmt.Sprintf("[%s].mdx", basePageName)
	}

	content, err := getBasePageContent(page)
	if err != nil {
		return err
	}

	if err := g.writePagesFile(page, basePageName, content); err != nil {
		return err
	}

	return nil
}

func (g *Gen) tryMakePageDir(page Page) error {
	path, err := g.toPagesPath(page.PagePath())
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

func (g *Gen) writePagesFile(page Page, name, content string) error {
	contentPath, err := g.toPagesPath(fmt.Sprintf("%s/%s", page.PagePath(), name))
	if err != nil {
		return err
	}

	return writeFile(contentPath, content)
}
