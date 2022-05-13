import { Hopper } from "models/Hopper"
import { clamp } from "./numbers"

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
    return (9 / 400) * (hopper.fertility + (3 * atLevel) / 10)
}

export function getTadpoleChance(hopper: Hopper): number {
    return calculateTadpoleChanceAtLevel(hopper.level, hopper)
}

/**
 * Calculate the level for which the hopper would have the given chance of breeding a tadpole
 * @param chance
 * @param hopper
 * @returns
 */
export function calculateHopperLevelAtTadpoleChance(chance: number, hopper: Hopper): number {
    const normalizedChance = clamp(0, 0.9, chance)
    return clamp(1, 100, (normalizedChance * (400 / 9) * 10 - 10 * hopper.fertility) / 3)
}

export function getHopperMaxTadpoleChance(hopper: Hopper): number {
    return (9 / 400) * (hopper.fertility + (3 * 100) / 10)
}
