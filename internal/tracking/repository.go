package tracking

import "github.com/jackc/pgx/v5/pgxpool"

type Repository interface {
	GetAll() ([]TrackType, error)
	Create(trackType TrackType) (TrackType, error)
	Update(trackType TrackType) (TrackType, error)
}

type TrackingRepository struct {
	Pool *pgxpool.Pool
}

func GetAll() ([]TrackType, error) {
	return nil, nil
}

func Create(trackType TrackType) ([]TrackType, error) {
	return nil, nil
}

func Update(trackType TrackType) ([]TrackType, error) {
	return nil, nil
}
