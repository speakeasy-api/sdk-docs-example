package main

import (
	"strings"
	"unicode"
)

type Page struct {
	Name         string
	Path         string
	RelativePath string
	parent       *Page
	Children     []*Page
	Files        []File
}

func (d *Page) SanitizedName() string {
	return toDirectoryCase(d.Name)
}

func (d *Page) IsLeaf() bool {
	for _, child := range d.Children {
		// If the directory has any non-ignored children, it is not a leaf
		if !child.ShouldIgnore() {
			return false
		}
	}

	// If the directory has no children, or they are all ignored, it is a leaf
	return true
}

func (d *Page) IsRoot() bool {
	return d.parent == nil
}

func (d *Page) ShouldIgnore() bool {
	return strings.HasPrefix(d.Name, "_")
}

func toDirectoryCase(s string) string {
	if len(s) == 0 {
		return s
	}

	if strings.HasPrefix(s, "/") {
		return toDirectoryCase(s[1:])
	}

	r := []rune(s)
	r[0] = unicode.ToLower(r[0])
	return string(r)
}
