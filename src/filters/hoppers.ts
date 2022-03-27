import { Hopper } from "models/Hopper"
import { Adventure } from "utils/adventures"
import { compareNumber, FilterFn, NumberComparison } from "./_common"

export function getHoppersRatingFilter(
    adventure: Adventure,
    comparison: NumberComparison,
    value: number,
): FilterFn<Hopper> {
    const filter: FilterFn<Hopper> = hoppers => {
        return hoppers.filter(hopper => {
            const rating = getRatingByAdventure(adventure, hopper)
            return compareNumber(comparison, rating, value)
        })
    }
    filter.toString = () => {
        return `${adventure}-${comparison}-${value}`
    }
    return filter
}

function getRatingByAdventure(adventure: Adventure, hopper: Hopper): number {
    switch (adventure) {
        case Adventure.POND:
            return hopper.rating.pond
        case Adventure.STREAM:
            return hopper.rating.stream
        case Adventure.SWAMP:
            return hopper.rating.swamp
        case Adventure.RIVER:
            return hopper.rating.river
        case Adventure.FOREST:
            return hopper.rating.forest
        case Adventure.GREAT_LAKE:
            return hopper.rating.greatLake
    }
}
