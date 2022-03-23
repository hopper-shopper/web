export type HoppersFilter = {
    adventure: AdventureFilter
    market: MarketFilter
}

export enum AdventureFilter {
    ANY = "ANY",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}
export function urlifyAdventureFilter(adventureFilter: AdventureFilter): string {
    switch (adventureFilter) {
        case AdventureFilter.ANY:
            return "any"
        case AdventureFilter.RIVER:
            return "river"
        case AdventureFilter.FOREST:
            return "forest"
        case AdventureFilter.GREAT_LAKE:
            return "great-lake"
    }
}

export enum MarketFilter {
    ON = "ON",
    OFF = "OFF",
    ANY = "ANY",
}
export function urlifyMarketFilter(marketFilter: MarketFilter): string {
    switch (marketFilter) {
        case MarketFilter.ANY:
            return "any"
        case MarketFilter.ON:
            return "on"
        case MarketFilter.OFF:
            return "off"
    }
}
