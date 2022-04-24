import { Adventure } from "utils/adventures"
import { SortDirection, SortOptions } from "./_common"

export enum SortAdventureBy {
    RANK = "RANK",
}

export type AdventureSortOptions = SortOptions<SortAdventureBy>

export function sortAdventures(
    adventures: Adventure[],
    options: AdventureSortOptions,
): Adventure[] {
    const { by, direction } = options

    let sorted = [...adventures]

    switch (by) {
        case SortAdventureBy.RANK:
            sorted = sortByRank(adventures)
            break
    }

    switch (direction) {
        case SortDirection.ASC:
            return sorted
        case SortDirection.DESC:
            return sorted.reverse()
    }
}

const ranking = {
    [Adventure.POND]: 0,
    [Adventure.STREAM]: 1,
    [Adventure.SWAMP]: 2,
    [Adventure.RIVER]: 3,
    [Adventure.FOREST]: 4,
    [Adventure.GREAT_LAKE]: 5,
}
function sortByRank(adventures: Adventure[]): Adventure[] {
    return [...adventures].sort((a, b) => {
        return ranking[a] - ranking[b]
    })
}
