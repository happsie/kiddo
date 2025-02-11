package tracking

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Handlers struct {
	Pool       *pgxpool.Pool
	Repository Repository
}

func (h Handlers) CreateTrackType(w http.ResponseWriter, r *http.Request) {
	trackTypeRequest := &TrackTypeRequest{}
	b, err := io.ReadAll(r.Body)
	if err != nil {
		slog.Error("could not read post body", "entity", "trackType", "err", err)
		return
	}
	err = json.Unmarshal(b, trackTypeRequest)
	if err != nil {
		slog.Error("could not unmarshal json body", "entity", "trackType", "err", err)
		return
	}
	slog.Debug("success reading track type", "trackType", trackTypeRequest)
	trackType := TrackType{
		Name:       trackTypeRequest.Name,
		Emoji:      trackTypeRequest.Emoji,
		Color:      trackTypeRequest.Color,
		MetricType: trackTypeRequest.MetricType,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
	err = h.Repository.Create(r.Context(), trackType)
	if err != nil {
		slog.Error("error inserting data", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (h Handlers) GetTrackTypes(w http.ResponseWriter, r *http.Request) {
	trackTypeItems, err := h.Repository.GetAll(r.Context())
	if err != nil {
		slog.Error("error reading track types", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(trackTypeItems)
	if err != nil {
		slog.Error("error reading track types", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Add("content-type", "application/json")
	w.Write(b)
}

func (h Handlers) UpdateTrackType(w http.ResponseWriter, r *http.Request) {

}

func (h Handlers) DeleteTrackType(w http.ResponseWriter, r *http.Request) {

}
