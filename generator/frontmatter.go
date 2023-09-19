package main

import (
	"fmt"
	"regexp"
)

var (
	frontMatterRegex = regexp.MustCompile(`(?ms)^---$(.*)^---$`)
	groupTypeRegex   = regexp.MustCompile(`group_type: (.*)`)
)

type FrontMatter struct {
	GroupType string
}

func parseFrontMatter(content string) (*FrontMatter, error) {
	match := frontMatterRegex.FindStringSubmatch(content)
	if len(match) == 0 {
		return nil, nil
	}

	if len(match) != 2 {
		return nil, fmt.Errorf("invalid front matter")
	}

	groupType := groupTypeRegex.FindStringSubmatch(match[1])
	if len(groupType) != 2 {
		return nil, nil
	} else {
		return &FrontMatter{
			GroupType: groupType[1],
		}, nil
	}
}
