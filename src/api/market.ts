import { Listing } from "models/Listing"
import { urlifyTokenIdsFilter } from "./filters/hoopers"
import { ListingsFilter, SoldFilter, urlifySoldFilter } from "./filters/market"

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT

type GetHoppersListingsResponse = {
    data: Listing[]
}

export function getHoppersListingsUrl(filter: ListingsFilter): string {
    const params = new URLSearchParams([
        ["tokenIds", urlifyTokenIdsFilter(filter.tokenIds)],
        ["sold", urlifySoldFilter(filter.sold ?? SoldFilter.ANY)],
    ])

    return `${ENDPOINT}/market?${params.toString()}`
}
export async function fetchHoppersListings(filter: ListingsFilter): Promise<Listing[]> {
    if (filter.tokenIds.length === 0) {
        return Promise.resolve([])
    }

    const response = await fetch(getHoppersListingsUrl(filter))
    const json = (await response.json()) as GetHoppersListingsResponse

    return json.data
}
