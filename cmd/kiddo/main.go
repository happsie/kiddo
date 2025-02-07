package main

import (
	"log/slog"
	"net/http"
	"os"

	"github.com/happsie/kiddo/internal"
	"github.com/happsie/kiddo/internal/infra"
)

// temp consts right now instead of actual config file
const (
	addr = ":8080"
	databaseURL = "postgres://kiddo:kiddo@192.168.50.20:5432/postgres?search_path=kiddo"
)

func main() {
	slog.Info("starting up kiddo!")
	conf := infra.Config{
		Database: infra.Database{
			URL: databaseURL,
		},
	}
	conn, err := infra.InitDB(conf.Database)
	if err != nil {
		slog.Error("error initializing database connection", "error", err)
		os.Exit(1)
	}
	mux := internal.SetupApi(conn)
	http.ListenAndServe(addr, mux)
}
