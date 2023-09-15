package main

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
)

type Entry struct {
	name    string
	Title   string  `json:"title"`
	Href    *string `json:"href,omitempty"`
	Type    *string `json:"type,omitempty"`
	Display *string `json:"display,omitempty"`
}

func getMetaJsonContent(page Page) (string, error) {
	return getMetaJsonContentForSubpages(page.Route(), page.Children, false, page.IsRoot())
}

func getMetaJsonContentForSubpages(route string, pages []*Page, isProjectRoot, isPageRoot bool) (string, error) {
	var entries []Entry

	if isPageRoot {
		href := fmt.Sprintf("/%s%s", route, "home")
		entries = append(entries, Entry{
			name:  "[...slug]",
			Title: route + "Home",
			Href:  &href,
		})
	}

	for _, childPage := range pages {
		name := toDirectoryCase(childPage.Name)
		baseTitle := toTitleCase(childPage.Name)
		title := fmt.Sprintf("%s%s", route, baseTitle)
		href := fmt.Sprintf("/%s%s", route, toSnakeCase(childPage.Name))

		entry := Entry{
			name:  name,
			Title: title,
		}

		// If this is the root _meta.json, we need to hide the actual page and add an additional entry
		// that serves only as the link in the navbar
		if isProjectRoot {
			p := "page"
			display := "hidden"
			entry.Type = &p
			entry.Display = &display

			homeLink := href + "/home"

			pageLinkEntry := Entry{
				name:  name + "_navlink",
				Title: baseTitle,
				Href:  &homeLink,
				Type:  &p,
			}

			entries = append(entries, pageLinkEntry)
		} else {
			entry.Href = &href
		}

		entries = append(entries, entry)
	}

	return toJsonObjectString(entries)
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

func toTitleCase(str string) string {
	re := regexp.MustCompile(`([A-Z]+)`)
	str = re.ReplaceAllString(str, ` $1`)
	str = strings.Trim(str, " ")
	return strings.Title(str)
}
