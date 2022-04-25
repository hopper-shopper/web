import useUserCap from "api/hooks/useUserCap"
import Flex from "components/layout/flex/Flex"
import * as Progress from "components/progress/Progress"
import { addSeconds } from "date-fns"
import { formatAdventure } from "formatters/adventure"
import { Currency, formatCurrency } from "formatters/currency"
import { formatDateTime } from "formatters/date"
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
    const userCapTime = userCap.time > 0 ? addSeconds(new Date(), userCap.time) : null

    return (
        <StyledCap>
            <AdventureTitle>
                {formatAdventure(adventure)}

                <Flex direction="column" gap="none" y="end" css={{ marginLeft: "auto" }}>
                    <FlyCapSummary>
                        {formatCurrency(userCap.current, Currency.FLY)} /{" "}
                        {formatCurrency(userCap.cap, Currency.FLY)}
                    </FlyCapSummary>

                    {userCapTime !== null && (
                        <FlyCapSummary>~ {formatDateTime(userCapTime)}</FlyCapSummary>
                    )}
                </Flex>
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
    rowGap: "0.5rem",
    "@md": {
        gridTemplateColumns: "300px 1fr",
        alignItems: "center",
        columnGap: "2rem",
    },
})
const AdventureTitle = styled("h3", {
    color: "$gray12",
    fontSize: "1rem",
    fontWeight: 400,
    display: "flex",
    alignItems: "center",
})
const FlyCapSummary = styled("span", {
    whiteSpace: "nowrap",
    fontSize: "0.75rem",
    color: "$gray11",
    textAlign: "right",
})
