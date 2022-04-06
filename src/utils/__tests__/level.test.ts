import { calculateCostsAtLevel, calculateCostToLevelUp, calculateLevelUpCosts } from "utils/level"
import { describe, expect, test } from "vitest"

describe("calculateCostToLevelUp", () => {
    test("should return 0 for invalid levels", () => {
        expect(calculateCostToLevelUp(0)).toBe(0)
        expect(calculateCostToLevelUp(1)).toBe(0)
        expect(calculateCostToLevelUp(101)).toBe(0)
    })

    test("should calculate level correctly", () => {
        expect(calculateCostToLevelUp(5)).toBe(2.5)
        expect(calculateCostToLevelUp(10)).toBe(5)
        expect(calculateCostToLevelUp(20)).toBe(10)
        expect(calculateCostToLevelUp(40)).toBe(27)
        expect(calculateCostToLevelUp(99)).toBe(98)
    })
})

describe("calculateCostsAtLevel", () => {
    test("should calculate costs correctly", () => {
        expect(calculateCostsAtLevel(1)).toBe(0)
        expect(calculateCostsAtLevel(2)).toBe(1)
        expect(calculateCostsAtLevel(10)).toBe(27)
        expect(calculateCostsAtLevel(50)).toBe(803.5)
    })
})

describe("calculateLevelUpCosts", () => {
    test("should return 0 if desired level is below currentLevel", () => {
        expect(calculateLevelUpCosts(0, 0)).toBe(0)
        expect(calculateLevelUpCosts(10, 5)).toBe(0)
    })
})
