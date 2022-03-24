import { styled } from "theme"

const Flex = styled("div", {
    display: "flex",
    variants: {
        x: {
            start: {
                justifyContent: "flex-start",
            },
            center: {
                justifyContent: "center",
            },
            end: {
                justifyContent: "flex-end",
            },
            between: {
                justifyContent: "space-between",
            },
        },
        y: {
            stretch: {
                alignItems: "stretch",
            },
            start: {
                alignItems: "flex-start",
            },
            center: {
                alignItems: "center",
            },
            end: {
                alignItems: "flex-end",
            },
        },
        gap: {
            none: {
                gap: 0,
            },
            sm: {
                gap: "0.5rem",
            },
            md: {
                gap: "1rem",
            },
        },
    },
    defaultVariants: {
        x: "start",
        y: "center",
        gap: "none",
    },
})

export default Flex
