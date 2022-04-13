import useUserEarnings from "api/hooks/useUserEarnings"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { WalletAddress } from "models/User"
import { styled } from "theme"
import { Adventure } from "utils/adventures"

type UserEarningsProps = {
    user: WalletAddress
    adventure: Adventure
}

export default function UserEarnings(props: UserEarningsProps) {
    const { user, adventure } = props

    const { earnings } = useUserEarnings({
        user,
        adventure,
    })

    return (
        <EarningsCard>
            <EarningsTitle>{formatAdventure(adventure)}</EarningsTitle>

            <EarningsContent>
                <EarningsValue>
                    <span>Base</span>
                    <span>{formatCurrency(earnings.base, Currency.FLY)}</span>
                </EarningsValue>
                <EarningsValue>
                    <span>Boost (veFly)</span>
                    <span>{formatCurrency(earnings.boost, Currency.FLY)}</span>
                </EarningsValue>
                <EarningsValue>
                    <span> = Total</span>
                    <span>{formatCurrency(earnings.base + earnings.boost, Currency.FLY)}</span>
                </EarningsValue>
            </EarningsContent>
        </EarningsCard>
    )
}

const EarningsCard = styled("div", {
    backgroundColor: "$gray2",
    borderRadius: "$md",
    border: "1px solid $gray6",
    padding: "1rem",
})
const EarningsTitle = styled("h3", {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    marginBottom: "0.5rem",
    color: "$gray11",
})
const EarningsContent = styled("div", {
    display: "grid",
    rowGap: "0.5rem",
})
const EarningsValue = styled("p", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    color: "$gray12",
    fontSize: "1rem",
})
