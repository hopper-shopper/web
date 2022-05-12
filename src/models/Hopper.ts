export type Hopper = {
    tokenId: HopperId
    strength: number
    agility: number
    vitality: number
    intelligence: number
    fertility: number
    level: number
    levelCosts: number
    rating: HopperRating
    baseFly: HopperBaseFly
    image: string
    activity: HopperActivity
    price: number
}

export type HopperActivity =
    | "idle"
    | "pond"
    | "stream"
    | "swamp"
    | "river"
    | "forest"
    | "great-lake"
    | "breeding"
    | "marketplace"

export type HopperId = string

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

export type HoppersActivitySnapshot = {
    idle: number
    breeding: number
    marketplace: number
    adventure: number
    pond: number
    stream: number
    swamp: number
    river: number
    forest: number
    greatLake: number
}
