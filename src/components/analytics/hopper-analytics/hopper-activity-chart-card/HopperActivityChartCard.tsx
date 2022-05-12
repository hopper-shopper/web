import { ParentSizeModern } from "@visx/responsive"
import useHoppersActivity from "api/hooks/useHoppersActivity"
import * as ChartContainer from "components/layout/chart-container/ChartContainer"
import useScreenSize from "hooks/useScreenSize"
import { HoppersActivitySnapshot } from "models/Hopper"
import { styled } from "theme"
import HopperActivityChart from "./hopper-activity-chart/HopperActivityChart"
import { formatActivityKey } from "./hopper-activity-chart/hopperActivityChart.utils"
import * as Progress from "components/progress/Progress"

export default function HopperActivityChartCard() {
    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { activity, loading } = useHoppersActivity()

    const chartSize = ((): number => {
        if (isLaptopUp) {
            return 500
        } else if (isTabletUp) {
            return 300
        }
        return 250
    })()

    const total = KEYS.reduce((acc, cur) => acc + activity[cur], 0)

    return (
        <ChartContainer.Root>
            <ChartContainer.Header>
                <ChartContainer.Title>Hoppers activity</ChartContainer.Title>
            </ChartContainer.Header>

            <ChartContainer.Content>
                <InnerContainer>
                    <ChartWrapper css={{ size: chartSize }}>
                        <ParentSizeModern>
                            {({ height }) => (
                                <>
                                    {!loading && (
                                        <HopperActivityChart
                                            width={height}
                                            height={height}
                                            keys={KEYS}
                                            activity={activity}
                                        />
                                    )}
                                </>
                            )}
                        </ParentSizeModern>
                    </ChartWrapper>

                    <Details>
                        {KEYS.map(key => (
                            <Item key={key}>
                                <ActivityDescription>
                                    <ActivityText>{formatActivityKey(key)}</ActivityText>
                                    <ActivityCount>{activity[key]}</ActivityCount>
                                </ActivityDescription>
                                <Progress.Root>
                                    <Progress.Indicator
                                        style={{
                                            width:
                                                total > 0 ? `${(activity[key] / total) * 100}%` : 0,
                                        }}
                                        severity="normal"
                                    />
                                </Progress.Root>
                            </Item>
                        ))}
                    </Details>
                </InnerContainer>
            </ChartContainer.Content>
        </ChartContainer.Root>
    )
}

// Constants
const KEYS: Array<keyof HoppersActivitySnapshot> = [
    "idle",
    "breeding",
    "marketplace",
    "pond",
    "stream",
    "swamp",
    "river",
    "forest",
    "greatLake",
]

// Components
const InnerContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    "@lg": {
        flexDirection: "row",
        gap: "5rem",
    },
})
const ChartWrapper = styled("div", {
    mx: "auto",
})
const Details = styled("div", {
    flex: 1,
    display: "grid",
    rowGap: "1.5rem",
    alignContent: "center",
})
const Item = styled("div", {
    display: "grid",
    alignItems: "center",
    columnGap: "1rem",
    "@md": {
        gridTemplateColumns: "200px 1fr",
    },
})
const ActivityDescription = styled("p", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})
const ActivityText = styled("span", {
    color: "$gray12",
    fontSize: "1rem",
})
const ActivityCount = styled("span", {
    color: "$gray11",
    fontSize: "0.75rem",
})
