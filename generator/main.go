package main

import (
	wrapper "github.com/speakeasy-api/sdk-docs-wrapper"
	"path/filepath"
)

func main() {
	languages := []string{"go", "typescript", "python"}
	absBasePath, err := filepath.Abs(wrapper.BaseContentRoot)
	if err != nil {
		panic(err)
	}

	w := wrapper.New(absBasePath, languages, nil)
	if err := w.Wrap(); err != nil {
		panic(err)
	}
}
