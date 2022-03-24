import { Hopper } from "models/Hopper"
import { Adventure, calculateMaxRatingPrice, calculatePriceMultiplier } from "utils/adventures"
import { SortDirection, SortOptions } from "./_common"

export enum SortHopperBy {
    TOKEN_ID = "TOKEN_ID",
    LEVEL = "LEVEL",
    STRENGTH = "STRENGTH",
    AGILITY = "AGILITY",
    VITALITY = "VITALITY",
    INTELLIGENCE = "INTELLIGENCE",
    FERTILITY = "FERTILITY",
    RATING_POND = "RATING_POND",
    RATING_STREAM = "RATING_STREAM",
    RATING_SWAMP = "RATING_SWAMP",
    RATING_RIVER = "RATING_RIVER",
    RATING_FOREST = "RATING_FOREST",
    RATING_GREAT_LAKE = "RATING_GREAT_LAKE",
    PRICE = "PRICE",
    MAX_PRICE_POND = "MAX_PRICE_POND",
    MAX_PRICE_STREAM = "MAX_PRICE_STREAM",
    MAX_PRICE_SWAMP = "MAX_PRICE_SWAMP",
    MAX_PRICE_RIVER = "MAX_PRICE_RIVER",
    MAX_PRICE_FOREST = "MAX_PRICE_FOREST",
    MAX_PRICE_GREAT_LAKE = "MAX_PRICE_GREAT_LAKE",
    PRICE_MULTIPLIER_POND = "PRICE_MULTIPLIER_POND",
    PRICE_MULTIPLIER_STREAM = "PRICE_MULTIPLIER_STREAM",
    PRICE_MULTIPLIER_SWAMP = "PRICE_MULTIPLIER_SWAMP",
    PRICE_MULTIPLIER_RIVER = "PRICE_MULTIPLIER_RIVER",
    PRICE_MULTIPLIER_FOREST = "PRICE_MULTIPLIER_FOREST",
    PRICE_MULTIPLIER_GREAT_LAKE = "PRICE_MULTIPLIER_GREAT_LAKE",
}

export type HopperSortOptions = SortOptions<SortHopperBy>

export function sortHoppers(hoppers: Hopper[], options: HopperSortOptions): Hopper[] {
    const { by, direction } = options

    let sorted: Hopper[] = [...hoppers]

    switch (by) {
        case SortHopperBy.TOKEN_ID:
            sorted = sortByTokenId(hoppers)
            break
        case SortHopperBy.LEVEL:
            sorted = sortByLevel(hoppers)
            break
        case SortHopperBy.STRENGTH:
            sorted = sortByStrength(hoppers)
            break
        case SortHopperBy.AGILITY:
            sorted = sortByAgility(hoppers)
            break
        case SortHopperBy.VITALITY:
            sorted = sortByVitality(hoppers)
            break
        case SortHopperBy.INTELLIGENCE:
            sorted = sortByIntelligence(hoppers)
            break
        case SortHopperBy.FERTILITY:
            sorted = sortByFertility(hoppers)
            break
        case SortHopperBy.RATING_POND:
            sorted = sortByRatingPond(hoppers)
            break
        case SortHopperBy.RATING_STREAM:
            sorted = sortByRatingStream(hoppers)
            break
        case SortHopperBy.RATING_SWAMP:
            sorted = sortByRatingSwamp(hoppers)
            break
        case SortHopperBy.RATING_RIVER:
            sorted = sortByRatingRiver(hoppers)
            break
        case SortHopperBy.RATING_FOREST:
            sorted = sortByRatingForest(hoppers)
            break
        case SortHopperBy.RATING_GREAT_LAKE:
            sorted = sortByRatingGreatLake(hoppers)
            break
        case SortHopperBy.PRICE:
            sorted = sortByPrice(hoppers)
            break
        case SortHopperBy.MAX_PRICE_POND:
            sorted = sortByMaxPricePond(hoppers)
            break
        case SortHopperBy.MAX_PRICE_STREAM:
            sorted = sortByMaxPriceStream(hoppers)
            break
        case SortHopperBy.MAX_PRICE_SWAMP:
            sorted = sortByMaxPriceSwamp(hoppers)
            break
        case SortHopperBy.MAX_PRICE_RIVER:
            sorted = sortByMaxPriceRiver(hoppers)
            break
        case SortHopperBy.MAX_PRICE_FOREST:
            sorted = sortByMaxPriceForest(hoppers)
            break
        case SortHopperBy.MAX_PRICE_GREAT_LAKE:
            sorted = sortByMaxPriceGreatLake(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_POND:
            sorted = sortByMultiplierPond(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_STREAM:
            sorted = sortByMultiplierStream(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_SWAMP:
            sorted = sortByMultiplierSwamp(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_RIVER:
            sorted = sortByMultiplierRiver(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_FOREST:
            sorted = sortByMultiplierForest(hoppers)
            break
        case SortHopperBy.PRICE_MULTIPLIER_GREAT_LAKE:
            sorted = sortByMultiplierGreatLake(hoppers)
            break
    }

    switch (direction) {
        case SortDirection.ASC:
            return sorted
        case SortDirection.DESC:
            return sorted.reverse()
    }
}

function sortByTokenId(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => Number(a.tokenId) - Number(b.tokenId))
}
function sortByLevel(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.level - b.level)
}
function sortByStrength(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.strength - b.strength)
}
function sortByAgility(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.agility - b.agility)
}
function sortByVitality(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.vitality - b.vitality)
}
function sortByIntelligence(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.intelligence - b.intelligence)
}
function sortByFertility(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.fertility - b.fertility)
}
function sortByRatingPond(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.pond - b.rating.pond)
}
function sortByRatingStream(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.stream - b.rating.stream)
}
function sortByRatingSwamp(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.swamp - b.rating.swamp)
}
function sortByRatingRiver(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.river - b.rating.river)
}
function sortByRatingForest(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.forest - b.rating.forest)
}
function sortByRatingGreatLake(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.rating.greatLake - b.rating.greatLake)
}
function sortByPrice(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.listing.price - b.listing.price)
}
function sortByMaxPricePond(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.POND, a) - calculateMaxRatingPrice(Adventure.POND, b),
    )
}
function sortByMaxPriceStream(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.STREAM, a) -
            calculateMaxRatingPrice(Adventure.STREAM, b),
    )
}
function sortByMaxPriceSwamp(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.SWAMP, a) -
            calculateMaxRatingPrice(Adventure.SWAMP, b),
    )
}
function sortByMaxPriceRiver(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.RIVER, a) -
            calculateMaxRatingPrice(Adventure.RIVER, b),
    )
}
function sortByMaxPriceForest(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.FOREST, a) -
            calculateMaxRatingPrice(Adventure.FOREST, b),
    )
}
function sortByMaxPriceGreatLake(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculateMaxRatingPrice(Adventure.GREAT_LAKE, a) -
            calculateMaxRatingPrice(Adventure.POND, b),
    )
}
function sortByMultiplierPond(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.POND, a) -
            calculatePriceMultiplier(Adventure.POND, b),
    )
}
function sortByMultiplierStream(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.STREAM, a) -
            calculatePriceMultiplier(Adventure.STREAM, b),
    )
}
function sortByMultiplierSwamp(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.SWAMP, a) -
            calculatePriceMultiplier(Adventure.SWAMP, b),
    )
}
function sortByMultiplierRiver(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.RIVER, a) -
            calculatePriceMultiplier(Adventure.RIVER, b),
    )
}
function sortByMultiplierForest(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.FOREST, a) -
            calculatePriceMultiplier(Adventure.FOREST, b),
    )
}
function sortByMultiplierGreatLake(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) =>
            calculatePriceMultiplier(Adventure.GREAT_LAKE, a) -
            calculatePriceMultiplier(Adventure.POND, b),
    )
}
