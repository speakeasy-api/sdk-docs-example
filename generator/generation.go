package main

import (
	"fmt"
	"os"
	"path/filepath"
)

const (
	baseContentRoot  = "./content"
	pagesContentRoot = "./content/pages"
	genRoot          = ".gen"
	pagesGenRoot     = "./pages"

	appFile = "_app.mdx"
)

type Gen struct {
	root string
}

func (g *Gen) setup() error {
	if err := recreateDir(genRoot); err != nil {
		return err
	}

	if err := tryMkdir(fmt.Sprintf("%s/%s", genRoot, "pages")); err != nil {
		return err
	}

	if err := recreateDir(pagesGenRoot); err != nil {
		return err
	}

	/**
	 * Copy files in the root over unchanged
	 */
	files, err := os.ReadDir(baseContentRoot)
	if err != nil {
		return err
	}

	appFileProvided := false

	for _, file := range files {
		if !file.IsDir() {
			content, err := os.ReadFile(baseContentRoot + "/" + file.Name())
			if err != nil {
				return err
			}

			appFileProvided = appFileProvided || file.Name() == "_app.tsx"

			if err := writeFile(fmt.Sprintf("%s/%s", genRoot, file.Name()), string(content)); err != nil {
				return err
			}
		}
	}

	appFileContent := getAppFileContent(appFileProvided)
	if err := writeFile(fmt.Sprintf("%s/%s", pagesGenRoot, appFile), appFileContent); err != nil {
		return err
	}

	return nil
}

func (g *Gen) toGenPath(path string) (string, error) {
	relativePath := g.toRelativePath(path)
	return filepath.Abs(fmt.Sprintf("%s/%s", genRoot, relativePath))
}

func recreateDir(path string) error {
	if err := os.RemoveAll(path); err != nil {
		return err
	}

	return tryMkdir(path)
}

func tryMkdir(path string) error {
	err := os.Mkdir(path, 0755)

	if os.IsExist(err) {
		return nil
	} else {
		return err
	}
}
