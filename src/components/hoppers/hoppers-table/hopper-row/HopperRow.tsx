import { IconStar } from "@tabler/icons"
import HopperDetailsDialog from "components/hoppers/hopper-details-dialog/HopperDetailsDialog"
import IconButton from "components/inputs/buttons/icon-button/IconButton"
import { Cell } from "components/table/Table"
import WatchlistButton from "components/watchlist/watchlist-button/WatchlistButton"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import { Hopper } from "models/Hopper"
import { styled } from "theme"
import {
    calculateMaxRatingPrice,
    getBaseFlyByAdventure,
    getRatingByAdventure,
} from "utils/adventures"
import {
    calculateHopperLevelAtTadpoleChange,
    calculateMaxFertilityRatingPrice,
} from "utils/fertility"
import { HOPPER_STATS_SCALE } from "utils/hopper"
import { calculateLevelUpCosts } from "utils/level"
import {
    HoppersTableConfigFilters,
    HoppersTableConfiguration,
} from "../configure-hoppers-table/ConfigureHoppersTable"

type HopperRowProps = {
    hopper: Hopper
    index: number
    config: HoppersTableConfiguration
}

export default function HopperRow(props: HopperRowProps) {
    const { hopper, index, config } = props

    return (
        <>
            <Cell>
                <HopperDetailsDialog hopper={hopper}>
                    <Center>
                        <Image src={hopper.image} />
                    </Center>
                </HopperDetailsDialog>
            </Cell>
            <Cell align="center">{hopper.tokenId}</Cell>
            <Cell align="center">{hopper.level}</Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.strength) }}>
                    {hopper.strength}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.agility) }}>
                    {hopper.agility}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.vitality) }}>
                    {hopper.vitality}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.intelligence) }}>
                    {hopper.intelligence}
                </Value>
            </Cell>
            <Cell align="center">
                <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.fertility) }}>
                    {hopper.fertility}
                </Value>
            </Cell>
            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <StyledRatingCell align="center" striped={index % 2 === 0}>
                    {formatRating(getRatingByAdventure(config.permit, hopper))}
                </StyledRatingCell>
            )}
            <Cell align="right">{formatCurrency(hopper.listing.price, Currency.AVAX)}</Cell>
            <Cell align="right">{formatCurrency(hopper.levelCosts, Currency.AVAX)}</Cell>
            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <Cell align="right">
                    {formatCurrency(calculateMaxRatingPrice(config.permit, hopper), Currency.AVAX)}
                </Cell>
            )}

            {config.type === HoppersTableConfigFilters.PERMIT && config.permit && (
                <Cell align="right">
                    {formatCurrency(getBaseFlyByAdventure(config.permit, hopper), Currency.FLY)}
                </Cell>
            )}

            {config.type === HoppersTableConfigFilters.FERTILITY && (
                <>
                    <Cell align="right">
                        {formatCurrency(calculateMaxFertilityRatingPrice(hopper), Currency.AVAX)}
                    </Cell>
                    <Cell align="right">
                        {formatCurrency(
                            calculateLevelUpCosts(
                                hopper.level,
                                calculateHopperLevelAtTadpoleChange(0.5, hopper),
                            ),
                            Currency.FLY,
                        )}
                    </Cell>
                </>
            )}
            <Cell align="right">
                <WatchlistButton hopperId={hopper.tokenId} />
            </Cell>
        </>
    )
}

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
const Value = styled("div", {
    display: "inline-flex",
    width: 100,
    borderRadius: "$md",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.5rem",
})

const StyledRatingCell = styled(Cell, {
    color: "$blue12",
    variants: {
        striped: {
            true: {
                backgroundColor: "$blue2",
            },
            false: {
                backgroundColor: "$blue1",
            },
        },
    },
})
