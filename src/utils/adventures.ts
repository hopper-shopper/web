import { Hopper } from "models/Hopper"

export enum Adventure {
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}

export function calculateMaxRatingPrice(adventure: Adventure, hopper: Hopper): number {
    const rating = getRatingByAdventure(adventure, hopper)
    return hopper.listing.price / rating
}

export function getRatingByAdventure(adventure: Adventure, hopper: Hopper): number {
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
export function getBaseFlyByAdventure(adventure: Adventure, hopper: Hopper): number {
    switch (adventure) {
        case Adventure.POND:
            return hopper.baseFly.pond
        case Adventure.STREAM:
            return hopper.baseFly.stream
        case Adventure.SWAMP:
            return hopper.baseFly.swamp
        case Adventure.RIVER:
            return hopper.baseFly.river
        case Adventure.FOREST:
            return hopper.baseFly.forest
        case Adventure.GREAT_LAKE:
            return hopper.baseFly.greatLake
    }
}
