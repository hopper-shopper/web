import { clamp, normalize } from "utils/numbers"
import { describe, test, expect } from "vitest"

describe("clamp", () => {
    test("should return value if between range", () => {
        expect(clamp(0, 10, 5)).toBe(5)
        expect(clamp(-10, 10, -2)).toBe(-2)
        expect(clamp(100, 102, 101)).toBe(101)
    })

    test("should return min if value is below", () => {
        expect(clamp(0, 10, -2)).toBe(0)
        expect(clamp(100, 1000, 20)).toBe(100)
    })

    test("should return max if value is above", () => {
        expect(clamp(0, 10, 100)).toBe(10)
        expect(clamp(-50, -10, 10)).toBe(-10)
    })
})

describe("normalize", () => {
    test("should return value if between range", () => {
        expect(normalize(0, 10, 5)).toBe(5)
        expect(normalize(-20, -10, -15)).toBe(-15)
    })

    test("should normalize value", () => {
        expect(normalize(0, 10, 500)).toBe(5)
        expect(normalize(0, 100, 500)).toBe(50)
    })
})
