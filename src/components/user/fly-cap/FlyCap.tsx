import useUserCap from "api/hooks/useUserCap"
import * as Progress from "components/progress/Progress"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { WalletAddress } from "models/User"
import { styled } from "theme"
import { Adventure } from "utils/adventures"

type FlyCapProps = {
    user: WalletAddress
    adventure: Adventure
}

export default function FlyCap(props: FlyCapProps) {
    const { user, adventure } = props

    const { userCap } = useUserCap({
        user,
        adventure,
    })

    const userCapPercent = userCap.cap === 0 ? 0 : (userCap.current / userCap.cap) * 100

    return (
        <StyledCap>
            <AdventureTitle>
                {formatAdventure(adventure)}

                <FlyCapSummary>
                    {formatCurrency(userCap.current, Currency.FLY)} /{" "}
                    {formatCurrency(userCap.cap, Currency.FLY)}
                </FlyCapSummary>
            </AdventureTitle>
            <Progress.Root>
                <Progress.Indicator
                    style={{ width: `${userCapPercent}%` }}
                    severity={userCapPercent > 95 ? "danger" : "normal"}
                />
            </Progress.Root>
        </StyledCap>
    )
}

const StyledCap = styled("div", {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    columnGap: "2rem",
    alignItems: "center",
})
const AdventureTitle = styled("h3", {
    color: "$gray12",
    fontSize: "1rem",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
})
const FlyCapSummary = styled("span", {
    marginLeft: "auto",
    whiteSpace: "nowrap",
    fontSize: "0.75rem",
    color: "$gray11",
    textAlign: "right",
})
