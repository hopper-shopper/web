import { styled } from "theme"
import * as Radio from "components/inputs/radio/Radio"
import Flex from "components/layout/flex/Flex"
import Label from "components/inputs/label/Label"
import * as Checkbox from "components/inputs/checkbox/Checkbox"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import { HopperId } from "models/Hopper"

type ConfigureWatchlistFilterProps = {
    filter: WatchlistFilter
    onChange: (filter: WatchlistFilter) => void
}

export default function ConfigureWatchlistFilter(props: ConfigureWatchlistFilterProps) {
    const { filter, onChange } = props

    const handleMarketChange = (marketFilter: WatchlistMarketFilter) => {
        onChange({
            ...filter,
            market: marketFilter,
        })
    }
    const getFeatureCheckboxProps = (forFeature: WatchlistCardFeature): CheckboxProps => {
        return {
            checked: filter.features.includes(forFeature),
            onCheckedChange: checked => {
                if (typeof checked !== "boolean") {
                    return
                }

                if (checked) {
                    onChange({
                        ...filter,
                        features: Array.from(new Set([...filter.features, forFeature])),
                    })
                } else {
                    onChange({
                        ...filter,
                        features: Array.from(
                            new Set([...filter.features.filter(feature => feature !== forFeature)]),
                        ),
                    })
                }
            },
        }
    }
    const handleNormalizeLevelChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const normalizeLevel = event.target.valueAsNumber

        onChange({
            ...filter,
            normalizeLevel: Number.isNaN(normalizeLevel) ? 0 : normalizeLevel,
        })
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Market</SectionTitle>
                <Radio.Root value={filter.market} onValueChange={handleMarketChange}>
                    <Column>
                        <Flex gap="sm">
                            <Radio.Radio value={WatchlistMarketFilter.ANY} id="any">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="any">Any</Label>
                        </Flex>

                        <Flex gap="sm">
                            <Radio.Radio value={WatchlistMarketFilter.ON_MARKET} id="on-market">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="on-market">Listed</Label>
                        </Flex>

                        <Flex gap="sm">
                            <Radio.Radio value={WatchlistMarketFilter.OFF_MARKET} id="off-market">
                                <Radio.Indicator />
                            </Radio.Radio>
                            <Label htmlFor="off-market">Not listed</Label>
                        </Flex>
                    </Column>
                </Radio.Root>
            </Section>

            <Section>
                <SectionTitle>Configure View</SectionTitle>
                <Column>
                    <Flex gap="sm">
                        <Checkbox.Root
                            id="feature-market-price"
                            {...getFeatureCheckboxProps(WatchlistCardFeature.MARKET_PRICE)}>
                            <Checkbox.Indicator>
                                <Checkbox.Icon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <Label htmlFor="feature-market-price">Market price</Label>
                    </Flex>

                    <Flex gap="sm">
                        <Checkbox.Root
                            id="feature-adventure-permit"
                            {...getFeatureCheckboxProps(WatchlistCardFeature.ADVENTURE_PERMIT)}>
                            <Checkbox.Indicator>
                                <Checkbox.Icon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <Label htmlFor="feature-adventure-permit">Adventure permit</Label>
                    </Flex>

                    <Flex gap="sm">
                        <Checkbox.Root
                            id="feature-fly-earnings"
                            {...getFeatureCheckboxProps(WatchlistCardFeature.FLY_EARNINGS)}>
                            <Checkbox.Indicator>
                                <Checkbox.Icon />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <Label htmlFor="feature-fly-earnings">FLY earnings</Label>
                    </Flex>
                </Column>
            </Section>

            <RightSlot>
                <Section>
                    <Fieldset>
                        <Label htmlFor="normalize-level">Normalize level</Label>
                        <Input
                            id="normalize-level"
                            type="number"
                            placeholder="Normalize hopper levels"
                            min={1}
                            max={100}
                            css={{ width: 250 }}
                            defaultValue={filter.normalizeLevel || ""}
                            onBlur={handleNormalizeLevelChange}
                        />
                    </Fieldset>
                </Section>
            </RightSlot>
        </Container>
    )
}

export enum WatchlistMarketFilter {
    ANY = "ANY",
    ON_MARKET = "ON_MARKET",
    OFF_MARKET = "OFF_MARKET",
}
export enum WatchlistCardFeature {
    ADVENTURE_PERMIT = "ADVENTURE_PERMIT",
    FLY_EARNINGS = "FLY_EARNINGS",
    MARKET_PRICE = "MARKET_PRICE",
}
export type WatchlistFilter = {
    market: WatchlistMarketFilter
    features: WatchlistCardFeature[]
    normalizeLevel: number
    hidden: HopperId[]
}

const Container = styled("div", {
    display: "flex",
    columnGap: "4rem",
    alignItems: "flex-start",
})
const Section = styled("div", {
    display: "grid",
    rowGap: "1rem",
})
const SectionTitle = styled("h3", {
    fontSize: "1.125rem",
    color: "$gray11",
    lineHeight: 1.5,
    fontWeight: 500,
})
const Column = styled("div", {
    display: "grid",
    rowGap: "1rem",
})
const RightSlot = styled("div", {
    marginLeft: "auto",
})
