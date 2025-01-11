package main

import (
	"log/slog"
	"net/http"

	"github.com/happsie/kiddo/internal"
)

const (
	addr = ":8080"
)

func main() {
	slog.Info("starting up kiddo!")
	mux := internal.SetupApi()
	http.ListenAndServe(addr, mux)
}
