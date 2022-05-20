import useHopperActivitiesHistory from "api/hooks/useHopperActivitiesHistory"
import useScreenSize from "hooks/useScreenSize"
import * as Section from "components/layout/section/Section"
import { ParentSizeModern } from "@visx/responsive"
import HopperActivitiesHistoryChart, {
    ALL_HOPPER_SNAPSHOT_KEYS,
    COUNT_CHARTS_COLORS_DARK,
    COUNT_CHARTS_COLORS_LIGHT,
} from "./hopper-activities-history-chart/HopperActivitiesHistoryChart"
import { useMemo } from "react"
import { fromIsoDate } from "utils/date"
import { Screens, styled } from "theme"
import useUniqueToggleList from "hooks/useUniqueToggleList"
import { HopperActivitiesSnapshot } from "models/Hopper"
import * as Tag from "components/tag/Tag"
import useThemeValue from "hooks/useThemeValue"

export default function HopperActivitiesHistoryChartCard() {
    const { activities, loading } = useHopperActivitiesHistory()

    const isTabletUp = useScreenSize("md")
    const isLaptopUp = useScreenSize("lg")

    const { state: keys, toggle: toggleKey } =
        useUniqueToggleList<keyof HopperActivitiesSnapshot>(ALL_HOPPER_SNAPSHOT_KEYS)

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
            .slice(0, 10)
            .reverse()
    }, [activities])

    return (
        <Section.Root>
            <Section.Header>
                <Section.Title>Hopper activities</Section.Title>
            </Section.Header>

            <FeatureList>
                {SORTED_HOPPER_SNAPSHOT_KEYS.map((key, index) => (
                    <Tag.Root key={key} disabled={!keys.has(key)} onClick={() => toggleKey(key)}>
                        <Tag.Marker css={{ backgroundColor: tagColors[index] }} />
                        <Tag.Text>{formatKey(key)}</Tag.Text>
                    </Tag.Root>
                ))}
            </FeatureList>

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

const Bg = styled("div", {
    backgroundColor: "$gray2",
    padding: "1rem",
    borderRadius: "$md",
})
const FeatureList = styled("div", {
    display: "flex",
    gap: "0.5rem",
})

const mapping: Record<keyof HopperActivitiesSnapshot, string> = {
    idle: "Idle",
    marketplace: "Marketplace",
    breeding: "Breeding",
    adventure: "All adventures",
    pond: "Pond",
    stream: "Stream",
    swamp: "Swamp",
    river: "River",
    forest: "Forest",
    greatLake: "Great Lake",
    date: "",
}
function formatKey(key: keyof HopperActivitiesSnapshot): string {
    return mapping[key]
}
