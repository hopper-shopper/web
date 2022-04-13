import { WatchlistMarketFilter } from "components/watchlist/configure-watchlist-filter/ConfigureWatchlistFilter"
import { Hopper, HopperId } from "models/Hopper"
import { Adventure, getRatingByAdventure } from "utils/adventures"
import { normalize } from "utils/numbers"
import { compareNumber, FilterFn, NumberComparison } from "./_common"

export function getHoppersRatingFilter(
    adventure: Adventure,
    comparison: NumberComparison,
    value: number,
): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            value = normalize(0, 100, value)

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
            return compareNumber(comparison, hopper.fertility, normalize(1, 10, value))
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
                    return hopper.listing.active
                case WatchlistMarketFilter.OFF_MARKET:
                    return !hopper.listing.active
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

export function getHoppersHiddenFilter(hidden: Set<HopperId>): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            return !hidden.has(hopper.tokenId)
        })
    }
    filter.signature = `watchlist-hidden-filter-${Array.from(hidden).join(",")}`
    return filter
}
