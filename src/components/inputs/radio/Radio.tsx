import * as RadioGroupPrimitives from "@radix-ui/react-radio-group"
import { styled } from "theme"

const StyledRadio = styled(RadioGroupPrimitives.Item, {
    all: "unset",
    boxSizing: "border-box",
    backgroundColor: "$gray2",
    size: "1.5rem",
    borderRadius: "100%",
    border: "1px solid $gray7",
    "&:hover": {
        backgroundColor: "$gray3",
        borderColor: "$gray8",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
})

const StyledIndicator = styled(RadioGroupPrimitives.Indicator, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    size: "100%",
    position: "relative",
    "&::after": {
        content: '""',
        display: "block",
        size: "0.75rem",
        borderRadius: "50%",
        backgroundColor: "$blue11",
    },
})

export const Root = RadioGroupPrimitives.Root
export const Radio = StyledRadio
export const Indicator = StyledIndicator
