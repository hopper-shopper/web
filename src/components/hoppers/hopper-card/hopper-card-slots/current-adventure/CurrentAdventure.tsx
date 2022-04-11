import { formatAdventure } from "formatters/adventure"
import { styled } from "theme"
import { getIdealAdventure } from "utils/adventures"
import { hopperAdventureToAdventure } from "utils/hopper"
import { useHopperCardContext } from "../../HopperCardContext"

export default function CurrentAdventure() {
    const { hopper } = useHopperCardContext()

    const hopperAdventure = hopperAdventureToAdventure(hopper)
    const idealAdventure = getIdealAdventure(hopper)

    return (
        <StyledAdventure
            ideal={hopperAdventure === null ? undefined : hopperAdventure === idealAdventure}>
            {formatAdventure(hopperAdventure)}
        </StyledAdventure>
    )
}

const StyledAdventure = styled("span", {
    fontSize: "1rem",
    color: "$gray11",
    variants: {
        ideal: {
            true: {
                color: "$teal11",
            },
            false: {
                color: "$red11",
            },
        },
    },
})
