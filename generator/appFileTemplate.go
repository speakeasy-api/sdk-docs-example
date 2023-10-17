package main

import "fmt"

func getAppFileContent(appFileProvided, isMultipage bool) string {
	template := `import { createElement } from 'react';
import { ScrollManager, MultiPageContext } from 'components/scrollManager';

import genApp from '%s';

import '@/styles/index.scss';

export default function App(props) {
  const renderedApp = createElement(genApp, props);

  return (
    <MultiPageContext.Provider value={%t}>
      <ScrollManager>
        {renderedApp}
      </ScrollManager>
    </MultiPageContext.Provider>
  )
}
`

	importPath := "next/app"
	if appFileProvided {
		importPath = ".gen/_app"
	}
	return fmt.Sprintf(template, importPath, isMultipage)
}
