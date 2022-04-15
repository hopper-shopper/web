import { fetchBaseSharesHistory } from "api/baseShares"
import { BaseSharesHistoryFilter } from "api/filters/baseShares"
import useFetch from "hooks/useFetch"
import { BaseShare } from "models/BaseShare"

export type UseBaseSharesHistoryReturn = {
    baseShares: BaseShare[]
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useBaseSharesHistory(
    filter: BaseSharesHistoryFilter,
): UseBaseSharesHistoryReturn {
    const { adventure } = filter

    const signature = `${adventure}`
    const {
        data: baseShares,
        dataSignature,
        loading,
        error,
    } = useFetch(() => {
        return fetchBaseSharesHistory(filter)
    }, signature)

    return {
        baseShares: baseShares ?? [],
        dataSignature,
        loading,
        error,
    }
}
