import {
    getHoppersFertilityFilter,
    getHoppersPermitFilter,
    getHoppersRatingFilter,
} from "filters/hoppers"
import { NumberComparison } from "filters/_common"
import { Hopper, HopperRating } from "models/Hopper"
import { Adventure } from "utils/adventures"
import { describe, test, expect } from "vitest"

function makeRating(forAdventure: Adventure, rating: number): HopperRating {
    const hopperRating: HopperRating = {
        pond: 0,
        stream: 0,
        swamp: 0,
        river: 0,
        forest: 0,
        greatLake: 0,
    }

    const adventureKeyMap: Record<Adventure, keyof HopperRating> = {
        [Adventure.POND]: "pond",
        [Adventure.STREAM]: "stream",
        [Adventure.SWAMP]: "swamp",
        [Adventure.RIVER]: "river",
        [Adventure.FOREST]: "forest",
        [Adventure.GREAT_LAKE]: "greatLake",
    }

    return {
        ...hopperRating,
        [adventureKeyMap[forAdventure]]: rating,
    }
}

const ALL_ADVENTURES = [
    Adventure.POND,
    Adventure.STREAM,
    Adventure.SWAMP,
    Adventure.RIVER,
    Adventure.FOREST,
    Adventure.GREAT_LAKE,
]

describe("getHoppersRatingFilter", () => {
    test("should return FilterFn type", () => {
        const filterFn = getHoppersRatingFilter(Adventure.POND, NumberComparison.GE, 100)
        expect(filterFn).toBeTypeOf("function")
        expect(filterFn).toHaveProperty("signature")
    })

    test.each(ALL_ADVENTURES)("should create signature based on input parameters", adventure => {
        const comparisons = [
            NumberComparison.EQ,
            NumberComparison.GE,
            NumberComparison.GT,
            NumberComparison.LE,
            NumberComparison.LT,
        ]

        for (const comparison of comparisons) {
            expect(getHoppersRatingFilter(adventure, comparison, 100).signature).toBe(
                `rating-filter-${adventure}-${comparison}-100`,
            )
        }
    })

    test.each([
        Adventure.POND,
        Adventure.STREAM,
        Adventure.SWAMP,
        Adventure.RIVER,
        Adventure.FOREST,
        Adventure.GREAT_LAKE,
    ])("should filter hoppers based on %s rating", adventure => {
        const hoppers: Hopper[] = [
            { tokenId: "1", rating: makeRating(adventure, 0.1) } as Hopper,
            { tokenId: "2", rating: makeRating(adventure, 0.2) } as Hopper,
            { tokenId: "3", rating: makeRating(adventure, 0.3) } as Hopper,
            { tokenId: "4", rating: makeRating(adventure, 0.4) } as Hopper,
            { tokenId: "5", rating: makeRating(adventure, 0.5) } as Hopper,
            { tokenId: "6", rating: makeRating(adventure, 0.6) } as Hopper,
            { tokenId: "7", rating: makeRating(adventure, 0.7) } as Hopper,
            { tokenId: "8", rating: makeRating(adventure, 0.8) } as Hopper,
            { tokenId: "9", rating: makeRating(adventure, 0.9) } as Hopper,
            { tokenId: "10", rating: makeRating(adventure, 1) } as Hopper,
        ]

        const filter0 = getHoppersRatingFilter(adventure, NumberComparison.GE, 0)
        const filter1 = getHoppersRatingFilter(adventure, NumberComparison.GE, 10)
        const filter2 = getHoppersRatingFilter(adventure, NumberComparison.GE, 20)
        const filter3 = getHoppersRatingFilter(adventure, NumberComparison.GE, 30)
        const filter4 = getHoppersRatingFilter(adventure, NumberComparison.GE, 40)
        const filter5 = getHoppersRatingFilter(adventure, NumberComparison.GE, 50)
        const filter6 = getHoppersRatingFilter(adventure, NumberComparison.GE, 60)
        const filter7 = getHoppersRatingFilter(adventure, NumberComparison.GE, 70)
        const filter8 = getHoppersRatingFilter(adventure, NumberComparison.GE, 80)
        const filter9 = getHoppersRatingFilter(adventure, NumberComparison.GE, 90)
        const filter10 = getHoppersRatingFilter(adventure, NumberComparison.GE, 100)

        expect(filter0(hoppers).map(h => h.tokenId)).toMatchObject([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter1(hoppers).map(h => h.tokenId)).toMatchObject([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter2(hoppers).map(h => h.tokenId)).toMatchObject([
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter3(hoppers).map(h => h.tokenId)).toMatchObject([
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter4(hoppers).map(h => h.tokenId)).toMatchObject([
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter5(hoppers).map(h => h.tokenId)).toMatchObject(["5", "6", "7", "8", "9", "10"])

        expect(filter6(hoppers).map(h => h.tokenId)).toMatchObject(["6", "7", "8", "9", "10"])

        expect(filter7(hoppers).map(h => h.tokenId)).toMatchObject(["7", "8", "9", "10"])

        expect(filter8(hoppers).map(h => h.tokenId)).toMatchObject(["8", "9", "10"])

        expect(filter9(hoppers).map(h => h.tokenId)).toMatchObject(["9", "10"])

        expect(filter10(hoppers).map(h => h.tokenId)).toMatchObject(["10"])
    })
})

describe("getHoppersAdventureFilter", () => {
    test("should return FilterFn type", () => {
        const filterFn = getHoppersPermitFilter(Adventure.POND)
        expect(filterFn).toBeTypeOf("function")
        expect(filterFn).toHaveProperty("signature")
    })

    test.each(ALL_ADVENTURES)("should create signature based on input parameters", adventure => {
        expect(getHoppersPermitFilter(adventure).signature).toBe(`adventure-filter-${adventure}`)
    })

    test("should filter hoppers based on adventure permit", () => {
        const hoppers: Hopper[] = [
            { tokenId: "1", rating: makeRating(Adventure.POND, 0) } as Hopper,
            { tokenId: "2", rating: makeRating(Adventure.POND, 1) } as Hopper,
            { tokenId: "3", rating: makeRating(Adventure.STREAM, 0) } as Hopper,
            { tokenId: "4", rating: makeRating(Adventure.STREAM, 1) } as Hopper,
            { tokenId: "5", rating: makeRating(Adventure.SWAMP, 0) } as Hopper,
            { tokenId: "6", rating: makeRating(Adventure.SWAMP, 1) } as Hopper,
            { tokenId: "7", rating: makeRating(Adventure.RIVER, 0) } as Hopper,
            { tokenId: "8", rating: makeRating(Adventure.RIVER, 1) } as Hopper,
            { tokenId: "9", rating: makeRating(Adventure.FOREST, 0) } as Hopper,
            { tokenId: "10", rating: makeRating(Adventure.FOREST, 1) } as Hopper,
            { tokenId: "11", rating: makeRating(Adventure.GREAT_LAKE, 0) } as Hopper,
            { tokenId: "12", rating: makeRating(Adventure.GREAT_LAKE, 1) } as Hopper,
        ]

        const filterPond = getHoppersPermitFilter(Adventure.POND)
        expect(filterPond(hoppers).map(h => h.tokenId)).toMatchObject(["2"])

        const filterStream = getHoppersPermitFilter(Adventure.STREAM)
        expect(filterStream(hoppers).map(h => h.tokenId)).toMatchObject(["4"])

        const filterSwamp = getHoppersPermitFilter(Adventure.SWAMP)
        expect(filterSwamp(hoppers).map(h => h.tokenId)).toMatchObject(["6"])

        const filterRiver = getHoppersPermitFilter(Adventure.RIVER)
        expect(filterRiver(hoppers).map(h => h.tokenId)).toMatchObject(["8"])

        const filterForest = getHoppersPermitFilter(Adventure.FOREST)
        expect(filterForest(hoppers).map(h => h.tokenId)).toMatchObject(["10"])

        const filterGreatLake = getHoppersPermitFilter(Adventure.GREAT_LAKE)
        expect(filterGreatLake(hoppers).map(h => h.tokenId)).toMatchObject(["12"])
    })
})

describe("getHoppersFertilityFilter", () => {
    test("should return FilterFn type", () => {
        const filterFn = getHoppersFertilityFilter(NumberComparison.GE, 10)
        expect(filterFn).toBeTypeOf("function")
        expect(filterFn).toHaveProperty("signature")
    })

    test("should create signature based on input parameters", () => {
        const comparisons = [
            NumberComparison.EQ,
            NumberComparison.GE,
            NumberComparison.GT,
            NumberComparison.LE,
            NumberComparison.LT,
        ]

        for (const comparison of comparisons) {
            expect(getHoppersFertilityFilter(comparison, 100).signature).toBe(
                `fertility-filter-${comparison}-100`,
            )
        }
    })

    test("should filter hoppers based on fertility", () => {
        const hoppers: Hopper[] = [
            { tokenId: "1", fertility: 1 } as Hopper,
            { tokenId: "2", fertility: 2 } as Hopper,
            { tokenId: "3", fertility: 3 } as Hopper,
            { tokenId: "4", fertility: 4 } as Hopper,
            { tokenId: "5", fertility: 5 } as Hopper,
            { tokenId: "6", fertility: 6 } as Hopper,
            { tokenId: "7", fertility: 7 } as Hopper,
            { tokenId: "8", fertility: 8 } as Hopper,
            { tokenId: "9", fertility: 9 } as Hopper,
            { tokenId: "10", fertility: 10 } as Hopper,
        ]

        const filter0 = getHoppersFertilityFilter(NumberComparison.GE, 0)
        const filter1 = getHoppersFertilityFilter(NumberComparison.GE, 1)
        const filter2 = getHoppersFertilityFilter(NumberComparison.GE, 2)
        const filter3 = getHoppersFertilityFilter(NumberComparison.GE, 3)
        const filter4 = getHoppersFertilityFilter(NumberComparison.GE, 4)
        const filter5 = getHoppersFertilityFilter(NumberComparison.GE, 5)
        const filter6 = getHoppersFertilityFilter(NumberComparison.GE, 6)
        const filter7 = getHoppersFertilityFilter(NumberComparison.GE, 7)
        const filter8 = getHoppersFertilityFilter(NumberComparison.GE, 8)
        const filter9 = getHoppersFertilityFilter(NumberComparison.GE, 9)
        const filter10 = getHoppersFertilityFilter(NumberComparison.GE, 10)

        expect(filter0(hoppers).map(h => h.tokenId)).toMatchObject([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter1(hoppers).map(h => h.tokenId)).toMatchObject([
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter2(hoppers).map(h => h.tokenId)).toMatchObject([
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter3(hoppers).map(h => h.tokenId)).toMatchObject([
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter4(hoppers).map(h => h.tokenId)).toMatchObject([
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
        ])

        expect(filter5(hoppers).map(h => h.tokenId)).toMatchObject(["5", "6", "7", "8", "9", "10"])

        expect(filter6(hoppers).map(h => h.tokenId)).toMatchObject(["6", "7", "8", "9", "10"])

        expect(filter7(hoppers).map(h => h.tokenId)).toMatchObject(["7", "8", "9", "10"])

        expect(filter8(hoppers).map(h => h.tokenId)).toMatchObject(["8", "9", "10"])

        expect(filter9(hoppers).map(h => h.tokenId)).toMatchObject(["9", "10"])

        expect(filter10(hoppers).map(h => h.tokenId)).toMatchObject(["10"])
    })
})
