import { HoppersFilter } from "api/filters/hoopers"
import { fetchHoppers } from "api/hoppers"
import { Hopper } from "models/Hopper"
import { useAsync } from "react-use"

export type UseHoppersReturn = {
    hoppers: Hopper[]
    loading: boolean
    error: Error | undefined
}

export default function useHoppers(filter: HoppersFilter): UseHoppersReturn {
    const { adventure, market } = filter

    const {
        value: hoppers = [],
        loading,
        error,
    } = useAsync(() => {
        return fetchHoppers({
            adventure,
            market,
        })
    }, [adventure, market])

    return {
        hoppers,
        loading,
        error,
    }
}
