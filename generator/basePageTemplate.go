package main

import "fmt"

func getBasePageContent(filename string) string {
	template := `import Root from "/.gen/%s/%s.mdx"

<Root/>`

	return fmt.Sprintf(template, filename, filename)
}
