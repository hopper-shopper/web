import { ParentSizeModern } from "@visx/responsive"
import useFlySupply from "api/hooks/useFlySupply"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import * as Tag from "components/tag/Tag"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import { styled } from "theme"
import FlySupplyChart from "./fly-supply-chart/FlySupplyChart"
import {
    FlySupplyFeature,
    formatFlyChartFeatureLong,
    SUPPLY_CHARTS_COLORS_DARK,
    SUPPLY_CHARTS_COLORS_LIGHT,
} from "./fly-supply-chart/flySupplyChart.utils"
import useFlySupplyChartData from "./fly-supply-chart/useFlySupplyChartData"

export default function FlySupplyChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { supplies, loading } = useFlySupply()

    const { state: features, toggle: toggleFeature } = useUniqueToggleList<FlySupplyFeature>([
        FlySupplyFeature.TOTAL_SUPPLY,
        FlySupplyFeature.BURNED,
        FlySupplyFeature.STAKED,
    ])
    const chartData = useFlySupplyChartData(supplies)

    const tagColors = useThemeValue(SUPPLY_CHARTS_COLORS_LIGHT, SUPPLY_CHARTS_COLORS_DARK)

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
                <ChartContainer.Title>FLY supply</ChartContainer.Title>

                <Actions>
                    <TagsList>
                        {ALL_FEATURES.map(feature => (
                            <Tag.Root
                                key={feature}
                                disabled={!features.has(feature)}
                                onClick={() => toggleFeature(feature)}>
                                <Tag.Marker css={{ backgroundColor: tagColors[feature] }} />
                                <Tag.Text>{formatFlyChartFeatureLong(feature)}</Tag.Text>
                            </Tag.Root>
                        ))}
                    </TagsList>
                </Actions>
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

// Constants
const ALL_FEATURES: FlySupplyFeature[] = [
    FlySupplyFeature.TOTAL_SUPPLY,
    FlySupplyFeature.BURNED,
    FlySupplyFeature.STAKED,
    FlySupplyFeature.AVAILABLE,
    FlySupplyFeature.FREE,
]

// Components
const Actions = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    marginTop: "1rem",
    "@md": {
        flexDirection: "row",
        // justifyContent: "flex-end",
        alignItems: "center",
    },
})
const TagsList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
    "@md": {
        display: "flex",
    },
})
