import { Screens, styled } from "theme"
import HopperActivitiesHistoryChartCard from "./hopper-activities-history-chart-card/HopperActivitiesHistoryChartCard"

export default function HopperAnalytics() {
    return (
        <Container>
            <HopperActivitiesHistoryChartCard />
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
