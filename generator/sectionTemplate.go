package main

import (
	"fmt"
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

	upper := strings.Title(name)
	return fmt.Sprintf(template, upper, name, route, upper)
}
