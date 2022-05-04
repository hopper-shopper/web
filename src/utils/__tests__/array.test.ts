import { toggleItem } from "utils/array"
import { describe, test, expect } from "vitest"

describe("toggleItem", () => {
    test("should add item from array", () => {
        expect(toggleItem([0, 1, 2, 3, 4, 5], 6, true)).toMatchObject([0, 1, 2, 3, 4, 5, 6])
        expect(toggleItem(["0", "1", "2", "3", "4"], "5", true)).toMatchObject([
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
        ])
    })

    test("should remove item from array", () => {
        expect(toggleItem([1, 2, 3], 2, false)).toMatchObject([1, 3])
        expect(toggleItem(["1", "2", "3"], "3", false)).toMatchObject(["1", "2"])
    })
})
