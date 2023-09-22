package main

type File struct {
	Name    string
	content string
	parent  *Page
}

func (f *File) IsMainFile() bool {
	return f.Name == f.parent.Name+".mdx"
}
