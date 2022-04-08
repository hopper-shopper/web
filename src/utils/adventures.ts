import { Hopper } from "models/Hopper"

export enum Adventure {
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}

/**
 * Calculate the hopper price if it would be at adventure's max rating (1) with current price rate
 * @param adventure
 * @param hopper
 * @returns
 */
export function calculateMaxRatingPrice(adventure: Adventure, hopper: Hopper): number {
    const rating = getRatingByAdventure(adventure, hopper)
    return (hopper.listing.price - hopper.levelCosts) / rating
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

export function hopperAdventureToAdventure(hopper: Hopper): Adventure | null {
    if (!hopper.inAdventure || !hopper.adventure) {
        return null
    }

    switch (hopper.adventure) {
        case "pond":
            return Adventure.POND
        case "stream":
            return Adventure.STREAM
        case "swamp":
            return Adventure.SWAMP
        case "river":
            return Adventure.RIVER
        case "forest":
            return Adventure.FOREST
        case "great-lake":
            return Adventure.GREAT_LAKE
        default:
            return null
    }
}
