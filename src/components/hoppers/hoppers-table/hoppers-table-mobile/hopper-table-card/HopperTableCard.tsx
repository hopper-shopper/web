import {
    HoppersTableAnyFilter,
    HoppersTableConfigFilters,
} from "components/hoppers/hoppers-table/hoppers-table-filter/HoppersTableFilter"
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

type HopperTableCardProps = {
    hopper: Hopper
    filter: HoppersTableAnyFilter
}

export default function HopperTableCard(props: HopperTableCardProps) {
    const { hopper, filter } = props

    return (
        <StyledCard>
            <Header>
                <Image src={hopper.image} />
                <StatsList>
                    <Stat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.strength) }}>
                        {hopper.strength}
                    </Stat>
                    <Stat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.agility) }}>
                        {hopper.agility}
                    </Stat>
                    <Stat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.vitality) }}>
                        {hopper.vitality}
                    </Stat>
                    <Stat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.intelligence) }}>
                        {hopper.intelligence}
                    </Stat>
                    <Stat style={{ backgroundColor: HOPPER_STATS_SCALE(hopper.fertility) }}>
                        {hopper.fertility}
                    </Stat>
                </StatsList>
            </Header>

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
                    <span>{formatCurrency(hopper.listing.price, Currency.AVAX)}</span>
                </Info>
                <Info striped>
                    <span>Level costs</span>
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
                    <Info>
                        <span>Base FLY / level</span>
                        <span>
                            {formatCurrency(
                                getBaseFlyByAdventure(filter.permit, hopper),
                                Currency.FLY,
                            )}
                        </span>
                    </Info>
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
                        <span>Cost 50 % chance</span>
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
    marginBottom: "1rem",
})
const Image = styled("img", {
    size: 70,
    borderRadius: "$sm",
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
