package main

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
)

type Entry struct {
	name  string
	Title string  `json:"title"`
	Href  *string `json:"href,omitempty"`
	Type  *string `json:"type,omitempty"`
}

func getMetaJsonContent(page Page) (string, error) {
	var pages []Entry

	for _, childPage := range page.Children {
		dirName := page.SanitizedName()
		dirName += "/"

		title := fmt.Sprintf("%s%s", dirName, toTitleCase(childPage.Name))
		href := fmt.Sprintf("/%s%s", dirName, toSnakeCase(childPage.Name))
		pages = append(pages, Entry{
			name:  toDirectoryCase(childPage.Name),
			Title: title,
			Href:  &href,
		})
	}

	return toJsonObjectString(pages)
}

func getRootMetaJsonContent(rootPage *Page, otherPages []*Page) (string, error) {
	rootHref := "/"
	pages := []Entry{{
		name:  "[[...slug]]",
		Title: "Home",
		Href:  &rootHref,
	}}

	for _, childPage := range rootPage.Children {
		title := fmt.Sprintf("%s", toTitleCase(childPage.Name))
		href := fmt.Sprintf("/%s", toSnakeCase(childPage.Name))
		pages = append(pages, Entry{
			name:  toDirectoryCase(childPage.Name),
			Title: title,
			Href:  &href,
		})
	}

	for _, page := range otherPages {
		title := fmt.Sprintf("%s", toTitleCase(page.Name))
		type_ := "page"
		pages = append(pages, Entry{
			name:  toDirectoryCase(page.Name),
			Title: title,
			Type:  &type_,
		})
	}

	return toJsonObjectString(pages)
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
