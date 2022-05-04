import { Hopper } from "models/Hopper"

/**
 * Calculate the hopper price if it would be at fertility 10 with current price rate
 * @param hopper
 * @returns
 */
export function calculateMaxFertilityRatingPrice(hopper: Hopper): number {
    const rating = hopper.fertility / 10
    return (hopper.price - hopper.levelCosts) / rating
}

/**
 * Calculate the chance of breeding a tadpole at the given level
 * @param atLevel
 * @param hopper
 * @returns
 */
export function calculateTadpoleChanceAtLevel(atLevel: number, hopper: Hopper): number {
    return (9 / 400) * (hopper.fertility + (3 * atLevel) / 10) * 100
}

/**
 * Calculate the level for which the hopper would have the given chance of breeding a tadpole
 * @param chance
 * @param hopper
 * @returns
 */
export function calculateHopperLevelAtTadpoleChange(chance: number, hopper: Hopper): number {
    const normalizedChance = chance > 1 ? chance / 100 : chance
    return (normalizedChance * (400 / 9) * 10 - 10 * hopper.fertility) / 3
}
