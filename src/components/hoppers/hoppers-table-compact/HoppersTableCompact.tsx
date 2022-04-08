import useHoppersListings from "api/hooks/useHoppersListings"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { Hopper } from "models/Hopper"
import { sortListings, SortListingBy } from "sorters/listings"
import { SortDirection } from "sorters/_common"
import { styled } from "theme"
import { Adventure, hopperAdventureToAdventure } from "utils/adventures"

type HoppersTableCompactProps = {
    hoppers: Hopper[]
}

export default function HoppersTableCompact(props: HoppersTableCompactProps) {
    const { hoppers } = props

    const { listings: hopperListings } = useHoppersListings(hoppers.map(hopper => hopper.tokenId))

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
            <TableRow key={hopper.tokenId} even={index % 2 === 0}>
                <TableCell>
                    <Center>
                        <Image src={hopper.image} />
                    </Center>
                </TableCell>
                <TableCell>{hopper.tokenId}</TableCell>
                <TableCell>{hopper.level}</TableCell>
                <TableCell>{formatAdventure(hopperAdventure)}</TableCell>
                <TableCell
                    css={{ color: hopperAdventure === bestAdventure ? "$teal11" : "$red11" }}>
                    {formatAdventure(bestAdventure)}
                </TableCell>
                <TableCell align="right">
                    {formatCurrency(hopper.levelCosts, Currency.AVAX)}
                </TableCell>
                <TableCell align="right">
                    {formatCurrency(getHopperPrice(hopper.tokenId), Currency.AVAX)}
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeaderCell css={{ width: 90 }}>Image</TableHeaderCell>
                    <TableHeaderCell css={{ width: 120 }}>Token-ID</TableHeaderCell>
                    <TableHeaderCell css={{ width: 100 }}>Level</TableHeaderCell>
                    <TableHeaderCell>Adventure</TableHeaderCell>
                    <TableHeaderCell>Best Adventure</TableHeaderCell>
                    <TableHeaderCell align="right">Level costs</TableHeaderCell>
                    <TableHeaderCell align="right">Bought for</TableHeaderCell>
                </TableRow>
            </thead>

            <tbody>
                {hoppers.map(renderRow)}

                <TableRow
                    css={{
                        backgroundColor: "$gray3",
                        fontWeight: 500,
                    }}>
                    <TableCell css={{ borderTop: "1px solid $gray6" }} />
                    <TableCell css={{ borderTop: "1px solid $gray6" }} />
                    <TableCell css={{ borderTop: "1px solid $gray6" }} />
                    <TableCell css={{ borderTop: "1px solid $gray6" }}>
                        {summaryAdventure}
                    </TableCell>
                    <TableCell css={{ borderTop: "1px solid $gray6" }} />
                    <TableCell align="right" css={{ borderTop: "1px solid $gray6" }}>
                        {summaryLevelCosts}
                    </TableCell>
                    <TableCell align="right" css={{ borderTop: "1px solid $gray6" }}>
                        {summaryBuyPrices}
                    </TableCell>
                </TableRow>
            </tbody>
        </Table>
    )
}

// Components
const Table = styled("table", {
    width: "100%",
    borderSpacing: 0,
    color: "$gray12",
    tableLayout: "fixed",
    "& thead tr th:first-child": {
        borderTopLeftRadius: "0.5rem",
        borderLeft: "1px solid $gray6",
    },
    "& thead tr th:last-child": {
        borderTopRightRadius: "0.5rem",
        borderRight: "1px solid $gray6",
    },
    "& thead tr th": {
        borderTop: "1px solid $gray6",
        borderBottom: "1px solid $gray6",
    },
    "& tbody tr td:first-child": {
        borderLeft: "1px solid $gray6",
    },
    "& tbody tr td:last-child": {
        borderRight: "1px solid $gray6",
    },
    "& tbody tr:last-child td": {
        borderBottom: "1px solid $gray6",
        "&:first-child": {
            borderBottomLeftRadius: "$md",
        },
        "&:last-child": {
            borderBottomRightRadius: "$md",
        },
    },
})
const TableRow = styled("tr", {
    variants: {
        even: {
            true: {
                backgroundColor: "$gray2",
            },
            false: {
                backgroundColor: "$gray1",
            },
        },
    },
})
const TableHeaderCell = styled("th", {
    color: "$gray11",
    fontWeight: 500,
    backgroundColor: "$gray3",
    padding: "0.5rem 1rem",
    cursor: "default",
})
const TableCell = styled("td", {
    color: "$gray12",
    padding: "0.5rem 1rem",
    whiteSpace: "nowrap",
    variants: {
        align: {
            left: {
                textAlign: "left",
            },
            center: {
                textAlign: "center",
            },
            right: {
                textAlign: "right",
            },
        },
    },
    defaultVariants: {
        align: "center",
    },
})

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
