import { Adventure } from "utils/adventures"
import { applySortDirection, Sorter, SortOptions } from "./_common"

export enum SortAdventureBy {
    RANK = "RANK",
}

const SORT_MAPPING: Record<SortAdventureBy, Sorter<Adventure>> = {
    [SortAdventureBy.RANK]: sortByRank,
}

export type AdventureSortOptions = SortOptions<SortAdventureBy>

export function sortAdventures(
    adventures: Adventure[],
    options: AdventureSortOptions,
): Adventure[] {
    const { by, direction } = options

    const sorted = SORT_MAPPING[by]([...adventures])

    return applySortDirection(sorted, direction)
}

const adventureRankRanking = {
    [Adventure.POND]: 0,
    [Adventure.STREAM]: 1,
    [Adventure.SWAMP]: 2,
    [Adventure.RIVER]: 3,
    [Adventure.FOREST]: 4,
    [Adventure.GREAT_LAKE]: 5,
}
function sortByRank(adventures: Adventure[]): Adventure[] {
    return [...adventures].sort((a, b) => {
        return adventureRankRanking[a] - adventureRankRanking[b]
    })
}
