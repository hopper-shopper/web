import { styled } from "theme"

const EmptyText = styled("p", {
    color: "$gray11",
    fontSize: "1rem",
    lineHeight: 1.25,
    variants: {
        padding: {
            none: {
                padding: 0,
            },
            sm: {
                padding: "1rem",
            },
            md: {
                padding: "2rem 1rem",
                "@md": {
                    padding: "2rem",
                },
            },
        },
        align: {
            left: {
                textAlign: "left",
            },
            center: {
                textAlign: "center",
            },
        },
    },
    defaultVariants: {
        padding: "none",
        align: "left",
    },
})

export default EmptyText
