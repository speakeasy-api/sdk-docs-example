package main

import (
	"fmt"
	"strings"
)

type Page struct {
	Name        string
	SrcName     string // Original name, before stripping leading numbers
	Path        string
	FrontMatter *FrontMatter
	parent      *Page
	Children    []*Page
	Files       []File
}

func (p *Page) Route() string {
	if p.IsRoot() {
		return p.Name + "/"
	}
	return p.parent.Route() + toSnakeCase(p.Name) + "/"
}

func (p *Page) ParentRoute() string {
	if p.IsRoot() {
		return ""
	}
	return p.parent.Route()
}

// PagePath produces the path to the page as needed by the `pages` directory, relative to the root of the site
// The difference between this and Route is that it strips out and "flat" directories which are not needed in `pages`
func (p *Page) PagePath() string {
	if p.IsRoot() {
		return p.Name + "/"
	}
	if p.IsFlat() {
		return p.parent.PagePath()
	}
	return p.parent.PagePath() + toSnakeCase(p.Name) + "/"
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

func (p *Page) GetMainFile() (*File, error) {
	for _, file := range p.Files {
		if file.IsMainFile() {
			return &file, nil
		}
	}

	return nil, fmt.Errorf("expected a page named %s.mdx in directory %s", p.Name, p.Name)
}

func (p *Page) ShouldIgnore() bool {
	return strings.HasPrefix(p.Name, "_")
}

func (p *Page) IsFlat() bool {
	return p.FrontMatter != nil && p.FrontMatter.GroupType == "flat"
}

func (p *Page) AsDirectoryName() string {
	return toSnakeCase(p.Name)
}

func (p *Page) AsTitle() string {
	return toTitleCase(p.Name)
}
