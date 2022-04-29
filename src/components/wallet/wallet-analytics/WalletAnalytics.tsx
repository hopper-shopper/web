import { WalletAddress } from "models/User"
import { Screens, styled } from "theme"
import ClaimedChartCard from "../claimed-chart-card/ClaimedChartCard"

type WalletAnalyticsProps = {
    wallet: WalletAddress
}

export default function WalletAnalytics(props: WalletAnalyticsProps) {
    const { wallet } = props

    return (
        <Container>
            <ClaimedChartCard wallet={wallet} />
        </Container>
    )
}

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: Screens.xl,
    margin: "3rem auto",
})
