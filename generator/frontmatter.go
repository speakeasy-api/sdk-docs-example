package main

import (
	"fmt"
	"regexp"
)

var (
	frontMatterRegex = regexp.MustCompile(`(?ms)^---$(.*)^---$`)
)

type FrontMatter struct {
	Title       string
	Description string
	GroupType   string
}

func parseFrontMatter(content string) (*FrontMatter, error) {
	match := frontMatterRegex.FindStringSubmatch(content)
	if len(match) == 0 {
		return nil, nil
	}

	if len(match) != 2 {
		return nil, fmt.Errorf("invalid front matter")
	}

	frontMatter := match[1]

	return &FrontMatter{
		Title:       configValue(frontMatter, "title"),
		Description: configValue(frontMatter, "description"),
		GroupType:   configValue(frontMatter, "group_type"),
	}, nil
}

func configValue(content, config string) string {
	regex := regexp.MustCompile(fmt.Sprintf(`%s: (.*)`, config))
	matches := regex.FindStringSubmatch(content)
	if len(matches) != 2 {
		return ""
	} else {
		return matches[1]
	}
}
