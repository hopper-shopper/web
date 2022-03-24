import { Hopper } from "models/Hopper"

export const MAX_RATING_POND = 10
export const MAX_RATING_STREAM = 10
export const MAX_RATING_SWAMP = 10
export const MAX_RATING_RIVER = 10 * 10
export const MAX_RATING_FOREST = 10 * 10 * 10
export const MAX_RATING_GREAT_LAKE = 10 * 10 * 10 * 10

export enum Adventure {
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}

export function getMaxRatingByAdventure(adventure: Adventure): number {
    switch (adventure) {
        case Adventure.POND:
            return MAX_RATING_POND
        case Adventure.STREAM:
            return MAX_RATING_STREAM
        case Adventure.SWAMP:
            return MAX_RATING_SWAMP
        case Adventure.RIVER:
            return MAX_RATING_RIVER
        case Adventure.FOREST:
            return MAX_RATING_FOREST
        case Adventure.GREAT_LAKE:
            return MAX_RATING_GREAT_LAKE
    }
}

export function compareToMaxRating(adventure: Adventure, hopper: Hopper): number {
    switch (adventure) {
        case Adventure.POND:
            return hopper.rating.pond / MAX_RATING_POND
        case Adventure.STREAM:
            return hopper.rating.stream / MAX_RATING_STREAM
        case Adventure.SWAMP:
            return hopper.rating.swamp / MAX_RATING_SWAMP
        case Adventure.RIVER:
            return hopper.rating.river / MAX_RATING_RIVER
        case Adventure.FOREST:
            return hopper.rating.forest / MAX_RATING_FOREST
        case Adventure.GREAT_LAKE:
            return hopper.rating.greatLake / MAX_RATING_GREAT_LAKE
    }
}

export function calculateMaxRatingPrice(adventure: Adventure, hopper: Hopper): number {
    const rating = compareToMaxRating(adventure, hopper) * 100
    const maxRating = getMaxRatingByAdventure(adventure)

    return (maxRating * hopper.listing.price) / rating
}

export function calculatePriceMultiplier(adventure: Adventure, hopper: Hopper): number {
    const normalPrice = hopper.listing.price
    const maxPrice = calculateMaxRatingPrice(adventure, hopper)

    return maxPrice / normalPrice
}
