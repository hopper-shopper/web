import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import Label from "components/inputs/label/Label"
import Flex from "components/layout/flex/Flex"
import { formatAdventure } from "formatters/adventure"
import RightSlot from "components/layout/flex/RightSlot"
import { Hopper } from "models/Hopper"
import { useState } from "react"
import HopperRoiCalculator from "services/hopper-roi-calculator/HopperRoiCalculator"
import usePricesStore from "stores/prices"
import { styled } from "theme"
import { Adventure, ALL_ADVENTURES } from "utils/adventures"
import { round } from "utils/numbers"
import useSettingsStore from "stores/settings"
import { Currency } from "formatters/currency"
import * as LabeledInput from "components/inputs/labeled-input/LabeledInput"
import useObservableState from "hooks/useObservableState"

type HopperRoiProps = {
    hopper: Hopper
}

export default function HopperRoi(props: HopperRoiProps) {
    const { hopper } = props

    const avaxPrices = usePricesStore(store => store.price.AVAX)
    const flyPrices = usePricesStore(store => store.price.FLY)
    const currency = useSettingsStore(store => store.currency)

    const [boughtFor, setBoughtFor] = useObservableState(round(hopper.listing.price, 2))
    const [startAtLevel, setStartAtLevel] = useState(hopper.level)
    const [flyPrice, setFlyPrice] = useObservableState(
        round(currency === Currency.USD ? flyPrices.USD : flyPrices.EUR, 2),
    )

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

    const avaxPrice = ((): number => {
        if (currency === Currency.USD) {
            return avaxPrices.USD
        } else if (currency === Currency.EUR) {
            return avaxPrices.EUR
        }
        return 0
    })()

    const getRoiInDaysForAdventure = (adventure: Adventure): string => {
        const flyPerAvax = avaxPrice / flyPrice
        const boughtForFly = boughtFor * flyPerAvax

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
                <Fieldset>
                    <Label htmlFor="bought-for">Hopper price</Label>
                    <LabeledInput.Root css={{ maxWidth: 200 }}>
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

                <RightSlot>
                    <Fieldset css={{ maxWidth: 200 }}>
                        <Label htmlFor="fly-per-avax">FLY price</Label>
                        <LabeledInput.Root css={{ maxWidth: 200 }}>
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
                </RightSlot>
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
