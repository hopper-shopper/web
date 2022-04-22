import { styled } from "theme"
import * as Radio from "components/inputs/radio/Radio"
import Flex from "components/layout/flex/Flex"
import Label from "components/inputs/label/Label"
import Checkbox from "components/inputs/checkbox/Checkbox"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Input from "components/inputs/input/Input"
import { HopperId } from "models/Hopper"
import { toggleItem } from "utils/array"

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

                onChange({
                    ...filter,
                    features: toggleItem(filter.features, forFeature, checked),
                })
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
    const getAdventureTierPermitCheckboxProps = (forPermit: AdventureTierPermit): CheckboxProps => {
        return {
            checked: filter.permit.includes(forPermit),
            onCheckedChange: checked => {
                if (typeof checked !== "boolean") {
                    return
                }

                onChange({
                    ...filter,
                    permit: toggleItem(filter.permit, forPermit, checked),
                })
            },
        }
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Market</SectionTitle>
                <Radio.Root value={filter.market} onValueChange={handleMarketChange}>
                    <Column>
                        {ALL_MARKET_FILTERS.map(marketFilter => (
                            <Flex key={marketFilter} gap="sm">
                                <Radio.Radio
                                    value={marketFilter}
                                    id={`market-filter-${marketFilter}`}>
                                    <Radio.Indicator />
                                </Radio.Radio>
                                <Label htmlFor={`market-filter-${marketFilter}`}>
                                    {formatMarketFilter(marketFilter)}
                                </Label>
                            </Flex>
                        ))}
                    </Column>
                </Radio.Root>
            </Section>

            <Section>
                <SectionTitle>Configure View</SectionTitle>
                <Column>
                    {ALL_FEATURES.map(feature => (
                        <Flex key={feature} gap="sm">
                            <Checkbox
                                id={`feature-${feature}`}
                                {...getFeatureCheckboxProps(feature)}
                            />
                            <Label htmlFor={`feature-${feature}`}>{formatFeature(feature)}</Label>
                        </Flex>
                    ))}
                </Column>
            </Section>

            <Section>
                <SectionTitle>Permit</SectionTitle>
                <Column>
                    {ALL_PERMITS.map(permit => (
                        <Flex key={permit} gap="sm">
                            <Checkbox
                                id={`permit-${permit}`}
                                {...getAdventureTierPermitCheckboxProps(permit)}
                            />
                            <Label htmlFor={`permit-${permit}`}>{formatPermit(permit)}</Label>
                        </Flex>
                    ))}
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
                            css={{ "@md": { width: 200 }, "@lg": { width: 250 } }}
                            defaultValue={filter.normalizeLevel || ""}
                            onBlur={handleNormalizeLevelChange}
                        />
                    </Fieldset>
                </Section>
            </RightSlot>
        </Container>
    )
}

// Types
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
export enum AdventureTierPermit {
    T1 = "T1",
    T2 = "T2",
    T3 = "T3",
    T4 = "T4",
}
export type WatchlistFilter = {
    market: WatchlistMarketFilter
    features: WatchlistCardFeature[]
    normalizeLevel: number
    hidden: HopperId[]
    permit: AdventureTierPermit[]
}

// Components
const Container = styled("div", {
    display: "grid",
    rowGap: "2rem",
    "@md": {
        display: "flex",
        columnGap: "2rem",
        alignItems: "flex-start",
    },
    "@lg": {
        columnGap: "3rem",
    },
    "@xl": {
        columnGap: "4rem",
    },
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
    "@md": {
        marginLeft: "auto",
    },
})

// Constants
const ALL_MARKET_FILTERS: WatchlistMarketFilter[] = [
    WatchlistMarketFilter.ANY,
    WatchlistMarketFilter.ON_MARKET,
    WatchlistMarketFilter.OFF_MARKET,
]

const ALL_FEATURES: WatchlistCardFeature[] = [
    WatchlistCardFeature.MARKET_PRICE,
    WatchlistCardFeature.ADVENTURE_PERMIT,
    WatchlistCardFeature.FLY_EARNINGS,
]

const ALL_PERMITS: AdventureTierPermit[] = [
    AdventureTierPermit.T1,
    AdventureTierPermit.T2,
    AdventureTierPermit.T3,
    AdventureTierPermit.T4,
]

// Formatters
function formatMarketFilter(marketFilter: WatchlistMarketFilter): string {
    switch (marketFilter) {
        case WatchlistMarketFilter.ANY:
            return "Any"
        case WatchlistMarketFilter.ON_MARKET:
            return "Listed"
        case WatchlistMarketFilter.OFF_MARKET:
            return "Not listed"
    }
}

function formatFeature(feature: WatchlistCardFeature): string {
    switch (feature) {
        case WatchlistCardFeature.MARKET_PRICE:
            return "Market price"
        case WatchlistCardFeature.ADVENTURE_PERMIT:
            return "Adventure permit"
        case WatchlistCardFeature.FLY_EARNINGS:
            return "FLY earnings"
    }
}

function formatPermit(permit: AdventureTierPermit): string {
    switch (permit) {
        case AdventureTierPermit.T1:
            return "T1"
        case AdventureTierPermit.T2:
            return "T2"
        case AdventureTierPermit.T3:
            return "T3"
        case AdventureTierPermit.T4:
            return "T4"
    }
}
