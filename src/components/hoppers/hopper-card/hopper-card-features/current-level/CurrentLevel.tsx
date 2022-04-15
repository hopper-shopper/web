import { styled } from "theme"
import { useHopperCardContext } from "../../HopperCardContext"
import * as Feature from "../HopperCardFeature"

export default function CurrentLevel() {
    const { hopper } = useHopperCardContext()

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
