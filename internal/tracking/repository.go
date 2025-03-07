package tracking

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository interface {
	GetAll(context context.Context) ([]TrackType, error)
	Create(context context.Context, trackType TrackType) (int32, error)
	Update(context context.Context, trackType TrackType) error
	Delete(context context.Context, trackID string) error
	CreateEvent(context context.Context, event TrackEvent) (int32, error)
}

type TrackingRepository struct {
	Pool *pgxpool.Pool
}

func (r TrackingRepository) GetAll(context context.Context) ([]TrackType, error) {
	rows, err := r.Pool.Query(context, "SELECT id, name, emoji, color, metric_type, created_at, updated_at FROM track_types")
	if err != nil {
		return nil, err
	}
	var trackTypeItems []TrackType
	for rows.Next() {
		trackType := TrackType{}
		err := rows.Scan(&trackType.ID, &trackType.Name, &trackType.Emoji, &trackType.Color, &trackType.MetricType, &trackType.CreatedAt, &trackType.UpdatedAt)
		if err != nil {
			return nil, err
		}
		trackTypeItems = append(trackTypeItems, trackType)
	}
	return trackTypeItems, nil
}

func (r TrackingRepository) Create(context context.Context, trackType TrackType) (int32, error) {
	row := r.Pool.QueryRow(context, "INSERT INTO track_types (name, emoji, color, metric_type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", trackType.Name, trackType.Emoji, trackType.Color, trackType.MetricType, trackType.CreatedAt, trackType.UpdatedAt)
	var ID int32
	err := row.Scan(&ID)
	if err != nil {
		return 0, err
	}
	return ID, nil
}

func (r TrackingRepository) Update(context context.Context, trackType TrackType) error {
	return nil
}

func (r TrackingRepository) Delete(context context.Context, trackID string) error {
	_, err := r.Pool.Exec(context, "DELETE FROM track_types WHERE id = $1", trackID)
	if err != nil {
		return err
	}
	return nil
}

func (r TrackingRepository) CreateEvent(context context.Context, event TrackEvent) (int32, error) {
	row := r.Pool.QueryRow(context, "INSERT INTO track_event (type, data, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id", event.Type, event.Data, event.CreatedAt, event.UpdatedAt)
	var ID int32
	err := row.Scan(&ID)
	if err != nil {
		return 0, err
	}		
	return ID, nil
}
