package main

import (
	"encoding/json"
	"fmt"
)

type Entry struct {
	name    string
	Title   string  `json:"title"`
	Href    *string `json:"href,omitempty"`
	Type    *string `json:"type,omitempty"`
	Display *string `json:"display,omitempty"`
}

const (
	typePage      = "page"
	typeSeparator = "separator"
	displayHidden = "hidden"
)

func getMetaJsonContent(page Page) (string, error) {
	return getMetaJsonContentForSubpages(page.Route(), page.Children, false, page.IsRoot())
}

func getMetaJsonContentForSubpages(route string, pages []*Page, isProjectRoot, isPageRoot bool) (string, error) {
	var entries []Entry

	if isPageRoot {
		entries = append(entries, pageRootEntry(route))
	}

	for _, childPage := range pages {
		if isProjectRoot {
			mainEntry, linkEntry := projectRootEntries(childPage)
			entries = append(entries, mainEntry, linkEntry)
		} else if childPage.IsFlat() {
			entries = append(entries, flatPageEntries(childPage)...)
		} else {
			entries = append(entries, pageEntry(childPage))
		}
	}

	return toJsonObjectString(entries)
}

func pageEntry(page *Page) Entry {
	return Entry{
		name:  page.AsDirectoryName(),
		Title: pageTitleWithRoute(page),
		Href:  pointerToString(pageLink(page)),
	}
}

func flatPageEntries(page *Page) []Entry {
	entries := []Entry{{
		name:  "-- " + page.AsDirectoryName(),
		Title: page.AsTitle(),
		Type:  pointerToString(typeSeparator),
	}}

	for _, child := range page.Children {
		entries = append(entries, pageEntry(child))
	}

	return entries
}

func pageRootEntry(route string) Entry {
	href := fmt.Sprintf("/%s%s", route, "home")
	return Entry{
		name:  basePageNameOverride,
		Title: route + "Home",
		Href:  &href,
	}
}

func projectRootEntries(page *Page) (Entry, Entry) {
	name := page.AsDirectoryName()

	mainEntry := Entry{
		name:  name,
		Title: pageTitleWithRoute(page),
	}

	pageType := pointerToString(typePage)
	mainEntry.Type = pageType
	mainEntry.Display = pointerToString(displayHidden)

	homeLink := pageLink(page) + "/home"

	pageLinkEntry := Entry{
		name:  name + "_navlink",
		Title: page.AsTitle(),
		Href:  &homeLink,
		Type:  pageType,
	}

	return mainEntry, pageLinkEntry
}

func pageTitleWithRoute(page *Page) string {
	return page.ParentRoute() + page.AsTitle()
}

func pageLink(page *Page) string {
	return fmt.Sprintf("/%s%s", page.Route(), page.AsDirectoryName())
}

func toJsonObjectString(entries []Entry) (string, error) {
	res := "{\n"
	for i, entry := range entries {
		bytes, err := json.MarshalIndent(entry, "  ", "  ")
		if err != nil {
			return "", err
		}

		last := i == len(entries)-1
		comma := ","
		if last {
			comma = ""
		}
		res += fmt.Sprintf("  \"%s\": %s%s\n", entry.name, string(bytes), comma)
	}
	res += "}"
	return res, nil
}

func pointerToString(p string) *string {
	return &p
}
