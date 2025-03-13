import { useMutation } from "react-query"
import { TrackEventRequest } from "src/models/tracking"

const createTrackEvent = async (request: TrackEventRequest) => {
    const data = await fetch(`/api/kiddo/track-event-v1`, {
        method: "POST",
        body: JSON.stringify(request),
    });
    return data;
}

export const useCreateTrackEvent = () => {
    return useMutation({
        mutationFn: (event: TrackEventRequest) => {
            return createTrackEvent(event);
        }
    });
}
