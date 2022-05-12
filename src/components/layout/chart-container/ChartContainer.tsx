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

const StyledContent = styled("div", {
    minHeight: 300,
    padding: "0 1rem 1rem",
    "@md": {
        padding: "0 2rem 2rem",
    },
})

export const Root = StyledRoot
export const Header = StyledHeader
export const Title = StyledTitle
export const Description = StyledDescription
export const Content = StyledContent
