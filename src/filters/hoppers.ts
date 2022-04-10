import { Hopper } from "models/Hopper"
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
            if (value > 1) {
                value = normalize(0, 1, value)
            }

            const rating = getRatingByAdventure(adventure, hopper)
            return compareNumber(comparison, rating, value)
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
