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

func (t *TrackingService) GetAll(context context.Context) ([]TrackType, error) {
	trackTypeItems, err := t.Repository.GetAll(context)
	if err != nil {
		return nil, err
	}
	return trackTypeItems, nil
}

func (t *TrackingService) Delete(context context.Context, trackID string) error {
	err := t.Repository.Delete(context, trackID)
	if err != nil {
		return err
	}
	return nil
}

func (t *TrackingService) CreateEvent(context context.Context, event TrackEvent) (int32, error) {
	ID, err := t.Repository.CreateEvent(context, event)
	if err != nil {
		return 0, err
	}
	return ID, nil
}
