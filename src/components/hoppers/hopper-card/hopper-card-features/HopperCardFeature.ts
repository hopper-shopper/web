import { styled } from "theme"

const StyledRoot = styled("div", {
    display: "grid",
    rowGap: "0.25rem",
})
const StyledTitle = styled("h4", {
    color: "$gray11",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    fontWeight: 400,
})

export const Root = StyledRoot
export const Title = StyledTitle
