/**
 * Calculate the cost to level from `currentLevel` to `desiredLevel` in FLY
 * @param currentLevel
 * @param desiredLevel
 * @returns
 */
export function calculateLevelUpCosts(currentLevel: number, desiredLevel: number): number {
    if (desiredLevel <= currentLevel) {
        return 0
    }

    const currentLevelCosts = calculateCostsAtLevel(currentLevel)
    const costsDesiredLevel = calculateCostsAtLevel(desiredLevel)

    const costs = costsDesiredLevel - currentLevelCosts

    return Math.max(0, costs)
}

/**
 * Calculate the cost to level up one level (from `forLevel - 1`)
 * @param forLevel
 * @returns
 */
export function calculateCostToLevelUp(forLevel: number): number {
    if (forLevel <= 1 || forLevel > 100) {
        return 0
    }

    if (forLevel < 21) {
        return forLevel / 2
    }

    const base = Math.ceil(forLevel ** 1.43522 / 7.5)

    if (forLevel === 100) {
        return 500
    }

    return base
}

/**
 * Calculate the total cost to level the hopper from 1 to the given level
 * @param level
 * @returns
 */
export function calculateCostsAtLevel(level: number): number {
    let costs = 0

    for (let i = 2; i <= level; i++) {
        costs += calculateCostToLevelUp(i)
    }

    return costs
}
