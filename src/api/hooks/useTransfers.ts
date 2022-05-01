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
    const { user, direction, type } = filter

    const signature = `${user}-${direction}-${type}`
    const { data, dataSignature, loading, error } = useFetch(() => {
        return fetchTransfers({ user, direction, type })
    }, signature)

    return {
        transfers: data ?? EMPTY_DATA,
        dataSignature,
        loading,
        error,
    }
}

const EMPTY_DATA: Transfer[] = []
