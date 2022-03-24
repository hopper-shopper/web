import { HoppersFilter } from "api/filters/hoopers"
import { fetchHoppers } from "api/hoppers"
import { Hopper } from "models/Hopper"
import { useAsync, useAsyncFn, useEffectOnce, useInterval } from "react-use"

export type UseHoppersReturn = {
    hoppers: Hopper[]
    loading: boolean
    error: Error | undefined
}

export default function useHoppers(filter: HoppersFilter): UseHoppersReturn {
    const { adventure, market } = filter

    const [{ value: hoppers = [], loading, error }, fetch] = useAsyncFn(() => {
        return fetchHoppers({
            adventure,
            market,
        })
    }, [adventure, market])

    useEffectOnce(() => {
        fetch()
    })

    useInterval(fetch, 30 * 1000)

    return {
        hoppers,
        loading,
        error,
    }
}
