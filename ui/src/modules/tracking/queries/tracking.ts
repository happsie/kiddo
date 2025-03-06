import { TrackType, TrackTypeRequest } from "../tracking"

export async function fetchTrackingTypes(): Promise<TrackType[]> {
    const data = await fetch('/api/kiddo/track-type-v1')
    return data.json()
}

export async function deleteTrackType(id: number): Promise<Response> {
    const data = await fetch(`/api/kiddo/track-type-v1/${id}`, {
        method: "DELETE"
    })
    return data
}

export async function createTrackType(request: TrackTypeRequest): Promise<Response> {
    const data = await fetch(`/api/kiddo/track-type-v1`, {
        method: "POST",
        body: JSON.stringify(request),
    })
    return data
}
