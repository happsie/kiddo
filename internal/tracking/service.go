package tracking

import (
	"context"
	"log/slog"
)

type TrackingService struct {
	Repository Repository
}

func (t *TrackingService) Create(context context.Context, trackType TrackType) (int32, error) {
	ID, err := t.Repository.Create(context, trackType)
	if err != nil {
		slog.Error("error inserting data", "error", err)
		return 0, err
	}
	return ID, nil
}
