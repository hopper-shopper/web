import { ParentSizeModern } from "@visx/responsive"
import useHoppersActivity from "api/hooks/useHoppersActivity"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import useScreenSize from "hooks/useScreenSize"
import HopperActivityChart from "./hopper-activity-chart/HopperActivityChart"

export default function HopperActivityChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { activity, loading } = useHoppersActivity()

    const chartHeight = ((): number => {
        if (isLaptopUp) {
            return 600
        } else if (isTabletUp) {
            return 500
        }
        return 400
    })()

    return (
        <ChartContainer.Root>
            <ChartContainer.Header>
                <ChartContainer.Title>Hoppers activity</ChartContainer.Title>
            </ChartContainer.Header>

            <ChartContainer.Content css={{ height: chartHeight }}>
                <ParentSizeModern>
                    {({ height }) => (
                        <>
                            {!loading && (
                                <HopperActivityChart
                                    width={height}
                                    height={height}
                                    activity={activity}
                                />
                            )}
                        </>
                    )}
                </ParentSizeModern>
            </ChartContainer.Content>
        </ChartContainer.Root>
    )
}
