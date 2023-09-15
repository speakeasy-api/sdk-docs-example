package main

import (
	"path/filepath"
)

func main() {
	absBasePath, err := filepath.Abs(pagesContentRoot)
	if err != nil {
		panic(err)
	}

	gen := &Gen{
		root: absBasePath,
	}

	err = gen.setup()
	if err != nil {
		panic(err)
	}

	basePages, err := gen.getBasePages(absBasePath)
	if err != nil {
		panic(err)
	}

	for _, page := range basePages {
		err := gen.walkFiles(page)
		if err != nil {
			panic(err)
		}

		err = gen.generateContentFiles(*page)
		if err != nil {
			panic(err)
		}
	}

	err = gen.generatePages(basePages)
	if err != nil {
		panic(err)
	}
}
