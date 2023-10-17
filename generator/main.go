package main

import (
	"path/filepath"
)

func main() {
	absBasePath, err := filepath.Abs(baseContentRoot)
	if err != nil {
		panic(err)
	}

	gen := &Gen{
		root: absBasePath,
	}

	basePages, err := gen.getBasePages()
	if err != nil {
		panic(err)
	}

	gen.isMultipage = basePages != nil && len(basePages) > 1

	if !gen.isMultipage {
		basePages[0].dropFromRoutes = true // Elevate the page to root if there's only one page
	}

	err = gen.setup()
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
