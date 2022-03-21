export type Hopper = {
    tokenId: string
    strength: number
    agility: number
    vitality: number
    intelligence: number
    fertility: number
    level: number
    market: boolean
    adventure: boolean
    rating: HopperRating
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
