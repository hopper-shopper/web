import EmptyText from "components/typography/empty-text/EmptyText"
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

            <FutureText>
                More to come
                <br />
                <br />
                You have an chart idea or a feature request in general?
                <br />
                Write me on Discord @ steschwa#3314 or{" "}
                <StyledLink href="https://twitter.com/0x_steschwa" target="_blank">
                    Twitter
                </StyledLink>
            </FutureText>
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
const FutureText = styled("p", {
    color: "$gray11",
    textAlign: "center",
    lineHeight: 1.5,
})
const StyledLink = styled("a", {
    textDecoration: "none",
    color: "$blue11",
    fontSize: "1rem",
})
