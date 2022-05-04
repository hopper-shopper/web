import { Hopper } from "models/Hopper"
import { Adventure, calculateMaxRatingPrice, getEarningsByAdventure } from "utils/adventures"
import { calculateMaxFertilityRatingPrice } from "utils/fertility"
import { SortDirection, SortOptions } from "./_common"

export enum SortHopperBy {
    TOKEN_ID = "TOKEN_ID",
    LEVEL = "LEVEL",
    LEVEL_COSTS = "LEVEL_COSTS",
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
    MAX_PRICE_FERTILITY = "MAX_PRICE_FERTILITY",
    BASE_FLY_LEVEL_POND = "BASE_FLY_LEVEL_POND",
    BASE_FLY_LEVEL_STREAM = "BASE_FLY_LEVEL_STREAM",
    BASE_FLY_LEVEL_SWAMP = "BASE_FLY_LEVEL_SWAMP",
    BASE_FLY_LEVEL_RIVER = "BASE_FLY_LEVEL_RIVER",
    BASE_FLY_LEVEL_FOREST = "BASE_FLY_LEVEL_FOREST",
    BASE_FLY_LEVEL_GREAT_LAKE = "BASE_FLY_LEVEL_GREAT_LAKE",
    BASE_FLY_POND = "BASE_FLY_POND",
    BASE_FLY_STREAM = "BASE_FLY_STREAM",
    BASE_FLY_SWAMP = "BASE_FLY_SWAMP",
    BASE_FLY_RIVER = "BASE_FLY_RIVER",
    BASE_FLY_FOREST = "BASE_FLY_FOREST",
    BASE_FLY_GREAT_LAKE = "BASE_FLY_GREAT_LAKE",
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
        case SortHopperBy.LEVEL_COSTS:
            sorted = sortByLevelCosts(hoppers)
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
        case SortHopperBy.MAX_PRICE_FERTILITY:
            sorted = sortByMaxPriceFertility(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_POND:
            sorted = sortByBaseFlyPerLevelPond(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_STREAM:
            sorted = sortByBaseFlyPerLevelStream(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_SWAMP:
            sorted = sortByBaseFlyPerLevelSwamp(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_RIVER:
            sorted = sortByBaseFlyPerLevelRiver(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_FOREST:
            sorted = sortByBaseFlyPerLevelForest(hoppers)
            break
        case SortHopperBy.BASE_FLY_LEVEL_GREAT_LAKE:
            sorted = sortByBaseFlyPerLevelGreatLake(hoppers)
            break
        case SortHopperBy.BASE_FLY_POND:
            sorted = sortByBaseFlyPond(hoppers)
            break
        case SortHopperBy.BASE_FLY_STREAM:
            sorted = sortByBaseFlyStream(hoppers)
            break
        case SortHopperBy.BASE_FLY_SWAMP:
            sorted = sortByBaseFlySwamp(hoppers)
            break
        case SortHopperBy.BASE_FLY_RIVER:
            sorted = sortByBaseFlyRiver(hoppers)
            break
        case SortHopperBy.BASE_FLY_FOREST:
            sorted = sortByBaseFlyForest(hoppers)
            break
        case SortHopperBy.BASE_FLY_GREAT_LAKE:
            sorted = sortByBaseFlyGreatLake(hoppers)
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
function sortByLevelCosts(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => a.levelCosts - b.levelCosts)
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
    return [...hoppers].sort((a, b) => a.price - b.price)
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
            calculateMaxRatingPrice(Adventure.GREAT_LAKE, b),
    )
}
function sortByMaxPriceFertility(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort(
        (a, b) => calculateMaxFertilityRatingPrice(a) - calculateMaxFertilityRatingPrice(b),
    )
}
function sortByBaseFlyPerLevelPond(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.pond - b.baseFly.pond
    })
}
function sortByBaseFlyPerLevelStream(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.stream - b.baseFly.stream
    })
}
function sortByBaseFlyPerLevelSwamp(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.swamp - b.baseFly.swamp
    })
}
function sortByBaseFlyPerLevelRiver(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.river - b.baseFly.river
    })
}
function sortByBaseFlyPerLevelForest(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.forest - b.baseFly.forest
    })
}
function sortByBaseFlyPerLevelGreatLake(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return a.baseFly.greatLake - b.baseFly.greatLake
    })
}
function sortByBaseFlyPond(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return getEarningsByAdventure(Adventure.POND, a) - getEarningsByAdventure(Adventure.POND, b)
    })
}
function sortByBaseFlyStream(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return (
            getEarningsByAdventure(Adventure.STREAM, a) -
            getEarningsByAdventure(Adventure.STREAM, b)
        )
    })
}
function sortByBaseFlySwamp(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return (
            getEarningsByAdventure(Adventure.SWAMP, a) - getEarningsByAdventure(Adventure.SWAMP, b)
        )
    })
}
function sortByBaseFlyRiver(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return (
            getEarningsByAdventure(Adventure.RIVER, a) - getEarningsByAdventure(Adventure.RIVER, b)
        )
    })
}
function sortByBaseFlyForest(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return (
            getEarningsByAdventure(Adventure.FOREST, a) -
            getEarningsByAdventure(Adventure.FOREST, b)
        )
    })
}
function sortByBaseFlyGreatLake(hoppers: Hopper[]): Hopper[] {
    return [...hoppers].sort((a, b) => {
        return (
            getEarningsByAdventure(Adventure.GREAT_LAKE, a) -
            getEarningsByAdventure(Adventure.GREAT_LAKE, b)
        )
    })
}
