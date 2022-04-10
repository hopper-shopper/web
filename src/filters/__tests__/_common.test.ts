import { compareNumber, NumberComparison } from "filters/_common"
import { describe, test, expect } from "vitest"

describe("compareNumber", () => {
    test("should compare numbers based on given comparison", () => {
        expect(compareNumber(NumberComparison.EQ, 10, 10)).toBe(true)
        expect(compareNumber(NumberComparison.EQ, 10, 5)).toBe(false)

        expect(compareNumber(NumberComparison.GE, 10, 5)).toBe(true)
        expect(compareNumber(NumberComparison.GE, 10, 10)).toBe(true)
        expect(compareNumber(NumberComparison.GE, 5, 10)).toBe(false)

        expect(compareNumber(NumberComparison.GT, 10, 5)).toBe(true)
        expect(compareNumber(NumberComparison.GT, 10, 10)).toBe(false)
        expect(compareNumber(NumberComparison.GT, 5, 10)).toBe(false)

        expect(compareNumber(NumberComparison.LE, 5, 10)).toBe(true)
        expect(compareNumber(NumberComparison.LE, 5, 5)).toBe(true)
        expect(compareNumber(NumberComparison.LE, 10, 5)).toBe(false)

        expect(compareNumber(NumberComparison.LT, 5, 10)).toBe(true)
        expect(compareNumber(NumberComparison.LT, 5, 5)).toBe(false)
        expect(compareNumber(NumberComparison.LT, 10, 5)).toBe(false)
    })
})
