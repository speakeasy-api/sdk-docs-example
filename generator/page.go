package main

import (
	"strings"
	"unicode"
)

type Page struct {
	Name     string
	Path     string
	parent   *Page
	Children []*Page
	Files    []File
}

func (p *Page) Route() string {
	if p.IsRoot() {
		return p.Name + "/"
	}
	return p.parent.Route() + toDirectoryCase(p.Name) + "/"
}

func (p *Page) IsLeaf() bool {
	for _, child := range p.Children {
		// If the directory has any non-ignorep children, it is not a leaf
		if !child.ShouldIgnore() {
			return false
		}
	}

	// If the directory has no children, or they are all ignored, it is a leaf
	return true
}

func (p *Page) IsRoot() bool {
	return p.parent == nil
}

func (p *Page) ShouldIgnore() bool {
	return strings.HasPrefix(p.Name, "_")
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
