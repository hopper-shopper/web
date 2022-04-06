import { Hopper } from "models/Hopper"
import { Adventure, getBaseFlyByAdventure, getRatingByAdventure } from "utils/adventures"
import { describe, expect, test } from "vitest"

describe("getRatingByAdventure", () => {
    test("should return correct rating", () => {
        const hopper = {
            rating: {
                pond: 0.1,
                stream: 0.2,
                swamp: 0.3,
                river: 0.4,
                forest: 0.5,
                greatLake: 0.6,
            },
        } as Hopper

        expect(getRatingByAdventure(Adventure.POND, hopper)).toBe(0.1)
        expect(getRatingByAdventure(Adventure.STREAM, hopper)).toBe(0.2)
        expect(getRatingByAdventure(Adventure.SWAMP, hopper)).toBe(0.3)
        expect(getRatingByAdventure(Adventure.RIVER, hopper)).toBe(0.4)
        expect(getRatingByAdventure(Adventure.FOREST, hopper)).toBe(0.5)
        expect(getRatingByAdventure(Adventure.GREAT_LAKE, hopper)).toBe(0.6)
    })
})

describe("getBaseFlyByAdventure", () => {
    test("should return correct base fly", () => {
        const hopper = {
            baseFly: {
                pond: 0.1,
                stream: 0.2,
                swamp: 0.3,
                river: 0.4,
                forest: 0.5,
                greatLake: 0.6,
            },
        } as Hopper

        expect(getBaseFlyByAdventure(Adventure.POND, hopper)).toBe(0.1)
        expect(getBaseFlyByAdventure(Adventure.STREAM, hopper)).toBe(0.2)
        expect(getBaseFlyByAdventure(Adventure.SWAMP, hopper)).toBe(0.3)
        expect(getBaseFlyByAdventure(Adventure.RIVER, hopper)).toBe(0.4)
        expect(getBaseFlyByAdventure(Adventure.FOREST, hopper)).toBe(0.5)
        expect(getBaseFlyByAdventure(Adventure.GREAT_LAKE, hopper)).toBe(0.6)
    })
})
