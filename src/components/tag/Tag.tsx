import { styled } from "theme"

const StyledRoot = styled("div", {
    display: "inline-flex",
    columnGap: "0.5rem",
    alignItems: "center",
    borderRadius: "$sm",
    border: "1px solid $gray7",
    padding: "0.25rem 0.5rem",
    cursor: "default",
    backgroundColor: "$gray2",
    "&:hover": {
        backgroundColor: "$gray3",
        borderColor: "$gray8",
    },
    variants: {
        disabled: {
            true: {
                opacity: 0.5,
            },
        },
    },
    defaultVariants: {
        disabled: false,
    },
})

const StyledMarker = styled("div", {
    size: "0.75rem",
    borderRadius: "50%",
})

const StyledText = styled("span", {
    fontSize: "0.75rem",
    color: "$gray12",
    userSelect: "none",
})

export const Root = StyledRoot
export const Marker = StyledMarker
export const Text = StyledText
