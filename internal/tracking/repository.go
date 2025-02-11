package tracking

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository interface {
	GetAll(context context.Context) ([]TrackType, error)
	Create(context context.Context, trackType TrackType) error
	Update(context context.Context, trackType TrackType) error
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

func (r TrackingRepository) Create(context context.Context, trackType TrackType) error {
	_, err := r.Pool.Exec(context, "INSERT INTO track_types (name, emoji, color, metric_type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)", trackType.Name, trackType.Emoji, trackType.Color, trackType.MetricType, trackType.CreatedAt, trackType.UpdatedAt)
	if err != nil {
		return err
	}

	return nil
}

func (r TrackingRepository) Update(context context.Context, trackType TrackType) error {
	return nil
}
