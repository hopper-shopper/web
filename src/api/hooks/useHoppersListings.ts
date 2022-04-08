import { ListingsFilter } from "api/filters/market"
import { fetchHoppersListings } from "api/market"
import { Listing } from "models/Listing"
import { useAsync } from "react-use"

export type UseHoppersListingsReturn = {
    listings: Listing[]
    loading: boolean
    error: Error | undefined
}

export default function useHoppersListings(filter: ListingsFilter): UseHoppersListingsReturn {
    const signature = `${filter.tokenIds.join("-")}-${filter.sold}`

    const {
        value: listings = [],
        loading,
        error,
    } = useAsync(() => {
        return fetchHoppersListings(filter)
    }, [signature])

    return {
        listings,
        loading,
        error,
    }
}
