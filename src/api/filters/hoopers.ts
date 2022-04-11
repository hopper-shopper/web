import { WalletAddress } from "models/User"

export type HoppersFilter = {
    adventure?: AdventureFilter
    market?: MarketFilter
    permit?: PermitFilter
    tokenIds?: string[]
    owner?: WalletAddress
}

export enum AdventureFilter {
    ANY = "ANY",
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}
export function urlifyAdventureFilter(adventureFilter: AdventureFilter): string {
    switch (adventureFilter) {
        case AdventureFilter.ANY:
            return "any"
        case AdventureFilter.POND:
            return "pond"
        case AdventureFilter.STREAM:
            return "stream"
        case AdventureFilter.SWAMP:
            return "swamp"
        case AdventureFilter.RIVER:
            return "river"
        case AdventureFilter.FOREST:
            return "forest"
        case AdventureFilter.GREAT_LAKE:
            return "great-lake"
    }
}

export enum MarketFilter {
    ANY = "ANY",
    ON = "ON",
    OFF = "OFF",
}
export function urlifyMarketFilter(marketFilter: MarketFilter): string {
    switch (marketFilter) {
        case MarketFilter.ANY:
            return "any"
        case MarketFilter.ON:
            return "yes"
        case MarketFilter.OFF:
            return "no"
    }
}

export enum PermitFilter {
    ANY = "ANY",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}
export function urlifyPermitFilter(permitFilter: PermitFilter): string {
    switch (permitFilter) {
        case PermitFilter.ANY:
            return "any"
        case PermitFilter.RIVER:
            return "river"
        case PermitFilter.FOREST:
            return "forest"
        case PermitFilter.GREAT_LAKE:
            return "great-lake"
    }
}

export function urlifyTokenIdsFilter(tokenIds: string[]): string {
    return tokenIds.join(",")
}
