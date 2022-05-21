import { fetchHopperActivitiesHistory } from "api/hoppers"
import { HopperActivitiesSnapshot } from "models/Hopper"
import { useAsync } from "react-use"

type UseHoppersActivity = {
    activities: HopperActivitiesSnapshot[]
    loading: boolean
    error: Error | null
}

export default function useHopperActivitiesHistory(): UseHoppersActivity {
    const { value, loading, error } = useAsync(fetchHopperActivitiesHistory, [])

    return {
        activities: value ?? [],
        loading,
        error: error ?? null,
    }
}
