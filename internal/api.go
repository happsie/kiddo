package internal

import (
	"net/http"

	"github.com/happsie/kiddo/internal/tracking"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupApi(pool *pgxpool.Pool) *http.ServeMux {
	trackHandler := tracking.Handlers{
		Pool: pool,
		TrackingService: tracking.TrackingService{
			Repository: tracking.TrackingRepository{
				Pool: pool,
			},
		},
		Repository: tracking.TrackingRepository{
			Pool: pool,
		},
	}
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/kiddo/track-type-v1", trackHandler.CreateTrackType)
	mux.HandleFunc("GET /api/kiddo/track-type-v1", trackHandler.GetTrackTypes)
	mux.HandleFunc("PUT /api/kiddo/track-type-v1/{trackID}", trackHandler.UpdateTrackType)
	mux.HandleFunc("DELETE /api/kiddo/track-type-v1/{trackID}", trackHandler.DeleteTrackType)

	mux.HandleFunc("GET /api/kiddo/track-events-v1", func(w http.ResponseWriter, r *http.Request) {
	})

	mux.HandleFunc("GET /api/kiddo/track-events-v1/{eventID}", func(w http.ResponseWriter, r *http.Request) {
	})

	return mux
}
