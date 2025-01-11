package tracking 

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
)

type Handlers struct {
}

/*
	mux.HandleFunc("POST /api/kiddo/track-type-v1", func(w http.ResponseWriter, r *http.Request) {
	})

	mux.HandleFunc("GET /api/kiddo/track-type-v1", func(w http.ResponseWriter, r *http.Request) {

	})

	mux.HandleFunc("PUT /api/kiddo/track-type-v1/{trackID}", func(w http.ResponseWriter, r *http.Request) {
	})
*/

func (h Handlers) CreateTrackType(w http.ResponseWriter, r *http.Request) {
	trackType := &TrackType{}
	b, err := io.ReadAll(r.Body)
	if err != nil {
		slog.Error("could not read post body", "entity", "trackType", "err", err)
		return
	}
	err = json.Unmarshal(b, trackType)
	if err != nil {
		slog.Error("could not unmarshal json body", "entity", "trackType", "err", err)
		return
	}
	slog.Info("success reading track type", "trackType", trackType)
}

func (h Handlers) GetTrackTypes(w http.ResponseWriter, r *http.Request) {

}

func (h Handlers) GetTrackType(w http.ResponseWriter, r *http.Request) {

}
