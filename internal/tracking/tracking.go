package tracking 

import "time"

type TrackType struct {
	ID        int32
	Name      string
	Emoji     string
	Color     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type TrackEvent struct {
	ID        int32
	EventType string
	Data      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
