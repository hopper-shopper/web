import { TransfersFilter } from "api/filters/transfers"
import { fetchTransfers } from "api/transfers"
import { Transfer } from "models/Transfer"
import { useAsync } from "react-use"

export type UseTransfersReturn = {
    transfers: Transfer[]
    loading: boolean
    error: Error | undefined
}

export default function useTransfers(filter: TransfersFilter): UseTransfersReturn {
    const { user, direction } = filter

    const {
        value: transfers = [],
        loading,
        error,
    } = useAsync(() => {
        return fetchTransfers({
            user,
            direction,
        })
    }, [user, direction])

    return {
        transfers,
        loading,
        error,
    }
}
