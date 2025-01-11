package internal

import (
	"net/http"
)

func SetupApi() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/kiddo/food-type", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("food-type"))
	})

	return mux
}
