package ui

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist
var UiAssets embed.FS

func New(addr string) (*http.Server, error) {
	routes := http.NewServeMux()

	reactApp, err := fs.Sub(UiAssets, "dist")
	if err != nil {
		return nil, err
	}

	routes.Handle("/", http.FileServerFS(reactApp))

	return &http.Server{
		Addr:    addr,
		Handler: routes,
	}, nil
}
