package main

import (
	"github.com/happsie/kiddo/ui"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
)

const (
	uiAddr string = ":8000"
)

func main() {
	slog.Info("starting up kiddo!")
	uiServer, err := ui.New(uiAddr)
	if err != nil {
		slog.Error("error setting up ui", "error", err)
		return
	}
	go func() {
		slog.Info("starting up ui server", "port", uiAddr)
		err := uiServer.ListenAndServe()
		if err != nil {
			slog.Error("error starting server", "error", err)
		}
	}()
	done := make(chan os.Signal, 1)
	signal.Notify(done, syscall.SIGINT, syscall.SIGTERM)
	<-done
	err = uiServer.Close()
	if err != nil {
		slog.Error("got error during shutdown from ui server", "error", err)
		return
	}
	slog.Info("shutting down")
}
