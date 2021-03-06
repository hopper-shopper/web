import { ParentSizeModern } from "@visx/responsive"
import useFlySupply from "api/hooks/useFlySupply"
import Checkbox from "components/inputs/checkbox/Checkbox"
import Label from "components/inputs/label/Label"
import Flex from "components/layout/flex/Flex"
import * as Section from "components/layout/section/Section"
import * as Tag from "components/tag/Tag"
import { formatDateTime } from "formatters/date"
import useScreenSize from "hooks/useScreenSize"
import useStateUpdate from "hooks/useStateUpdate"
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

export default function FlySupplyChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { supplies, loading } = useFlySupply()

    const { state: features, toggle: toggleFeature } = useUniqueToggleList<FlySupplyFeature>([
        FlySupplyFeature.BURNED,
        FlySupplyFeature.CIRCULATING,
        FlySupplyFeature.STAKED,
    ])
    const [chartMarkers, setChartMarkers] = useState<FlySupplyMarkers>({
        mint: false,
        resume: false,
        breedingV2: false,
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

    const since = chartData.length > 0 ? chartData[0].date : null

    return (
        <Section.Root>
            <Section.Header>
                <Section.Title>FLY supply</Section.Title>
            </Section.Header>

            {since && (
                <Section.Description>
                    FLY supply history since {formatDateTime(since, { timeStyle: undefined })}.
                    Vested and locked FLY is estimated and interpolated over the defined time range.
                    See{" "}
                    <StyledLink
                        target="_blank"
                        href="https://hoppers-game.gitbook.io/hoppers-game/about/tokenomics#emission-distributions">
                        docs
                    </StyledLink>{" "}
                    for details.
                </Section.Description>
            )}

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
                            onCheckedChange={checked => updateChartMarkers({ resume: !!checked })}
                        />
                    </Flex>

                    <Flex gap="sm">
                        <Label htmlFor="breeding-v2">Breeding resume</Label>
                        <Checkbox
                            id="breeding-v2"
                            checked={chartMarkers.breedingV2}
                            onCheckedChange={checked =>
                                updateChartMarkers({ breedingV2: !!checked })
                            }
                        />
                    </Flex>
                </Markers>
            </Actions>

            <Bg css={{ height: chartHeight }}>
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
            </Bg>
        </Section.Root>
    )
}

// Constants
const ALL_FEATURES: FlySupplyFeature[] = [
    FlySupplyFeature.CIRCULATING,
    FlySupplyFeature.BURNED,
    FlySupplyFeature.STAKED,
    FlySupplyFeature.FREE,
]

// Components
const Bg = styled("div", {
    backgroundColor: "$gray2",
    padding: "0.5rem",
    borderRadius: "$md",
    "@md": {
        padding: "1rem",
    },
})
const Actions = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
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
const StyledLink = styled("a", {
    fontSize: "0.875rem",
    color: "$blue11",
    textDecoration: "none",
})
