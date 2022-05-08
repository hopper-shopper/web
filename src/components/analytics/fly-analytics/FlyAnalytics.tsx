import { Screens, styled } from "theme"
import FlySupplyChartCard from "./fly-supply-chart-card/FlySupplyChartCard"

export default function FlyAnalytics() {
    return (
        <Container>
            <FlySupplyChartCard />
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
