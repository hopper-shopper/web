import { useHopperContext } from "contexts/HopperContext"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { styled } from "theme"
import { Adventure, getEarningsByAdventure, getIdealAdventure } from "utils/adventures"
import * as Feature from "../HopperCardFeature"

export default function FlyEarnings() {
    const { hopper } = useHopperContext()

    const idealAdventure = getIdealAdventure(hopper)

    return (
        <Feature.Root>
            <Feature.Title>FLY Earnings / Day</Feature.Title>
            <EarningsItem highest={Adventure.POND === idealAdventure}>
                <span>{formatAdventure(Adventure.POND)}</span>
                <span>
                    {formatCurrency(getEarningsByAdventure(Adventure.POND, hopper), Currency.FLY)}
                </span>
            </EarningsItem>
            <EarningsItem highest={Adventure.STREAM === idealAdventure}>
                <span>{formatAdventure(Adventure.STREAM)}</span>
                <span>
                    {formatCurrency(getEarningsByAdventure(Adventure.STREAM, hopper), Currency.FLY)}
                </span>
            </EarningsItem>
            <EarningsItem highest={Adventure.SWAMP === idealAdventure}>
                <span>{formatAdventure(Adventure.SWAMP)}</span>
                <span>
                    {formatCurrency(getEarningsByAdventure(Adventure.SWAMP, hopper), Currency.FLY)}
                </span>
            </EarningsItem>
            <EarningsItem highest={Adventure.RIVER === idealAdventure}>
                <span>{formatAdventure(Adventure.RIVER)}</span>
                <span>
                    {formatCurrency(getEarningsByAdventure(Adventure.RIVER, hopper), Currency.FLY)}
                </span>
            </EarningsItem>
            <EarningsItem highest={Adventure.FOREST === idealAdventure}>
                <span>{formatAdventure(Adventure.FOREST)}</span>
                <span>
                    {formatCurrency(getEarningsByAdventure(Adventure.FOREST, hopper), Currency.FLY)}
                </span>
            </EarningsItem>
            <EarningsItem highest={Adventure.GREAT_LAKE === idealAdventure}>
                <span>{formatAdventure(Adventure.GREAT_LAKE)}</span>
                <span>
                    {formatCurrency(
                        getEarningsByAdventure(Adventure.GREAT_LAKE, hopper),
                        Currency.FLY,
                    )}
                </span>
            </EarningsItem>
        </Feature.Root>
    )
}

const EarningsItem = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    borderRadius: "$sm",
    color: "$gray12",
    fontSize: "0.75rem",
    variants: {
        highest: {
            true: {
                color: "$teal11",
                fontWeight: 500,
            },
        },
    },
})
