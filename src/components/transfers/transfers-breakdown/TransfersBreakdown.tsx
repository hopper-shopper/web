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
        return calculateTransfersProfit(getTransfersTypesFilter("levelup", "breeding")(transfers))
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
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "1rem",
})
