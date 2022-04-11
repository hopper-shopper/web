export type HopperAdventure = "pond" | "stream" | "swamp" | "river" | "forest" | "great-lake"

export type HopperId = string

export type Hopper = {
    tokenId: HopperId
    strength: number
    agility: number
    vitality: number
    intelligence: number
    fertility: number
    level: number
    levelCosts: number
    listing: HopperListing
    adventure: HopperAdventure | ""
    inAdventure: boolean
    rating: HopperRating
    baseFly: HopperBaseFly
    image: string
}

export type HopperRating = {
    pond: number
    stream: number
    swamp: number
    river: number
    forest: number
    greatLake: number
}

export type HopperBaseFly = {
    pond: number
    stream: number
    swamp: number
    river: number
    forest: number
    greatLake: number
}

export type HopperListing = {
    active: boolean
    price: number
}
