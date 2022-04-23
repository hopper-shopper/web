import { SortHopperBy } from "sorters/hoppers"
import { Adventure } from "utils/adventures"

export type SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy
    [Adventure.STREAM]: SortHopperBy
    [Adventure.SWAMP]: SortHopperBy
    [Adventure.RIVER]: SortHopperBy
    [Adventure.FOREST]: SortHopperBy
    [Adventure.GREAT_LAKE]: SortHopperBy
}

export const RatingSortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.RATING_POND,
    [Adventure.STREAM]: SortHopperBy.RATING_STREAM,
    [Adventure.SWAMP]: SortHopperBy.RATING_SWAMP,
    [Adventure.RIVER]: SortHopperBy.RATING_RIVER,
    [Adventure.FOREST]: SortHopperBy.RATING_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.RATING_GREAT_LAKE,
}
export const MaxPriceSortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.MAX_PRICE_POND,
    [Adventure.STREAM]: SortHopperBy.MAX_PRICE_STREAM,
    [Adventure.SWAMP]: SortHopperBy.MAX_PRICE_SWAMP,
    [Adventure.RIVER]: SortHopperBy.MAX_PRICE_RIVER,
    [Adventure.FOREST]: SortHopperBy.MAX_PRICE_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.MAX_PRICE_GREAT_LAKE,
}
export const BaseFlySortPreset: SortPresetByAdventure = {
    [Adventure.POND]: SortHopperBy.BASE_FLY_POND,
    [Adventure.STREAM]: SortHopperBy.BASE_FLY_STREAM,
    [Adventure.SWAMP]: SortHopperBy.BASE_FLY_SWAMP,
    [Adventure.RIVER]: SortHopperBy.BASE_FLY_RIVER,
    [Adventure.FOREST]: SortHopperBy.BASE_FLY_FOREST,
    [Adventure.GREAT_LAKE]: SortHopperBy.BASE_FLY_GREAT_LAKE,
}
