package main

import "fmt"

func getBasePageContent(filename string) string {
	template := `import Root from "/.gen/%s"

<Root/>`

	return fmt.Sprintf(template, filename)
}
