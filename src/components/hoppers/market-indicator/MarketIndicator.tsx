import { styled } from "theme"

const MarketIndicator = styled("div", {
    borderRadius: "50%",
    width: "0.5rem",
    height: "0.5rem",
    outlineStyle: "solid",
    outlineWidth: "0.125rem",
    variants: {
        onMarket: {
            true: {
                backgroundColor: "$teal9",
                outlineColor: "$teal7",
            },
            false: {
                backgroundColor: "$red9",
                outlineColor: "$red7",
            },
        },
    },
})

export default MarketIndicator
