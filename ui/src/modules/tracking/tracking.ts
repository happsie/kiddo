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
