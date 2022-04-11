import { styled } from "theme"

const StyledRoot = styled("section", {
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
})
const StyledTitle = styled("h2", {
    color: "$gray12",
    fontSize: "1.25rem",
    lineHeight: 1.5,
    paddingLeft: "2rem",
    position: "relative",
    "&::before": {
        content: '" "',
        position: "absolute",
        left: 0,
        width: "1.5rem",
        height: 1,
        backgroundColor: "$gray12",
        top: "50%",
    },
})

export const Root = StyledRoot
export const Title = StyledTitle
