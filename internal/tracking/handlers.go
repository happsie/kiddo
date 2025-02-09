package tracking

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Handlers struct {
	Conn *pgxpool.Pool
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
	slog.Debug("success reading track type", "trackType", trackType)
	// just doing a raw query here in the handler just for PoC 
	h.Conn.Exec(r.Context(), "INSERT INTO track_type (id, name, emoji, color, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)", )
}

func (h Handlers) GetTrackTypes(w http.ResponseWriter, r *http.Request) {

}

func (h Handlers) UpdateTrackType(w http.ResponseWriter, r *http.Request) {

}

func (h Handlers) DeleteTrackType(w http.ResponseWriter, r *http.Request) {

}
