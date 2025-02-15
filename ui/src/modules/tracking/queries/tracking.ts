import { TrackType } from "../tracking"

export async function fetchTrackingTypes(): Promise<TrackType[]> {
    const data = await fetch('/api/kiddo/track-type-v1')
    return data.json()
}
