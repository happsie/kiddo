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

func fromRequest(request TrackTypeRequest) TrackType {
	return TrackType{
		Name:       request.Name,
		Emoji:      request.Emoji,
		Color:      request.Color,
		MetricType: request.MetricType,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
}
