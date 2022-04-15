import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import Flex from "components/layout/flex/Flex"
import { formatAdventure } from "formatters/adventure"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import HopperRoiCalculator from "services/hopper-roi-calculator/HopperRoiCalculator"
import usePricesStore from "stores/prices"
import { styled } from "theme"
import { Adventure, ALL_ADVENTURES } from "utils/adventures"
import { round } from "utils/numbers"

type HopperRoiProps = {
    hopper: Hopper
}

export default function HopperRoi(props: HopperRoiProps) {
    const { hopper } = props

    const flyPerAvax = usePricesStore(store => store.price.AVAX.FLY)

    const [boughtFor, setBoughtFor] = useState(round(hopper.listing.price, 2))
    const [startAtLevel, setStartAtLevel] = useState(hopper.level)

    const handleBoughtForBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setBoughtFor(Number.isNaN(value) ? 0 : value)
    }
    const handleStartAtLevelBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setStartAtLevel(Number.isNaN(value) ? hopper.level : value)
    }

    const boughtForFly = boughtFor * flyPerAvax

    const getRoiInDaysForAdventure = (adventure: Adventure): string => {
        const roiCalculator = new HopperRoiCalculator(hopper, startAtLevel).forAdventure(adventure)
        const roiInDays = roiCalculator.calculateRoiInDays(boughtForFly)

        if (roiInDays === null) {
            return "-"
        }

        return `${Math.ceil(roiInDays)} Days`
    }

    return (
        <Container>
            <Flex gap="md">
                <Fieldset css={{ maxWidth: 200 }}>
                    <Label htmlFor="bought-for">Hopper price</Label>
                    <Input
                        id="bought-for"
                        type="number"
                        placeholder="Price in AVAX"
                        defaultValue={boughtFor || ""}
                        onBlur={handleBoughtForBlur}
                    />
                </Fieldset>

                <Fieldset css={{ maxWidth: 200 }}>
                    <Label htmlFor="start-at-level">Start at level</Label>
                    <Input
                        id="start-at-level"
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Level"
                        defaultValue={startAtLevel || ""}
                        onBlur={handleStartAtLevelBlur}
                    />
                </Fieldset>
            </Flex>

            <Flex direction="column" y="stretch" gap="md">
                {ALL_ADVENTURES.map(adventure => (
                    <Flex key={adventure} x="between" y="center">
                        <AdventureTitle>{formatAdventure(adventure)}</AdventureTitle>
                        <RoiInDays>{getRoiInDaysForAdventure(adventure)}</RoiInDays>
                    </Flex>
                ))}
            </Flex>
        </Container>
    )
}

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
})
const AdventureTitle = styled("h3", {
    color: "$gray12",
    fontSize: "1rem",
    fontWeight: 400,
})
const RoiInDays = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})
