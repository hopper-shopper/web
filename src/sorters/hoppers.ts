import { Hopper } from "models/Hopper"
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
