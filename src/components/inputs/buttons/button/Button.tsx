import { styled } from "theme"

const Button = styled("button", {
    all: "unset",
    display: "inline-block",
    textAlign: "center",
    height: "2.5rem",
    borderRadius: "$md",
    backgroundColor: "$blue2",
    color: "$blue11",
    fontSize: "1rem",
    padding: "0 1.5rem",
    border: "1px solid $blue7",
    "&:hover": {
        backgroundColor: "$blue3",
        borderColor: "$blue8",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
})

export default Button
