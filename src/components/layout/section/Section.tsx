import { styled } from "theme"

const StyledRoot = styled("section", {
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
})

const StyledHeader = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@md": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})

const StyledTitle = styled("h2", {
    flex: 1,
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

const StyledDescription = styled("p", {
    fontSize: "0.875rem",
    color: "$gray11",
    lineHeight: 1.25,
})

export const Root = StyledRoot
export const Header = StyledHeader
export const Title = StyledTitle
export const Description = StyledDescription
