package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
)

const (
	basePath = "./content/pages"
	genPath  = ".gen"
)

var (
	fileMatchRegex = regexp.MustCompile(`import (.*) from ["|'](.*)['|"]`)
)

type Gen struct {
	root       string
	knownFiles []string
}

type Directory struct {
	Name     string
	Path     string
	Children []Directory
	Files    []File
}

type File struct {
	Name    string
	Content string
}

func main() {
	err := os.RemoveAll(genPath)
	if err != nil {
		panic(err)
	}

	absBasePath, err := filepath.Abs(basePath)
	if err != nil {
		panic(err)
	}

	knownFiles := []string{fmt.Sprintf("%s/home.mdx", absBasePath)}

	gen := &Gen{
		root:       absBasePath,
		knownFiles: knownFiles,
	}

	structure, err := gen.walkFiles("", absBasePath)
	if err != nil {
		panic(err)
	}

	err = gen.generate(*structure)
	if err != nil {
		panic(err)
	}
}

func (g *Gen) generate(dir Directory) error {
	genPath, err := g.toGenPath(dir.Path)

	err = os.Mkdir(genPath, 0755)
	if err != nil {
		return err
	}

	for _, file := range dir.Files {
		err := g.generateCorrespondingFiles(dir.Path, file.Name, file.Content)
		if err != nil {
			return err
		}
	}

	for _, childDir := range dir.Children {
		err := g.generate(childDir)
		if err != nil {
			return err
		}
	}

	return nil
}

func (g *Gen) walkFiles(name, path string) (*Directory, error) {
	node := &Directory{
		Name:     name,
		Path:     path,
		Children: nil,
	}

	files, err := os.ReadDir(node.Path)
	if err != nil {
		panic(err)
	}

	var directories []string

	for _, file := range files {
		if file.IsDir() {
			directories = append(directories, file.Name())
		}

		filePath := fmt.Sprintf("%s/%s", node.Path, file.Name())

		if slices.Contains(g.knownFiles, filePath) {
			data, err := os.ReadFile(filePath)
			if err != nil {
				return nil, err
			}

			fileString := string(data)
			fileString, err = g.templateFile(file.Name(), fileString)
			if err != nil {
				return nil, err
			}

			node.Files = append(node.Files, File{
				Name:    file.Name(),
				Content: fileString,
			})

			// Extract imports from file
			matches := fileMatchRegex.FindAllStringSubmatch(fileString, -1)
			for _, match := range matches {
				if len(match) != 3 {
					println("invalid import match")
					continue
				}
				importPath := match[2]

				// Handle relative paths
				if importPath[0] == '.' {
					importPath = fmt.Sprintf("%s/%s", node.Path, importPath)
				} else {
					importPath = fmt.Sprintf("%s/%s", g.root, importPath)
				}

				importPath, err := filepath.Abs(importPath)
				if err != nil {
					return nil, err
				}

				g.knownFiles = append(g.knownFiles, importPath)
			}
		}
	}

	for _, dirName := range directories {
		dirPath := fmt.Sprintf("%s/%s", node.Path, dirName)

		childNode, err := g.walkFiles(dirName, dirPath)
		if err != nil {
			return nil, err
		}

		if childNode.Children != nil || childNode.Files != nil {
			node.Children = append(node.Children, *childNode)
		}
	}

	return node, nil
}

func (g *Gen) toRelativePath(path string) (string, error) {
	relativePath, ok := strings.CutPrefix(path, g.root)
	if !ok {
		return "", fmt.Errorf("path %s should start with %s", basePath, g.root)
	}

	return relativePath, nil
}
