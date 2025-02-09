package tracking

import "time"

type TrackType struct {
	ID         int32
	Name       string
	Emoji      string
	Color      string
	MetricType string
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type TrackTypeRequest struct {
	Name       string
	Emoji      string
	Color      string
	MetricType string
}

type TrackEvent struct {
	ID        int32
	EventType string
	Data      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
