import { useHopperContext } from "contexts/HopperContext"
import { formatRating } from "formatters/rating"
import { styled } from "theme"
import * as Feature from "../HopperCardFeature"

export default function PermitDetails() {
    const { hopper } = useHopperContext()

    return (
        <Feature.Root>
            <Feature.Title>Adventure Permit</Feature.Title>
            <TierItem allowed={hopper.rating.river > 0}>
                <span>Tier 2</span>
                <span>{formatRating(hopper.rating.river)} / 100</span>
            </TierItem>
            <TierItem allowed={hopper.rating.forest > 0}>
                <span>Tier 3</span>
                <span>{formatRating(hopper.rating.forest)} / 100</span>
            </TierItem>
            <TierItem allowed={hopper.rating.greatLake > 0}>
                <span>Tier 4</span>
                <span>{formatRating(hopper.rating.greatLake)} / 100</span>
            </TierItem>
        </Feature.Root>
    )
}

const TierItem = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    borderRadius: "$sm",
    color: "$gray12",
    fontSize: "0.75rem",
    variants: {
        allowed: {
            true: {
                backgroundColor: "$teal4",
                color: "$teal11",
            },
            false: {
                backgroundColor: "$red4",
                color: "$red11",
            },
        },
    },
})
