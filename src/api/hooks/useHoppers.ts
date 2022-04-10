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
    const { adventure, market, permit } = filter

    const {
        value: hoppers = [],
        loading,
        error,
    } = useAsync(() => {
        return fetchHoppers({
            adventure,
            market,
            permit,
        })
    }, [adventure, market, permit])

    return {
        hoppers,
        loading,
        error,
    }
}
