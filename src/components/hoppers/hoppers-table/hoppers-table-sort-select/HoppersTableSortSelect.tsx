import { styled } from "theme"
import * as Select from "components/inputs/select/Select"
import SortArrow from "components/sorting/sort-arrow/SortArrow"
import React from "react"
import { SortHopperBy } from "sorters/hoppers"
import { SortDirection } from "sorters/_common"
import {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "../hoppers-table-filter/HoppersTableFilter"
import { BaseFlySortPreset, MaxPriceSortPreset, RatingSortPreset } from "../hoppersTable.utils"

type HoppersTableSortSelectProps = {
    id?: string

    filter: HoppersTableAnyFilter
    active: SortHopperBy
    direction: SortDirection
    onChange: (sortBy: SortHopperBy, direction: SortDirection) => void
}

export default function HoppersTableSortSelect(props: HoppersTableSortSelectProps) {
    const { id, filter, active, direction, onChange } = props

    const handleValueChange = (value: string) => {
        const [sortable, direction] = parseSortValue(value)
        const sortHopperBy = convertToSortByHopper(sortable, filter)

        onChange(sortHopperBy, direction)
    }

    const sortables = ((): Sortable[] => {
        switch (filter.type) {
            case HoppersTableConfigFilters.NONE:
                return BASE_SORTABLES
            case HoppersTableConfigFilters.PERMIT:
                return PERMIT_FILTER_SORTABLES
            case HoppersTableConfigFilters.FERTILITY:
                return FERTILITY_FILTER_SORTABLES
        }
    })()

    return (
        <Select.Root
            value={makeSortValue(convertToSortable(active), direction)}
            onValueChange={handleValueChange}>
            <Select.Trigger id={id}>
                <Select.Value />
                <Select.Icon />
            </Select.Trigger>

            <Select.Content>
                {sortables.map(sortable => (
                    <React.Fragment key={sortable}>
                        <Select.Item value={makeSortValue(sortable, SortDirection.ASC)}>
                            <StyledSortDirection>↑</StyledSortDirection>
                            <Select.ItemText>{formatSortable(sortable)}</Select.ItemText>
                            <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item value={makeSortValue(sortable, SortDirection.DESC)}>
                            <StyledSortDirection>↓</StyledSortDirection>
                            <Select.ItemText>{formatSortable(sortable)}</Select.ItemText>
                            <Select.ItemIndicator />
                        </Select.Item>
                    </React.Fragment>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

// Components
const StyledSortDirection = styled("span", {
    marginRight: "0.5rem",
})

// Types
enum Sortable {
    TOKEN_ID = "TOKEN_ID",
    LEVEL = "LEVEL",
    LEVEL_COSTS = "LEVEL_COSTS",
    STRENGTH = "STRENGTH",
    AGILITY = "AGILITY",
    VITALITY = "VITALITY",
    INTELLIGENCE = "INTELLIGENCE",
    FERTILITY = "FERTILITY",
    RATING = "RATING",
    PRICE = "PRICE",
    MAX_PRICE_PERMIT = "MAX_PRICE_PERMIT",
    MAX_PRICE_FERTILITY = "MAX_PRICE_FERTILITY",
    BASE_FLY = "BASE_FLY",
}

// Constants
const BASE_SORTABLES: Sortable[] = [
    Sortable.TOKEN_ID,
    Sortable.LEVEL,
    Sortable.STRENGTH,
    Sortable.AGILITY,
    Sortable.VITALITY,
    Sortable.INTELLIGENCE,
    Sortable.FERTILITY,
    Sortable.PRICE,
    Sortable.LEVEL_COSTS,
]

const PERMIT_FILTER_SORTABLES: Sortable[] = [
    ...BASE_SORTABLES,
    Sortable.RATING,
    Sortable.MAX_PRICE_PERMIT,
    Sortable.BASE_FLY,
]

const FERTILITY_FILTER_SORTABLES: Sortable[] = [...BASE_SORTABLES, Sortable.MAX_PRICE_FERTILITY]

// Formatters
function formatSortable(sortable: Sortable): string {
    switch (sortable) {
        case Sortable.TOKEN_ID:
            return "Hopper-ID"
        case Sortable.LEVEL:
            return "Level"
        case Sortable.STRENGTH:
            return "Strength"
        case Sortable.AGILITY:
            return "Agility"
        case Sortable.VITALITY:
            return "Vitality"
        case Sortable.INTELLIGENCE:
            return "Intelligence"
        case Sortable.FERTILITY:
            return "Fertility"
        case Sortable.PRICE:
            return "Price"
        case Sortable.LEVEL_COSTS:
            return "Level costs"
        case Sortable.RATING:
            return "Rating"
        case Sortable.MAX_PRICE_PERMIT:
            return "Max. Price"
        case Sortable.MAX_PRICE_FERTILITY:
            return "Max. Price Fertility"
        case Sortable.BASE_FLY:
            return "Base FLY / level"
    }
}

// Utils
function makeSortValue(sortable: Sortable, direction: SortDirection): string {
    return `${sortable}/${direction}`
}
function parseSortValue(value: string): readonly [Sortable, SortDirection] {
    const [sortable, direction] = value.split("/")
    return [sortable as Sortable, direction as SortDirection]
}

// Converters
function convertToSortable(sortHopperBy: SortHopperBy): Sortable {
    switch (sortHopperBy) {
        case SortHopperBy.TOKEN_ID:
            return Sortable.TOKEN_ID
        case SortHopperBy.LEVEL:
            return Sortable.LEVEL
        case SortHopperBy.LEVEL_COSTS:
            return Sortable.LEVEL_COSTS
        case SortHopperBy.STRENGTH:
            return Sortable.STRENGTH
        case SortHopperBy.AGILITY:
            return Sortable.AGILITY
        case SortHopperBy.VITALITY:
            return Sortable.VITALITY
        case SortHopperBy.INTELLIGENCE:
            return Sortable.INTELLIGENCE
        case SortHopperBy.FERTILITY:
            return Sortable.FERTILITY
        case SortHopperBy.RATING_POND:
            return Sortable.RATING
        case SortHopperBy.RATING_STREAM:
            return Sortable.RATING
        case SortHopperBy.RATING_SWAMP:
            return Sortable.RATING
        case SortHopperBy.RATING_RIVER:
            return Sortable.RATING
        case SortHopperBy.RATING_FOREST:
            return Sortable.RATING
        case SortHopperBy.RATING_GREAT_LAKE:
            return Sortable.RATING
        case SortHopperBy.PRICE:
            return Sortable.PRICE
        case SortHopperBy.MAX_PRICE_POND:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_STREAM:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_SWAMP:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_RIVER:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_FOREST:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_GREAT_LAKE:
            return Sortable.MAX_PRICE_PERMIT
        case SortHopperBy.MAX_PRICE_FERTILITY:
            return Sortable.MAX_PRICE_FERTILITY
        case SortHopperBy.BASE_FLY_POND:
            return Sortable.BASE_FLY
        case SortHopperBy.BASE_FLY_STREAM:
            return Sortable.BASE_FLY
        case SortHopperBy.BASE_FLY_SWAMP:
            return Sortable.BASE_FLY
        case SortHopperBy.BASE_FLY_RIVER:
            return Sortable.BASE_FLY
        case SortHopperBy.BASE_FLY_FOREST:
            return Sortable.BASE_FLY
        case SortHopperBy.BASE_FLY_GREAT_LAKE:
            return Sortable.BASE_FLY
    }
}

function convertToSortByHopper(sortable: Sortable, filter: HoppersTableAnyFilter): SortHopperBy {
    switch (sortable) {
        case Sortable.TOKEN_ID:
            return SortHopperBy.TOKEN_ID
        case Sortable.LEVEL:
            return SortHopperBy.LEVEL
        case Sortable.STRENGTH:
            return SortHopperBy.STRENGTH
        case Sortable.AGILITY:
            return SortHopperBy.AGILITY
        case Sortable.VITALITY:
            return SortHopperBy.VITALITY
        case Sortable.INTELLIGENCE:
            return SortHopperBy.INTELLIGENCE
        case Sortable.FERTILITY:
            return SortHopperBy.FERTILITY
        case Sortable.PRICE:
            return SortHopperBy.PRICE
        case Sortable.LEVEL_COSTS:
            return SortHopperBy.LEVEL_COSTS
        case Sortable.RATING: {
            if (filter.type === HoppersTableConfigFilters.PERMIT) {
                return RatingSortPreset[filter.permit]
            }
            return SortHopperBy.TOKEN_ID
        }
        case Sortable.MAX_PRICE_PERMIT: {
            if (filter.type === HoppersTableConfigFilters.PERMIT) {
                return MaxPriceSortPreset[filter.permit]
            }
            return SortHopperBy.TOKEN_ID
        }
        case Sortable.MAX_PRICE_FERTILITY:
            return SortHopperBy.MAX_PRICE_FERTILITY
        case Sortable.BASE_FLY: {
            if (filter.type === HoppersTableConfigFilters.PERMIT) {
                return BaseFlySortPreset[filter.permit]
            }
            return SortHopperBy.TOKEN_ID
        }
    }
}
