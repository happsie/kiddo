package tracking

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

type Handlers struct {
	TrackingService TrackingService
}

func (h Handlers) CreateTrackType(w http.ResponseWriter, r *http.Request) {
	trackTypeRequest := TrackTypeRequest{}
	b, err := io.ReadAll(r.Body)
	if err != nil {
		slog.Error("could not read post body", "entity", "trackType", "err", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(b, &trackTypeRequest)
	if err != nil {
		slog.Error("could not unmarshal json body", "entity", "trackType", "err", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	trackType := fromTrackTypeRequest(trackTypeRequest)
	ID, err := h.TrackingService.Create(r.Context(), trackType)
	if err != nil {
		slog.Error("error storing data", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	trackType.ID = ID
	b, err = json.Marshal(trackType)
	if err != nil {
		slog.Error("could not marshal return json", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.Header().Add("content-type", "application/json")
	w.Write(b)
}

func (h Handlers) GetTrackTypes(w http.ResponseWriter, r *http.Request) {
	trackTypeItems, err := h.TrackingService.GetAll(r.Context())
	if err != nil {
		slog.Error("error reading track types", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(trackTypeItems)
	if err != nil {
		slog.Error("error marshalling track types", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Add("content-type", "application/json")
	w.Write(b)
}

func (h Handlers) DeleteTrackType(w http.ResponseWriter, r *http.Request) {
	trackID := r.PathValue("trackID")
	if trackID == "" {
		slog.Error("error parsing trackID", "error", fmt.Errorf("no trackID provided"))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	err := h.TrackingService.Delete(r.Context(), trackID)
	if err != nil {
		slog.Error("could not delete track type", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (h Handlers) CreateEvent(w http.ResponseWriter, r *http.Request) {
	request := TrackEventRequest{}
	b, err := io.ReadAll(r.Body)
	if err != nil {
		slog.Error("could not read post body", "entity", "track event", "err", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(b, &request)
	if err != nil {
		slog.Error("could not unmarshal json body", "entity", "track event", "err", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	event := fromTrackEventRequest(request)
	ID, err := h.TrackingService.CreateEvent(r.Context(), event)
	if err != nil {
		slog.Error("could not delete track type", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	slog.Info("event created", "ID", ID)
	event.ID = ID
	b, err = json.Marshal(event)
	if err != nil {
		slog.Error("could not marshal json", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return 
	}
	w.Write(b)
}
