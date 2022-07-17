import { getTransfersTypesFilter } from "filters/transfers"
import { Transfer } from "models/Transfer"
import { useMemo } from "react"
import { styled } from "theme"
import { calculateTransfersProfit } from "utils/transfer"
import BreakdownCard from "./breakdown-card/BreakdownCard"

type TransfersBreakdownProps = {
    transfers: Transfer[]
}

export default function TransfersBreakdown(props: TransfersBreakdownProps) {
    const { transfers } = props

    const claimed = useMemo(() => {
        return calculateTransfersProfit(getTransfersTypesFilter("claim")(transfers))
    }, [transfers])
    const burned = useMemo(() => {
        return calculateTransfersProfit(
            getTransfersTypesFilter(
                "level-up",
                "breeding",
                "change-name",
                "multi-level-up",
            )(transfers),
        )
    }, [transfers])

    return (
        <StyledList>
            <BreakdownCard title="🐸 Claimed" value={claimed} />
            <BreakdownCard title="🔥 Burned" value={burned} />
            <BreakdownCard title="💰 Profit" value={claimed - Math.abs(burned)} />
        </StyledList>
    )
}

const StyledList = styled("div", {
    display: "grid",
    gap: "1rem",
    "@md": {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@lg": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
})
