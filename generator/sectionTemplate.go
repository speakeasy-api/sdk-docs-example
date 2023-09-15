package main

import (
	"fmt"
	"regexp"
	"strings"
)

const template = `import %s from './%s_content.mdx';
import {DocsSection} from "/components/docsSection";

<DocsSection route={"%s"}>
    <%s/>
</DocsSection>
`

func wrapDocsSection(route, name string) string {
	if strings.HasPrefix(route, "/") {
		route = route[1:]
	}
	route = toSnakeCase(route)

	if route == "root" {
		route = ""
	}

	upper := strings.Title(name)
	return fmt.Sprintf(template, upper, name, route, upper)
}

var matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
var matchAllCap = regexp.MustCompile("([a-z0-9])([A-Z])")

func toSnakeCase(str string) string {
	snake := matchFirstCap.ReplaceAllString(str, "${1}_${2}")
	snake = matchAllCap.ReplaceAllString(snake, "${1}_${2}")
	return strings.ToLower(snake)
}
