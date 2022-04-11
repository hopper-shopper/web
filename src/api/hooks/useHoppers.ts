import { HoppersFilter } from "api/filters/hoopers"
import { fetchHoppers } from "api/hoppers"
import useFetch from "hooks/useFetch"
import { Hopper } from "models/Hopper"

export type UseHoppersReturn = {
    hoppers: Hopper[]
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useHoppers(filter: HoppersFilter): UseHoppersReturn {
    const { adventure, market, permit, owner, tokenIds } = filter

    const signature = `${adventure}-${market}-${permit}-${owner}-${tokenIds?.join(",")}`
    const {
        data: hoppers,
        dataSignature,
        loading,
        error,
    } = useFetch(() => {
        return fetchHoppers(filter)
    }, signature)

    return {
        hoppers: hoppers ?? [],
        dataSignature,
        loading,
        error,
    }
}
