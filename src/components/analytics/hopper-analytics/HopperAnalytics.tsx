import { Screens, styled } from "theme"
import HopperActivityChartCard from "./hopper-activity-chart-card/HopperActivityChartCard"

export default function HopperAnalytics() {
    return (
        <Container>
            <HopperActivityChartCard />
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
