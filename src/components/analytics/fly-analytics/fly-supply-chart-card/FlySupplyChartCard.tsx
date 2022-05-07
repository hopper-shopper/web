import { ParentSizeModern } from "@visx/responsive"
import useFlySupply from "api/hooks/useFlySupply"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import useScreenSize from "hooks/useScreenSize"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import FlySupplyChart, { FlySupplyFeature } from "./fly-supply-chart/FlySupplyChart"
import useFlySupplyChartData from "./fly-supply-chart/useFlySupplyChartData"

export default function FlySupplyChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { supplies, loading } = useFlySupply()

    const { state: features, toggle: toggleFeature } = useUniqueToggleList<FlySupplyFeature>([
        FlySupplyFeature.TOTAL_SUPPLY,
        FlySupplyFeature.BURNED,
        FlySupplyFeature.STAKED,
        FlySupplyFeature.AVAILABLE,
        FlySupplyFeature.FREE,
    ])
    const chartData = useFlySupplyChartData(supplies)

    const chartHeight = ((): number => {
        if (isLaptopUp) {
            return 600
        } else if (isTabletUp) {
            return 500
        }
        return 300
    })()

    return (
        <ChartContainer.Root>
            <ChartContainer.Header>
                <ChartContainer.Title>FLY supply history</ChartContainer.Title>
            </ChartContainer.Header>

            <ChartContainer.Content css={{ height: chartHeight }}>
                <ParentSizeModern>
                    {({ width, height }) => (
                        <>
                            {!loading && (
                                <FlySupplyChart
                                    width={width}
                                    height={height}
                                    features={features}
                                    data={chartData}
                                />
                            )}
                        </>
                    )}
                </ParentSizeModern>
            </ChartContainer.Content>
        </ChartContainer.Root>
    )
}
