import { clamp, parseIntFromString, round } from "utils/numbers"
import { describe, expect, test } from "vitest"

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

describe("parseIntFromString", () => {
    test("should return fallback if value is unset", () => {
        expect(parseIntFromString("", 5)).toBe(5)
        expect(parseIntFromString(null, 5)).toBe(5)
        expect(parseIntFromString(undefined, 5)).toBe(5)
    })

    test("should parse decimals correctly", () => {
        expect(parseIntFromString("12.34", 5)).toBe(12)
        expect(parseIntFromString("12,34", 5)).toBe(12)
    })

    test("should parse negative numbers correctly", () => {
        expect(parseIntFromString("-12", 5)).toBe(-12)
        expect(parseIntFromString("-12.34", 5)).toBe(-12)
        expect(parseIntFromString("-12,34", 5)).toBe(-12)
    })
})

describe("round", () => {
    test("should round value correctly", () => {
        expect(round(12.34, 1)).toBe(12.3)
        expect(round(12.345, 2)).toBe(12.35)
        expect(round(12.3456, 3)).toBe(12.346)
    })
})
