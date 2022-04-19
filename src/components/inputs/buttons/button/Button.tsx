import { styled } from "theme"

const Button = styled("button", {
    all: "unset",
    display: "inline-block",
    textAlign: "center",
    borderRadius: "$md",
    backgroundColor: "$blue2",
    color: "$blue11",
    border: "1px solid $blue7",
    "&:hover": {
        backgroundColor: "$blue3",
        borderColor: "$blue8",
    },
    "&:focus": {
        outline: "2px solid $blue8",
    },
    variants: {
        size: {
            sm: {
                height: "1.5rem",
                fontSize: "0.875rem",
                padding: "0 1rem",
            },
            md: {
                height: "2.5rem",
                fontSize: "1rem",
                padding: "0 1.5rem",
            },
        },
    },
    defaultVariants: {
        size: "md",
    },
})

export default Button
