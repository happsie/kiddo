import { useQuery } from "react-query";

const getTrackTypes = async () => {
    const data = await fetch(`/api/kiddo/track-type-v1`);
    return data.json();
}

export const useTrackTypes = () => {
    return useQuery({
        queryKey: ['trackTypes'],
        queryFn: () => {
            return getTrackTypes();
        }
    });
}
