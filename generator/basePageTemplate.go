package main

import "fmt"

func getBasePageContent(page Page) string {
	template := `---
title: %s
description: %s
---

import Root from "/.gen/pages/%s/%s.mdx"
import {RootContainer} from "/components/rootContainer";

<RootContainer>
	<Root/>
</RootContainer>`

	frontMatter := page.FrontMatter
	if frontMatter == nil {
		frontMatter = &FrontMatter{}
	}
	if frontMatter.Title == "" {
		frontMatter.Title = page.AsTitle()
	}

	return fmt.Sprintf(template, frontMatter.Title, frontMatter.Description, page.SrcName, page.Name)
}
