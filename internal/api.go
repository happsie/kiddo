package internal

import (
	"net/http"

	"github.com/happsie/kiddo/internal/infra"
	"github.com/happsie/kiddo/internal/tracking"
	"github.com/jackc/pgx/v5/pgxpool"
)

func StartWebserver(addr string, pool *pgxpool.Pool) {
	trackHandler := tracking.Handlers{
		TrackingService: tracking.TrackingService{
			Repository: tracking.TrackingRepository{
				Pool: pool,
			},
		},
	}
	mux := infra.NewLoggingServeMux() 

	mux.HandleFunc("POST /api/kiddo/track-type-v1", trackHandler.CreateTrackType)
	mux.HandleFunc("GET /api/kiddo/track-type-v1", trackHandler.GetTrackTypes)
	mux.HandleFunc("PUT /api/kiddo/track-type-v1/{trackID}", trackHandler.UpdateTrackType)
	mux.HandleFunc("DELETE /api/kiddo/track-type-v1/{trackID}", trackHandler.DeleteTrackType)

	mux.HandleFunc("GET /api/kiddo/track-events-v1", func(w http.ResponseWriter, r *http.Request) {
	})

	mux.HandleFunc("GET /api/kiddo/track-events-v1/{eventID}", func(w http.ResponseWriter, r *http.Request) {
	})

	http.ListenAndServe(addr, mux)
}
