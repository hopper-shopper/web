import {
    AdventureTierPermit,
    WatchlistMarketFilter,
} from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import { Hopper, HopperId } from "models/Hopper"
import { Adventure, getIdealAdventure, getRatingByAdventure } from "utils/adventures"
import { activityToAdventure } from "utils/hopper"
import { compareNumber, FilterFn, NumberComparison } from "./_common"

export function getHoppersRatingFilter(
    adventure: Adventure,
    comparison: NumberComparison,
    value: number,
): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const rating = getRatingByAdventure(adventure, hopper)
            return compareNumber(comparison, rating * 100, value)
        })
    }
    filter.signature = `rating-filter-${adventure}-${comparison}-${value}`
    return filter
}

export function getHoppersPermitFilter(adventure: Adventure): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const rating = getRatingByAdventure(adventure, hopper)
            return rating > 0
        })
    }
    filter.signature = `adventure-filter-${adventure}`
    return filter
}

export function getHoppersFertilityFilter(
    comparison: NumberComparison,
    value: number,
): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            return compareNumber(comparison, hopper.fertility, value)
        })
    }
    filter.signature = `fertility-filter-${comparison}-${value}`
    return filter
}

export function getHoppersMarketFilter(marketFilter: WatchlistMarketFilter): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            switch (marketFilter) {
                case WatchlistMarketFilter.ANY:
                    return true
                case WatchlistMarketFilter.ON_MARKET:
                    return hopper.price > 0
                case WatchlistMarketFilter.OFF_MARKET:
                    return hopper.price === 0
            }
        })
    }
    filter.signature = `market-filter-${marketFilter}`
    return filter
}

export function getHoppersOnWatchlistFilter(watchlist: HopperId[]): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            return watchlist.includes(hopper.tokenId)
        })
    }
    filter.signature = `watchlist-filter-${watchlist.join(",")}`
    return filter
}

export function getHoppersTierPermitFilter(permits: AdventureTierPermit[]): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const getAdventure = (permit: AdventureTierPermit): Adventure[] => {
                switch (permit) {
                    case AdventureTierPermit.T1:
                        return [Adventure.POND, Adventure.STREAM, Adventure.SWAMP]
                    case AdventureTierPermit.T2:
                        return [Adventure.RIVER]
                    case AdventureTierPermit.T3:
                        return [Adventure.FOREST]
                    case AdventureTierPermit.T4:
                        return [Adventure.GREAT_LAKE]
                }
            }

            return permits.some(permit => {
                const adventures = getAdventure(permit)

                return adventures.some(adventure => {
                    const rating = getRatingByAdventure(adventure, hopper)
                    return rating > 0
                })
            })
        })
    }
    filter.signature = `adventure-tier-filter-${permits.join(",")}`
    return filter
}

export function getHoppersNotWithinIdealAdventure(): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const currentAdventure = activityToAdventure(hopper.activity)
            const idealAdventure = getIdealAdventure(hopper)

            if (currentAdventure === null) {
                return false
            }

            return currentAdventure !== idealAdventure
        })
    }
    filter.signature = `hopper-not-within-ideal-adventure`
    return filter
}
