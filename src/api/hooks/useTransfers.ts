import { TransfersFilter } from "api/filters/transfers"
import { fetchTransfers } from "api/transfers"
import useFetch from "hooks/useFetch"
import { Transfer } from "models/Transfer"

type UseTransfersReturn = {
    transfers: Transfer[]
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useTransfers(filter: TransfersFilter): UseTransfersReturn {
    const { user, direction } = filter

    const signature = `${user}-${direction}`
    const { data, dataSignature, loading, error } = useFetch(() => {
        return fetchTransfers({ user, direction })
    }, signature)

    return {
        transfers: data ?? [],
        dataSignature,
        loading,
        error,
    }
}
