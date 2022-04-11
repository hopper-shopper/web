import { styled } from "theme"
import * as Radio from "components/inputs/radio/Radio"
import Flex from "components/layout/flex/Flex"
import Label from "components/inputs/label/Label"

type ConfigureWatchlistFilterProps = {
    filter: WatchlistFilter
    onChange: (filter: WatchlistFilter) => void
}

export default function ConfigureWatchlistFilter(props: ConfigureWatchlistFilterProps) {
    const { filter, onChange } = props

    const handleMarketChange = (marketFilter: WatchlistMarketFilter) => {
        onChange({
            market: marketFilter,
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
        </Container>
    )
}

export enum WatchlistMarketFilter {
    ANY = "ANY",
    ON_MARKET = "ON_MARKET",
    OFF_MARKET = "OFF_MARKET",
}
export type WatchlistFilter = {
    market: WatchlistMarketFilter
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
const SectionContent = styled("div", {
    display: "flex",
    columnGap: "2rem",
})
const Column = styled("div", {
    display: "grid",
    rowGap: "1rem",
})
