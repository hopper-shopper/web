import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import * as LabeledInput from "components/inputs/labeled-input/LabeledInput"
import Flex from "components/layout/flex/Flex"
import EmptyText from "components/typography/empty-text/EmptyText"
import useObservableState from "hooks/useObservableState"
import { useAtomValue } from "jotai"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import { avaxPriceAtom, avaxPriceByCurrencyAtom, flyPriceByCurrencyAtom } from "stores/prices"
import { styled } from "theme"
import { ALL_ADVENTURES } from "utils/adventures"
import { round } from "utils/numbers"
import { ProvideHopperRoi } from "./HopperRoiContext"
import RoiInDaysRail from "./roi-in-days-rail/RoiInDaysRail"

type HopperRoiProps = {
    hopper: Hopper
}

export default function HopperRoi(props: HopperRoiProps) {
    const { hopper } = props

    const avaxPrices = useAtomValue(avaxPriceAtom)
    const avaxPrice = useAtomValue(avaxPriceByCurrencyAtom)
    const initialFlyPrice = useAtomValue(flyPriceByCurrencyAtom)

    const [boughtFor, setBoughtFor] = useObservableState(round(hopper.price, 2))
    const [startAtLevel, setStartAtLevel] = useState(hopper.level)
    const [flyPrice, setFlyPrice] = useObservableState(round(initialFlyPrice, 2))

    const handleBoughtForBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setBoughtFor(Number.isNaN(value) ? 0 : value)
    }
    const handleStartAtLevelBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setStartAtLevel(Number.isNaN(value) ? hopper.level : value)
    }
    const handleFlyPerAvaxBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber
        setFlyPrice(Number.isNaN(value) ? avaxPrices.FLY : value)
    }

    const boughtForFly = boughtFor * (avaxPrice / flyPrice)

    return (
        <Container>
            <Inputs>
                <Fieldset css={{ gridArea: "price" }}>
                    <Label htmlFor="bought-for">Hopper price</Label>
                    <LabeledInput.Root>
                        <LabeledInput.Input
                            id="bought-for"
                            type="number"
                            placeholder="Price in AVAX"
                            defaultValue={boughtFor || ""}
                            onBlur={handleBoughtForBlur}
                        />
                        <LabeledInput.Hint>AVAX</LabeledInput.Hint>
                    </LabeledInput.Root>
                </Fieldset>

                <Fieldset css={{ gridArea: "level" }}>
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

                <Fieldset css={{ gridArea: "flyPrice" }}>
                    <Label htmlFor="fly-per-avax">FLY price</Label>
                    <LabeledInput.Root>
                        <LabeledInput.Input
                            id="fly-per-avax"
                            type="number"
                            min={0}
                            placeholder="FLY price"
                            defaultValue={flyPrice || ""}
                            onBlur={handleFlyPerAvaxBlur}
                        />
                        <LabeledInput.Hint>FLY</LabeledInput.Hint>
                    </LabeledInput.Root>
                </Fieldset>
            </Inputs>

            {boughtForFly === 0 && (
                <EmptyText>Please enter Hopper price to calculate it's ROI</EmptyText>
            )}
            {boughtForFly > 0 && (
                <ProvideHopperRoi
                    hopper={hopper}
                    startAtLevel={startAtLevel}
                    boughtForFly={boughtForFly}>
                    <Flex direction="column" y="stretch" gap="md">
                        {ALL_ADVENTURES.map(adventure => (
                            <RoiInDaysRail key={adventure} adventure={adventure} />
                        ))}
                    </Flex>
                </ProvideHopperRoi>
            )}
        </Container>
    )
}

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
})
const Inputs = styled("div", {
    display: "grid",
    gap: "1rem",
    gridTemplate: `
        "price price"
        "level flyPrice" / 1fr 1fr
    `,
    "@md": {
        gridTemplate: `
            "price level . flyPrice" / 200px 100px 1fr 150px
        `,
    },
})
