import { styled } from "theme"

const Button = styled("button", {
    all: "unset",
    display: "inline-block",
    textAlign: "center",
    borderRadius: "$md",
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
        color: {
            neutral: {
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
            },
            danger: {
                backgroundColor: "$red2",
                color: "$red11",
                border: "1px solid $red7",
                "&:hover": {
                    backgroundColor: "$red3",
                    borderColor: "$red8",
                },
                "&:focus": {
                    outline: "2px solid $red8",
                },
            },
        },
    },
    defaultVariants: {
        color: "neutral",
        size: "md",
    },
})

export default Button
