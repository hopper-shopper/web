import * as CheckboxPrimitives from "@radix-ui/react-checkbox"
import { IconCheck } from "@tabler/icons"
import { styled } from "theme"

const StyledCheckbox = styled(CheckboxPrimitives.Root, {
    backgroundColor: "$gray2",
    size: "1.5rem",
    borderRadius: "0.25rem",
    border: "1px solid $gray7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    "&:hover": {
        backgroundColor: "$gray3",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
})

const StyledIndicator = styled(CheckboxPrimitives.Indicator, {
    color: "$gray11",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
})

const StyledIcon = styled(IconCheck, {
    size: "1rem",
})

export const Root = StyledCheckbox
export const Indicator = StyledIndicator
export const Icon = StyledIcon
