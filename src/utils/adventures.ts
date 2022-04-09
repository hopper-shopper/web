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

export function getIdealAdventure(hopper: Hopper): Adventure {
    const baseFlies = [
        hopper.baseFly.pond,
        hopper.baseFly.stream,
        hopper.baseFly.swamp,
        hopper.baseFly.river,
        hopper.baseFly.forest,
        hopper.baseFly.greatLake,
    ]
    const adventures = [
        Adventure.POND,
        Adventure.STREAM,
        Adventure.SWAMP,
        Adventure.RIVER,
        Adventure.FOREST,
        Adventure.GREAT_LAKE,
    ]

    const maxBaseFly = Math.max(...baseFlies)
    const maxBaseFlyIndex = baseFlies.lastIndexOf(maxBaseFly)

    return adventures[maxBaseFlyIndex]
}

export function getEarningsByAdventure(adventure: Adventure, hopper: Hopper): number {
    const baseFly = getBaseFlyByAdventure(adventure, hopper)

    return baseFly * hopper.level
}
