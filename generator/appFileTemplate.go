package main

import "fmt"

func getAppFileContent(appFileProvided bool) string {
	template := `import React from 'react'
import {ScrollManager} from "../components/scrollManager";
import App from "%s";
import "../styles/styles.css"

class MyApp extends App {
    render() {
        return <ScrollManager>
            {super.render()}
        </ScrollManager>
    }
}

export default MyApp`

	importPath := "next/app"
	if appFileProvided {
		importPath = "../.gen/_app"
	}
	return fmt.Sprintf(template, importPath)
}
