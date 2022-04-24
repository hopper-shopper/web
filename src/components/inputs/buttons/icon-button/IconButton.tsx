import { styled } from "theme"

const IconButton = styled("button", {
    all: "unset",
    backgroundColor: "$gray3",
    color: "$gray11",
    borderRadius: "50%",
    border: "none",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        backgroundColor: "$gray4",
    },
    "&:focus": {
        backgroundColor: "$gray5",
        outline: "2px solid $blue8",
    },
    variants: {
        size: {
            sm: {
                size: "1.5rem",
                "> svg": {
                    size: "1rem",
                },
            },
            md: {
                size: "2.5rem",
                "> svg": {
                    size: "1.25rem",
                },
            },
        },
    },
    defaultVariants: {
        size: "md",
    },
})

export default IconButton
