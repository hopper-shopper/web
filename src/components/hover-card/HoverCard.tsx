import * as HoverCardPrimitives from "@radix-ui/react-hover-card"
import { styled } from "theme"

const StyledContent = styled(HoverCardPrimitives.Content, {
    borderRadius: "$md",
    padding: "2rem",
    width: 300,
    backgroundColor: "$gray2",
    border: "1px solid $gray6",
})

const StyledArrow = styled(HoverCardPrimitives.Arrow, {
    fill: "$gray6",
})

export const Root = HoverCardPrimitives.Root
export const Trigger = HoverCardPrimitives.Trigger
export const Content = StyledContent
export const Arrow = StyledArrow
