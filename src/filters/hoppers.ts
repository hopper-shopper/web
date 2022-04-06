import { Hopper } from "models/Hopper"
import { Adventure, getRatingByAdventure } from "utils/adventures"
import { compareNumber, FilterFn, NumberComparison } from "./_common"

export function getHoppersRatingFilter(
    adventure: Adventure,
    comparison: NumberComparison,
    value: number,
): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            if (value > 1) {
                value /= 100
            }

            const rating = getRatingByAdventure(adventure, hopper)
            return compareNumber(comparison, rating, value)
        })
    }
    filter.signature = `rating-filter-${adventure}-${comparison}-${value}`
    return filter
}

export function getHoppersAdventureFilter(adventure: Adventure): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const rating = getRatingByAdventure(adventure, hopper)
            return rating > 0
        })
    }
    filter.signature = `adventure-filter-${adventure}`
    return filter
}
