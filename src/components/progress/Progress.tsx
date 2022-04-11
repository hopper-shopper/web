import * as ProgressPrimitives from "@radix-ui/react-progress"
import { styled } from "theme"

const StyledRoot = styled(ProgressPrimitives.Root, {
    position: "relative",
    overflow: "hidden",
    background: "$gray3",
    borderRadius: "$md",
    border: "1px solid $gray6",
    height: "2rem",
})

const StyledIndicator = styled(ProgressPrimitives.Indicator, {
    height: "100%",
    transition: "width 660ms cubic-bezier(0.65, 0, 0.35, 1)",
    variants: {
        severity: {
            normal: {
                backgroundColor: "$blue9",
                color: "$blue12",
            },
            danger: {
                backgroundColor: "$red9",
                color: "$red12",
            },
        },
    },
    defaultVariants: {
        severity: "normal",
    },
})

export const Root = StyledRoot
export const Indicator = StyledIndicator
