import { SoldFilter } from "api/filters/market"
import useHoppersListings from "api/hooks/useHoppersListings"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { Hopper } from "models/Hopper"
import { sortListings, SortListingBy } from "sorters/listings"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure, hopperAdventureToAdventure } from "utils/adventures"
import * as Table from "components/table/Table"

type HoppersTableCompactProps = {
    hoppers: Hopper[]
}

export default function HoppersTableCompact(props: HoppersTableCompactProps) {
    const { hoppers } = props

    const { listings: hopperListings } = useHoppersListings({
        tokenIds: hoppers.map(hopper => hopper.tokenId),
        sold: SoldFilter.SOLD,
    })

    const getHopperPrice = (hopperId: Hopper["tokenId"]): number => {
        if (hopperListings.length === 0) {
            return 1.75
        }

        const listingsByHopper = sortListings(
            hopperListings.filter(listing => listing.tokenId === hopperId),
            {
                by: SortListingBy.TIMESTAMP,
                direction: SortDirection.DESC,
            },
        )
        const latestPrice = listingsByHopper[0]?.price ?? 1.75

        return latestPrice
    }
    const getBestAdventure = (forHopper: Hopper): Adventure => {
        const baseFlies = [
            forHopper.baseFly.pond,
            forHopper.baseFly.stream,
            forHopper.baseFly.swamp,
            forHopper.baseFly.river,
            forHopper.baseFly.forest,
            forHopper.baseFly.greatLake,
        ]
        const adventures = [
            Adventure.POND,
            Adventure.STREAM,
            Adventure.SWAMP,
            Adventure.RIVER,
            Adventure.FOREST,
            Adventure.GREAT_LAKE,
        ]

        const maxBaseFly = Math.max(...baseFlies)
        const maxBaseFlyIndex = baseFlies.lastIndexOf(maxBaseFly)

        return adventures[maxBaseFlyIndex]
    }

    const summaryAdventure = ((): string => {
        const adventures = new Set(
            hoppers
                .filter(hopper => hopper.inAdventure)
                .map(hopper => formatAdventure(hopperAdventureToAdventure(hopper))),
        )

        return Array.from(adventures).join(", ")
    })()
    const summaryLevelCosts = ((): string => {
        const totalLevelCosts = hoppers.reduce((acc, cur) => acc + cur.levelCosts, 0)
        return formatCurrency(totalLevelCosts, Currency.AVAX)
    })()
    const summaryBuyPrices = ((): string => {
        const totalBuyPrices = hoppers.reduce((acc, cur) => acc + getHopperPrice(cur.tokenId), 0)
        return formatCurrency(totalBuyPrices, Currency.AVAX)
    })()

    const renderRow = (hopper: Hopper, index: number): React.ReactNode => {
        const bestAdventure = getBestAdventure(hopper)
        const hopperAdventure = hopperAdventureToAdventure(hopper)

        return (
            <Table.Row key={hopper.tokenId} striped={index % 2 === 0}>
                <Table.Cell>
                    <Center>
                        <Image src={hopper.image} />
                    </Center>
                </Table.Cell>
                <Table.Cell>{hopper.tokenId}</Table.Cell>
                <Table.Cell>{hopper.level}</Table.Cell>
                <Table.Cell>{formatAdventure(hopperAdventure)}</Table.Cell>
                <Table.Cell
                    css={{ color: hopperAdventure === bestAdventure ? "$teal11" : "$red11" }}>
                    {formatAdventure(bestAdventure)}
                </Table.Cell>
                <Table.Cell align="right">
                    {formatCurrency(hopper.levelCosts, Currency.AVAX)}
                </Table.Cell>
                <Table.Cell align="right">
                    {formatCurrency(getHopperPrice(hopper.tokenId), Currency.AVAX)}
                </Table.Cell>
            </Table.Row>
        )
    }

    return (
        <Table.Root>
            <thead>
                <Table.Row>
                    <Table.HeaderCell css={{ width: 90 }}>Image</Table.HeaderCell>
                    <Table.HeaderCell css={{ width: 120 }}>Token-ID</Table.HeaderCell>
                    <Table.HeaderCell css={{ width: 100 }}>Level</Table.HeaderCell>
                    <Table.HeaderCell>In Adventure</Table.HeaderCell>
                    <Table.HeaderCell>Best Adventure</Table.HeaderCell>
                    <Table.HeaderCell align="right">Level costs</Table.HeaderCell>
                    <Table.HeaderCell align="right">Bought for</Table.HeaderCell>
                </Table.Row>
            </thead>

            <tbody>
                {hoppers.map(renderRow)}

                <Table.Row>
                    <Table.SummaryCell />
                    <Table.SummaryCell />
                    <Table.SummaryCell />
                    <Table.SummaryCell>{summaryAdventure}</Table.SummaryCell>
                    <Table.SummaryCell />
                    <Table.SummaryCell align="right">{summaryLevelCosts}</Table.SummaryCell>
                    <Table.SummaryCell align="right">{summaryBuyPrices}</Table.SummaryCell>
                </Table.Row>
            </tbody>
        </Table.Root>
    )
}

// Components
const Center = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})
const Image = styled("img", {
    display: "block",
    size: 50,
    borderRadius: "$sm",
})
