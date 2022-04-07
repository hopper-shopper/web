import * as DropdownPrimitives from "@radix-ui/react-dropdown-menu"
import { styled, ThemeCSS } from "theme"

const StyledContent = styled(DropdownPrimitives.Content, {
    minWidth: 200,
    backgroundColor: "$gray2",
    borderRadius: "$md",
    padding: "0.5rem",
    border: "1px solid $gray6",
})

const itemStyles: ThemeCSS = {
    all: "unset",
    fontSize: "0.875rem",
    lineHeight: 1,
    color: "$gray11",
    borderRadius: "$sm",
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 0.5rem",
    position: "relative",
    paddingLeft: "1.5rem",
    userSelect: "none",
    "&[data-disabled]": {
        color: "$gray9",
        pointerEvents: "none",
    },
    "&:focus": {
        backgroundColor: "$gray4",
        color: "$gray12",
    },
}

const StyledItem = styled(DropdownPrimitives.Item, {
    ...itemStyles,
})

const StyledCheckboxItem = styled(DropdownPrimitives.CheckboxItem, {
    ...itemStyles,
})

const StyledRadioItem = styled(DropdownPrimitives.RadioItem, {
    ...itemStyles,
})

const StyledTriggerItem = styled(DropdownPrimitives.TriggerItem, {
    ...itemStyles,
    '&[data-state="open"]': {
        backgroundColor: "$gray4",
        color: "$gray12",
    },
})

const StyledLabel = styled(DropdownPrimitives.Label, {
    paddingLeft: "1.5rem",
    fontSize: "0.75rem",
    color: "$gray11",
    lineHeight: 1.5,
    margin: "0.25rem 0",
})

const StyledSeparator = styled(DropdownPrimitives.Separator, {
    height: 1,
    backgroundColor: "$gray6",
    margin: "0.5rem",
})

const StyledItemIndicator = styled(DropdownPrimitives.ItemIndicator, {
    position: "absolute",
    left: 0,
    width: "1.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
})

const StyledArrow = styled(DropdownPrimitives.Arrow, {
    fill: "$gray2",
})

const StyledItemIcon = styled("span", {
    color: "$gray11",
    "& > svg": {
        size: "0.875rem",
    },
})

export const Root = DropdownPrimitives.Root
export const Trigger = DropdownPrimitives.Trigger
export const Content = StyledContent
export const Item = StyledItem
export const CheckboxItem = StyledCheckboxItem
export const RadioGroup = DropdownPrimitives.RadioGroup
export const RadioItem = StyledRadioItem
export const ItemIndicator = StyledItemIndicator
export const TriggerItem = StyledTriggerItem
export const Label = StyledLabel
export const Separator = StyledSeparator
export const Arrow = StyledArrow
export const ItemIcon = StyledItemIcon
