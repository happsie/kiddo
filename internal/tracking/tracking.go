package tracking

import "time"

type TrackType struct {
	ID         int32     `json:"id"`
	Name       string    `json:"name"`
	Emoji      string    `json:"emoji"`
	Color      string    `json:"color"`
	MetricType string    `json:"metricType"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

type TrackTypeRequest struct {
	Name       string
	Emoji      string
	Color      string
	MetricType string
}

type TrackEvent struct {
	ID        int32
	Type      string
	Data      any 
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
