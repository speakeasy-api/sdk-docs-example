package main

import (
	"regexp"
	"strings"
)

func toSnakeCase(str string) string {
	matchFirstCap := regexp.MustCompile("(.)([A-Z][a-z]+)")
	matchAllCap := regexp.MustCompile("([a-z0-9])([A-Z])")

	snake := matchFirstCap.ReplaceAllString(str, "${1}_${2}")
	snake = matchAllCap.ReplaceAllString(snake, "${1}_${2}")
	return strings.ToLower(snake)
}

func toTitleCase(str string) string {
	matchCaps := regexp.MustCompile(`([A-Z]+)`)
	str = matchCaps.ReplaceAllString(str, ` $1`)

	str = strings.ReplaceAll(str, "_", " ")
	str = strings.Title(str)

	str = strings.Trim(str, " ")
	return strings.Title(str)
}
