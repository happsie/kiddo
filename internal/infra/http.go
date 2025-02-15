package infra

import (
	"log/slog"
	"net/http"
	"strings"
)

type LoggingServeMux struct {
	mux *http.ServeMux
}

func NewLoggingServeMux() *LoggingServeMux {
	return &LoggingServeMux{
		mux: http.NewServeMux(),
	}
}

func (l *LoggingServeMux) HandleFunc(pattern string, handler func(http.ResponseWriter, *http.Request)) {
	slog.Info("Registering route", "method", strings.Split(pattern, " ")[0], "path", strings.Split(pattern, " ")[1])
	l.mux.HandleFunc(pattern, handler)
}

func (l *LoggingServeMux) Handle(pattern string, handler func(http.ResponseWriter, *http.Request)) {
	slog.Info("Registering route", "method", strings.Split(pattern, " ")[0], "path", strings.Split(pattern, " ")[1])
	l.mux.HandleFunc(pattern, handler)
}

func (l *LoggingServeMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	l.mux.ServeHTTP(w, r)
}
