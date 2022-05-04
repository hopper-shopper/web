import {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "components/hoppers/hoppers-table/hoppers-table-filter/HoppersTableFilter"
import InspectPageLink from "components/inspect/inspect-page-link/InspectPageLink"
import Flex from "components/layout/flex/Flex"
import WatchlistButton from "components/watchlist/watchlist-button/WatchlistButton"
import { Currency, formatCurrency } from "formatters/currency"
import { formatRating } from "formatters/rating"
import useThemeValue from "hooks/useThemeValue"
import { useAtomValue } from "jotai"
import { Hopper } from "models/Hopper"
import { watchlistAtom } from "stores/watchlist"
import { styled } from "theme"
import {
    calculateMaxRatingPrice,
    getBaseFlyByAdventure,
    getEarningsByAdventure,
    getRatingByAdventure,
} from "utils/adventures"
import {
    calculateHopperLevelAtTadpoleChange,
    calculateMaxFertilityRatingPrice,
} from "utils/fertility"
import { HOPPER_STATS_SCALE_DARK, HOPPER_STATS_SCALE_LIGHT } from "utils/hopper"
import { calculateLevelUpCosts } from "utils/level"
import { getHopperMarketUrl } from "utils/url"

type HopperTableCardProps = {
    hopper: Hopper
    filter: HoppersTableAnyFilter
}

export default function HopperTableCard(props: HopperTableCardProps) {
    const { hopper, filter } = props

    const watchlist = useAtomValue(watchlistAtom)
    const colorScale = useThemeValue(HOPPER_STATS_SCALE_LIGHT, HOPPER_STATS_SCALE_DARK)

    return (
        <StyledCard>
            <Header>
                <a href={getHopperMarketUrl({ hopper: hopper.tokenId })} target="_blank">
                    <Image src={hopper.image} />
                </a>
                <StatsList>
                    <Stat style={{ backgroundColor: colorScale(hopper.strength) }}>
                        {hopper.strength}
                    </Stat>
                    <Stat style={{ backgroundColor: colorScale(hopper.agility) }}>
                        {hopper.agility}
                    </Stat>
                    <Stat style={{ backgroundColor: colorScale(hopper.vitality) }}>
                        {hopper.vitality}
                    </Stat>
                    <Stat style={{ backgroundColor: colorScale(hopper.intelligence) }}>
                        {hopper.intelligence}
                    </Stat>
                    <Stat style={{ backgroundColor: colorScale(hopper.fertility) }}>
                        {hopper.fertility}
                    </Stat>
                </StatsList>
            </Header>

            <Actions>
                <InspectPageLink hopperId={hopper.tokenId} />
                <Flex gap="sm">
                    <WatchlistText>
                        {watchlist.includes(hopper.tokenId) ? "Remove from" : "Add to"} watchlist
                    </WatchlistText>
                    <WatchlistButton hopperId={hopper.tokenId} />
                </Flex>
            </Actions>

            <List>
                <Info>
                    <span>Hopper-ID</span>
                    <span>{hopper.tokenId}</span>
                </Info>
                <Info striped>
                    <span>Level</span>
                    <span>{hopper.level}</span>
                </Info>
                <Info>
                    <span>Price</span>
                    <span>{formatCurrency(hopper.price, Currency.AVAX)}</span>
                </Info>
                <Info striped>
                    <span>Level Costs</span>
                    <span>{formatCurrency(hopper.levelCosts, Currency.AVAX)}</span>
                </Info>
                {filter.type === HoppersTableConfigFilters.PERMIT && (
                    <Info>
                        <span>Rating</span>
                        <span>{formatRating(getRatingByAdventure(filter.permit, hopper))}</span>
                    </Info>
                )}
                {filter.type === HoppersTableConfigFilters.PERMIT && (
                    <Info striped>
                        <span>Max. Price</span>
                        <span>
                            {formatCurrency(
                                calculateMaxRatingPrice(filter.permit, hopper),
                                Currency.AVAX,
                            )}
                        </span>
                    </Info>
                )}
                {filter.type === HoppersTableConfigFilters.PERMIT && (
                    <>
                        <Info>
                            <span>Base FLY / level</span>
                            <span>
                                {formatCurrency(
                                    getBaseFlyByAdventure(filter.permit, hopper),
                                    Currency.FLY,
                                )}
                            </span>
                        </Info>
                        <Info>
                            <span>Base FLY</span>
                            <span>
                                {formatCurrency(
                                    getEarningsByAdventure(filter.permit, hopper),
                                    Currency.FLY,
                                )}
                            </span>
                        </Info>
                    </>
                )}

                {filter.type === HoppersTableConfigFilters.FERTILITY && (
                    <Info>
                        <span>Max. Price Fertility</span>
                        <span>
                            {formatCurrency(
                                calculateMaxFertilityRatingPrice(hopper),
                                Currency.AVAX,
                            )}
                        </span>
                    </Info>
                )}
                {filter.type === HoppersTableConfigFilters.FERTILITY && (
                    <Info striped>
                        <span>Cost 50 % Chance</span>
                        <span>
                            {formatCurrency(
                                calculateLevelUpCosts(
                                    hopper.level,
                                    calculateHopperLevelAtTadpoleChange(0.5, hopper),
                                ),
                                Currency.FLY,
                            )}
                        </span>
                    </Info>
                )}
            </List>
        </StyledCard>
    )
}

// Components
const StyledCard = styled("div", {
    backgroundColor: "$gray2",
    padding: "1rem",
    borderRadius: "$md",
    border: "1px solid $gray6",
})
const Header = styled("div", {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    alignItems: "center",
    columnGap: "2rem",
})
const Image = styled("img", {
    size: 70,
    borderRadius: "$sm",
})
const Actions = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0",
})
const WatchlistText = styled("span", {
    fontSize: "0.75rem",
    color: "$gray11",
})
const StatsList = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    columnGap: "0.25rem",
})
const Stat = styled("div", {
    display: "inline-flex",
    size: 30,
    borderRadius: "$md",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem",
    color: "$gray12",
    fontSize: "1rem",
})
const List = styled("div", {
    display: "flex",
    flexDirection: "column",
    columnGap: "0.5rem",
})
const Info = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    margin: "0 -0.5rem",
    borderRadius: "$sm",
    "& *:first-child": {
        color: "$gray11",
        fontSize: "0.875rem",
    },
    "& *:last-child": {
        color: "$gray12",
        fontSize: "1rem",
    },
    variants: {
        striped: {
            true: {
                backgroundColor: "$gray3",
            },
        },
    },
})
