import { ListingsFilter } from "api/filters/market"
import { fetchHoppersListings } from "api/market"
import useFetch from "hooks/useFetch"
import { Listing } from "models/Listing"

export type UseHoppersListingsReturn = {
    listings: Listing[]
    dataSignature: string | null
    loading: boolean
    error: Error | null
}

export default function useHoppersListings(filter: ListingsFilter): UseHoppersListingsReturn {
    const { tokenIds, sold } = filter

    const signature = `${tokenIds.join("-")}-${sold}`
    const {
        data: listings,
        dataSignature,
        loading,
        error,
    } = useFetch(() => {
        return fetchHoppersListings(filter)
    }, signature)

    return {
        listings: listings ?? [],
        dataSignature,
        loading,
        error,
    }
}
