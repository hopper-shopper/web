import { styled } from "theme"

const StyledRoot = styled("div", {
    borderRadius: "$md",
    border: "1px solid $gray6",
    backgroundColor: "$gray2",
})

const StyledHeader = styled("div", {
    marginBottom: "1rem",
    borderTopLeftRadius: "$md",
    borderTopRightRadius: "$md",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    "@lg": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        columnGap: "2rem",
    },
})

const StyledTitle = styled("h3", {
    flex: 1,
    fontSize: "1.25rem",
    color: "$gray12",
    fontWeight: 400,
    lineHeight: 1.5,
})

const StyledDescription = styled("p", {
    fontSize: "0.75rem",
    color: "$gray11",
})

const StyledActions = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@lg": {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
})

const StyledContent = styled("div", {
    minHeight: 300,
    padding: "1rem",
})

export const Root = StyledRoot
export const Header = StyledHeader
export const Title = StyledTitle
export const Description = StyledDescription
export const Actions = StyledActions
export const Content = StyledContent
