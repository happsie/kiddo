export type TrackType = {
    id: number;
    name: string;
    emoji: string;
    color: string;
    metricType: 'this' | 'that'
    createdAt: string;
    updatedAt: string;
}

export type TrackTypeRequest = Omit<TrackType, 'id' | 'createdAt' | 'updatedAt'>

export type TrackEvent = {
    id?: number;
    type: string;
    data: unknown;
    createdAt?: string;
    updatedAt?: string;
};

export type TrackEventRequest = Omit<TrackEvent, 'id' | 'createdAt' | 'updatedAt'>

export type DefaultTrackEvent = {
    trackItemId: number;
    time: Date;
    metricType: 'this' | 'that';
    metric: number;
    createdAt?: Date;
    updatedAt?: Date;
}
