import { styled } from "theme"

const StyledRoot = styled("div", {
    borderRadius: "$md",
    border: "1px solid $gray6",
    backgroundColor: "$gray2",
})

const StyledHeader = styled("div", {
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    columnGap: "2rem",
    borderTopLeftRadius: "$md",
    borderTopRightRadius: "$md",
    padding: "1rem",
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
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: "0.5rem",
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
