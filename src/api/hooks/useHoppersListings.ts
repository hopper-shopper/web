import { fetchHoppersListings } from "api/market"
import { Listing } from "models/Listing"
import { useAsync } from "react-use"

export type UseHoppersListingsReturn = {
    listings: Listing[]
    loading: boolean
    error: Error | undefined
}

export default function useHoppersListings(hoppersIds: string[]): UseHoppersListingsReturn {
    const signature = hoppersIds.join("-")

    const {
        value: listings = [],
        loading,
        error,
    } = useAsync(() => {
        return fetchHoppersListings(hoppersIds)
    }, [signature])

    return {
        listings,
        loading,
        error,
    }
}
