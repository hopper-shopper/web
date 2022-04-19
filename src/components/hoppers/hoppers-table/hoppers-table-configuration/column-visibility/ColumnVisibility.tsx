import Flex from "components/layout/flex/Flex"
import { styled } from "theme"
import { HoppersTableColumn } from "../HoppersTableConfiguration"
import * as Checkbox from "components/inputs/checkbox/Checkbox"

type ColumnVisibiltyProps = {
    column: HoppersTableColumn
    checked: boolean
    toggle: () => void
}

export default function ColumnVisibilty(props: ColumnVisibiltyProps) {
    const { column, checked, toggle } = props

    const id = `column-visibility-${column}`

    return (
        <Flex y="center" x="between">
            <StyledTitle htmlFor={id}>{getColumnTitle(column)}</StyledTitle>
            <Checkbox.Root id={id} checked={checked} onCheckedChange={toggle}>
                <Checkbox.Indicator>
                    <Checkbox.Icon />
                </Checkbox.Indicator>
            </Checkbox.Root>
        </Flex>
    )
}

const StyledTitle = styled("label", {
    color: "$gray11",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.25,
    flex: 1,
    "&:hover": {
        color: "$gray12",
    },
})

function getColumnTitle(column: HoppersTableColumn): string {
    switch (column) {
        case HoppersTableColumn.IMAGE:
            return "Image"
        case HoppersTableColumn.HOPPER_ID:
            return "Hopper-ID"
        case HoppersTableColumn.LEVEL:
            return "Level"
        case HoppersTableColumn.STRENGTH:
            return "Strength"
        case HoppersTableColumn.AGILITY:
            return "Agility"
        case HoppersTableColumn.VITALITY:
            return "Vitality"
        case HoppersTableColumn.INTELLIGENCE:
            return "Intelligence"
        case HoppersTableColumn.FERTILITY:
            return "Fertility"
        case HoppersTableColumn.PRICE:
            return "Price"
        case HoppersTableColumn.LEVEL_COSTS:
            return "Level costs"
        case HoppersTableColumn.MAX_PRICE:
            return "Max. Price"
        case HoppersTableColumn.RATING:
            return "Rating"
        case HoppersTableColumn.BASE_FLY:
            return "Base FLY / Level"
        case HoppersTableColumn.FERTILITY_50:
            return "Cost 50 % chance"
        case HoppersTableColumn.FERTILITY_75:
            return "Cost 75 % chance"
    }
}
