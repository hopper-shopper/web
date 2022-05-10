import { fetchHoppersActivity } from "api/hoppers"
import { HoppersActivitySnapshot } from "models/Hopper"
import { useAsync } from "react-use"

type UseHoppersActivity = {
    activity: HoppersActivitySnapshot
    loading: boolean
    error: Error | null
}

export default function useHoppersActivity(): UseHoppersActivity {
    const { value, loading, error } = useAsync(fetchHoppersActivity, [])

    return {
        activity: value ?? DEFAULT_HOPPERS_ACTIVITY,
        loading,
        error: error ?? null,
    }
}

const DEFAULT_HOPPERS_ACTIVITY: HoppersActivitySnapshot = {
    idle: 0,
    breeding: 0,
    marketplace: 0,
    adventure: 0,
    pond: 0,
    stream: 0,
    swamp: 0,
    river: 0,
    forest: 0,
    greatLake: 0,
}
