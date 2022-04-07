import * as ToggleGroupPrimitives from "@radix-ui/react-toggle-group"
import { styled } from "theme"

const StyledRoot = styled(ToggleGroupPrimitives.Root, {
    display: "inline-flex",
    backgroundColor: "$gray3",
    borderRadius: "$md",
    border: "1px solid $gray6",
})

const StyledItem = styled(ToggleGroupPrimitives.Item, {
    all: "unset",
    boxSizing: "border-box",
    backgroundColor: "$gray2",
    color: "$gray11",
    height: "2.5rem",
    padding: "0 1rem",
    display: "flex",
    fontSize: "1rem",
    lineHeight: 1,
    alignItems: "center",
    justifyContent: "center",
    "&:first-child": {
        borderTopLeftRadius: "$md",
        borderBottomLeftRadius: "$md",
    },
    "&:last-child": {
        borderTopRightRadius: "$md",
        borderBottomRightRadius: "$md",
    },
    "&:hover": {
        backgroundColor: "$gray3",
    },
    "&[data-state=on]": {
        backgroundColor: "$blue4",
        color: "$blue12",
    },
    "&:focus": {
        position: "relative",
    },
})

export const Root = StyledRoot
export const Item = StyledItem
