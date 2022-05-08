import { ParentSizeModern } from "@visx/responsive"
import useFlySupply from "api/hooks/useFlySupply"
import Fieldset from "components/inputs/fieldset/Fieldset"
import Label from "components/inputs/label/Label"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import * as Tag from "components/tag/Tag"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import { useState } from "react"
import { styled } from "theme"
import FlySupplyChart, { FlySupplyMarkers } from "./fly-supply-chart/FlySupplyChart"
import {
    FlySupplyFeature,
    formatFlyChartFeatureLong,
    SUPPLY_CHARTS_COLORS_DARK,
    SUPPLY_CHARTS_COLORS_LIGHT,
} from "./fly-supply-chart/flySupplyChart.utils"
import useFlySupplyChartData from "./fly-supply-chart/useFlySupplyChartData"
import Checkbox from "components/inputs/checkbox/Checkbox"
import useStateUpdate from "hooks/useStateUpdate"
import Flex from "components/layout/flex/Flex"

export default function FlySupplyChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { supplies, loading } = useFlySupply()

    const { state: features, toggle: toggleFeature } = useUniqueToggleList<FlySupplyFeature>([
        FlySupplyFeature.TOTAL_SUPPLY,
        FlySupplyFeature.BURNED,
        FlySupplyFeature.STAKED,
    ])
    const [chartMarkers, setChartMarkers] = useState<FlySupplyMarkers>({
        mint: false,
        resume: false,
    })
    const updateChartMarkers = useStateUpdate(setChartMarkers)

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

                    <Markers>
                        <Flex gap="sm">
                            <Label htmlFor="mint-date">Mint</Label>
                            <Checkbox
                                id="mint-date"
                                checked={chartMarkers.mint}
                                onCheckedChange={checked => updateChartMarkers({ mint: !!checked })}
                            />
                        </Flex>

                        <Flex gap="sm">
                            <Label htmlFor="resume-date">Resume</Label>
                            <Checkbox
                                id="resume-date"
                                checked={chartMarkers.resume}
                                onCheckedChange={checked =>
                                    updateChartMarkers({ resume: !!checked })
                                }
                            />
                        </Flex>
                    </Markers>
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
                                    markers={chartMarkers}
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
    "@lg": {
        flexDirection: "row",
        justifyContent: "space-between",
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
const Markers = styled("div", {
    display: "flex",
    justifyContent: "space-end",
    alignItems: "center",
    columnGap: "1rem",
})
