import HopperDetailsHoverCard from "components/hoppers/hopper-details-hover-card/HopperDetailsHoverCard"
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
import { getHopperMarketUrl } from "utils/url"
import {
    HoppersTableColumn,
    HoppersTableConfig,
} from "../hoppers-table-configuration/HoppersTableConfiguration"
import {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "../hoppers-table-filter/HoppersTableFilter"

type HopperRowProps = {
    hopper: Hopper
    index: number
    filter: HoppersTableAnyFilter
    config: HoppersTableConfig
}

export default function HopperRow(props: HopperRowProps) {
    const { hopper, index, filter, config } = props

    return (
        <>
            {config.columns.includes(HoppersTableColumn.IMAGE) && (
                <Cell>
                    <HopperDetailsHoverCard hopper={hopper} side="left">
                        <a href={getHopperMarketUrl({ hopper: hopper.tokenId })} target="_blank">
                            <Center>
                                <Image src={hopper.image} />
                            </Center>
                        </a>
                    </HopperDetailsHoverCard>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.HOPPER_ID) && (
                <Cell align="center">{hopper.tokenId}</Cell>
            )}
            {config.columns.includes(HoppersTableColumn.LEVEL) && (
                <Cell align="center">{hopper.level}</Cell>
            )}
            {config.columns.includes(HoppersTableColumn.STRENGTH) && (
                <Cell align="center">
                    <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.strength) }}>
                        {hopper.strength}
                    </Value>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.AGILITY) && (
                <Cell align="center">
                    <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.agility) }}>
                        {hopper.agility}
                    </Value>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.VITALITY) && (
                <Cell align="center">
                    <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.vitality) }}>
                        {hopper.vitality}
                    </Value>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.INTELLIGENCE) && (
                <Cell align="center">
                    <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.intelligence) }}>
                        {hopper.intelligence}
                    </Value>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.FERTILITY) && (
                <Cell align="center">
                    <Value style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.fertility) }}>
                        {hopper.fertility}
                    </Value>
                </Cell>
            )}
            {config.columns.includes(HoppersTableColumn.RATING) &&
                filter.type === HoppersTableConfigFilters.PERMIT &&
                filter.permit && (
                    <StyledRatingCell align="center" striped={index % 2 === 1}>
                        {formatRating(getRatingByAdventure(filter.permit, hopper))}
                    </StyledRatingCell>
                )}
            {config.columns.includes(HoppersTableColumn.PRICE) && (
                <Cell align="right">{formatCurrency(hopper.listing.price, Currency.AVAX)}</Cell>
            )}
            {config.columns.includes(HoppersTableColumn.LEVEL_COSTS) && (
                <Cell align="right">{formatCurrency(hopper.levelCosts, Currency.AVAX)}</Cell>
            )}
            {config.columns.includes(HoppersTableColumn.MAX_PRICE) && (
                <>
                    {filter.type === HoppersTableConfigFilters.PERMIT && filter.permit && (
                        <Cell align="right">
                            {formatCurrency(
                                calculateMaxRatingPrice(filter.permit, hopper),
                                Currency.AVAX,
                            )}
                        </Cell>
                    )}

                    {filter.type === HoppersTableConfigFilters.FERTILITY && (
                        <Cell align="right">
                            {formatCurrency(
                                calculateMaxFertilityRatingPrice(hopper),
                                Currency.AVAX,
                            )}
                        </Cell>
                    )}
                </>
            )}
            {config.columns.includes(HoppersTableColumn.BASE_FLY) &&
                filter.type === HoppersTableConfigFilters.PERMIT &&
                filter.permit && (
                    <Cell align="right">
                        {formatCurrency(getBaseFlyByAdventure(filter.permit, hopper), Currency.FLY)}
                    </Cell>
                )}

            {config.columns.includes(HoppersTableColumn.FERTILITY_50) &&
                filter.type === HoppersTableConfigFilters.FERTILITY && (
                    <Cell align="right">
                        {formatCurrency(
                            calculateLevelUpCosts(
                                hopper.level,
                                calculateHopperLevelAtTadpoleChange(0.5, hopper),
                            ),
                            Currency.FLY,
                        )}
                    </Cell>
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
