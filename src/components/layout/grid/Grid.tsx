import { styled } from "theme"

const Grid = styled("div", {
    display: "grid",
    variants: {
        columns: {
            2: {
                gridTemplateColumns: "repeat(2, 1fr)",
            },
            3: {
                gridTemplateColumns: "repeat(3, 1fr)",
            },
            4: {
                gridTemplateColumns: "repeat(4, 1fr)",
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
        gap: "none",
    },
})

export default Grid
