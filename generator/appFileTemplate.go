package main

import "fmt"

func getAppFileContent(appFileProvided bool) string {
	template := `import { createElement } from 'react';

import { ScrollManager } from 'components/scrollManager';

import genApp from '%s';

import '@/styles/index.scss';

export default function App(props) {
    const renderedApp = createElement(genApp, props);

  return (
    <ScrollManager>
        {renderedApp}
    </ScrollManager>
  )
}`

	importPath := "next/app"
	if appFileProvided {
		importPath = ".gen/_app"
	}
	return fmt.Sprintf(template, importPath)
}
