import { ParentSizeModern } from "@visx/responsive"
import useHopperActivitiesHistory from "api/hooks/useHopperActivitiesHistory"
import * as Stepper from "components/inputs/stepper/Stepper"
import * as Section from "components/layout/section/Section"
import * as Tag from "components/tag/Tag"
import { getSPFormatter } from "formatters/text"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import { HopperActivitiesSnapshot } from "models/Hopper"
import { useMemo, useState } from "react"
import { styled } from "theme"
import { fromIsoDate } from "utils/date"
import { formatHopperActivitiesKey } from "./hopper-activities-history-chart/hopperActivitiesHistory.utils"
import HopperActivitiesHistoryChart, {
    COUNT_CHARTS_COLORS_DARK,
    COUNT_CHARTS_COLORS_LIGHT,
} from "./hopper-activities-history-chart/HopperActivitiesHistoryChart"

export default function HopperActivitiesHistoryChartCard() {
    const { activities, loading } = useHopperActivitiesHistory()

    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { state: keys, toggle: toggleKey } = useUniqueToggleList<keyof HopperActivitiesSnapshot>(
        INITIAL_HOPPER_SNAPSHOT_KEYS,
    )
    const [days, setDays] = useState(14)

    const tagColors = useThemeValue(COUNT_CHARTS_COLORS_LIGHT, COUNT_CHARTS_COLORS_DARK)

    const chartHeight = ((): number => {
        if (isLaptopUp) {
            return 700
        } else if (isTabletUp) {
            return 500
        }
        return 300
    })()

    const chartData = useMemo(() => {
        return [...activities]
            .sort((a, b) => {
                return +fromIsoDate(b.date) - +fromIsoDate(a.date)
            })
            .slice(0, days)
            .reverse()
    }, [activities, days])

    return (
        <Section.Root>
            <Section.Header>
                <Section.Title>Hopper activities</Section.Title>
            </Section.Header>

            <Actions>
                <Stepper.Root min={1} max={activities.length} value={days} onValueChange={setDays}>
                    <Stepper.Decrement />
                    <Stepper.Value css={{ minWidth: 70 }}>
                        {days} {daySPFormatter(days)}
                    </Stepper.Value>
                    <Stepper.Increment />
                </Stepper.Root>

                <FeatureList>
                    {SORTED_HOPPER_SNAPSHOT_KEYS.map((key, index) => (
                        <Tag.Root
                            key={key}
                            disabled={!keys.has(key)}
                            onClick={() => toggleKey(key)}>
                            <Tag.Marker css={{ backgroundColor: tagColors[index] }} />
                            <Tag.Text>{formatHopperActivitiesKey(key)}</Tag.Text>
                        </Tag.Root>
                    ))}
                </FeatureList>
            </Actions>

            <Bg css={{ height: chartHeight }}>
                <ParentSizeModern>
                    {({ width, height }) => (
                        <>
                            {!loading && (
                                <HopperActivitiesHistoryChart
                                    width={width}
                                    height={height}
                                    data={chartData}
                                    keys={Array.from(keys)}
                                />
                            )}
                        </>
                    )}
                </ParentSizeModern>
            </Bg>
        </Section.Root>
    )
}

const INITIAL_HOPPER_SNAPSHOT_KEYS: Array<keyof HopperActivitiesSnapshot> = [
    "idle",
    "breeding",
    "marketplace",
]
const SORTED_HOPPER_SNAPSHOT_KEYS: Array<keyof HopperActivitiesSnapshot> = [
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

const daySPFormatter = getSPFormatter("Day", "Days")

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
    "@md": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})
const FeatureList = styled("div", {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.5rem",
    "@md": {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@lg": {
        display: "flex",
        flexDirection: "row",
    },
})
