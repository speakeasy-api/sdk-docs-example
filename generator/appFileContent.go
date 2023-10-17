package main

import (
  "bytes"
  "text/template"
)

func getAppFileContent(appFileProvided bool) (string, error) {
  importPath := "next/app"
  if appFileProvided {
    importPath = ".gen/_app"
  }

  tpl, err := templateFS.ReadFile("templates/_app.mdx.tmpl")
  if err != nil {
    return "", err
  }

  t, err := template.New("").Parse(string(tpl))
  if err != nil {
    return "", err
  }

  var buf bytes.Buffer
  err = t.Execute(&buf, map[string]string{
    "ImportPath": importPath,
  })
  if err != nil {
    return "", err
  }

  return buf.String(), nil
}
