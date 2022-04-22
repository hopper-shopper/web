import { useHopperContext } from "contests/HopperContext"
import { styled } from "theme"
import * as Feature from "../HopperCardFeature"

export default function CurrentLevel() {
    const { hopper } = useHopperContext()

    return (
        <Feature.Root>
            <Feature.Title>Current level</Feature.Title>
            <StyledLevel>{hopper.level}</StyledLevel>
        </Feature.Root>
    )
}

const StyledLevel = styled("span", {
    fontSize: "1rem",
    color: "$gray12",
})
