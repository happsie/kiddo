package tracking

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"

	"github.com/happsie/kiddo/internal/infra"
)

type Handlers struct {
	db infra.DB
}

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

func (h Handlers) UpdateTrackType(w http.ResponseWriter, r *http.Request) {

}

func (h Handlers) DeleteTrackType(w http.ResponseWriter, r *http.Request) {

}
