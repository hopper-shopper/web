import { Hopper } from "models/Hopper"

export enum Adventure {
    POND = "POND",
    STREAM = "STREAM",
    SWAMP = "SWAMP",
    RIVER = "RIVER",
    FOREST = "FOREST",
    GREAT_LAKE = "GREAT_LAKE",
}

export const ALL_ADVENTURES: Adventure[] = [
    Adventure.POND,
    Adventure.STREAM,
    Adventure.SWAMP,
    Adventure.RIVER,
    Adventure.FOREST,
    Adventure.GREAT_LAKE,
]

export function urlifyAdventure(adventure: Adventure): string {
    const mapping: Record<Adventure, string> = {
        [Adventure.POND]: "pond",
        [Adventure.STREAM]: "stream",
        [Adventure.SWAMP]: "swamp",
        [Adventure.RIVER]: "river",
        [Adventure.FOREST]: "forest",
        [Adventure.GREAT_LAKE]: "great-Lake",
    }

    return mapping[adventure]
}

/**
 * Calculate the hopper price if it would be at adventure's max rating (1) with current price rate
 * @param adventure
 * @param hopper
 * @returns
 */
export function calculateMaxRatingPrice(adventure: Adventure, hopper: Hopper): number {
    const rating = getRatingByAdventure(adventure, hopper)
    return hopper.price / rating
}

export function getRatingByAdventure(adventure: Adventure, hopper: Hopper): number {
    const mapping: Record<Adventure, number> = {
        [Adventure.POND]: hopper.rating.pond,
        [Adventure.STREAM]: hopper.rating.stream,
        [Adventure.SWAMP]: hopper.rating.swamp,
        [Adventure.RIVER]: hopper.rating.river,
        [Adventure.FOREST]: hopper.rating.forest,
        [Adventure.GREAT_LAKE]: hopper.rating.greatLake,
    }

    return mapping[adventure]
}
export function getBaseFlyByAdventure(adventure: Adventure, hopper: Hopper): number {
    const mapping: Record<Adventure, number> = {
        [Adventure.POND]: hopper.baseFly.pond,
        [Adventure.STREAM]: hopper.baseFly.stream,
        [Adventure.SWAMP]: hopper.baseFly.swamp,
        [Adventure.RIVER]: hopper.baseFly.river,
        [Adventure.FOREST]: hopper.baseFly.forest,
        [Adventure.GREAT_LAKE]: hopper.baseFly.greatLake,
    }

    return mapping[adventure]
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

    const maxBaseFly = Math.max(...baseFlies)
    const maxBaseFlyIndex = baseFlies.lastIndexOf(maxBaseFly)

    return ALL_ADVENTURES[maxBaseFlyIndex]
}

export function getEarningsByAdventure(adventure: Adventure, hopper: Hopper): number {
    const baseFly = getBaseFlyByAdventure(adventure, hopper)
    return baseFly * hopper.level
}
