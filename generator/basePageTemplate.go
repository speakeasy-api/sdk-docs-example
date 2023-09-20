package main

import "fmt"

func getBasePageContent(location, filename string) string {
	template := `import Root from "/.gen/pages/%s/%s.mdx"
import {RootContainer} from "/components/rootContainer";

<RootContainer>
	<Root/>
</RootContainer>`

	return fmt.Sprintf(template, location, filename)
}
