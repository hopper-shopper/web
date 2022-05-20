import {
    blue,
    blueDark,
    crimson,
    crimsonDark,
    cyan,
    cyanDark,
    gray,
    grayDark,
    indigo,
    indigoDark,
    mint,
    mintDark,
    orange,
    orangeDark,
    sky,
    skyDark,
    teal,
    tealDark,
} from "@radix-ui/colors"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale"
import { BarGroup } from "@visx/shape"
import Flex from "components/layout/flex/Flex"
import EmptyText from "components/typography/empty-text/EmptyText"
import useThemeValue from "hooks/useThemeValue"
import { HopperActivitiesSnapshot } from "models/Hopper"
import { useMemo } from "react"
import { fromIsoDate } from "utils/date"

type HopperActivitiesHistoryChartProps = {
    width: number
    height: number

    data: HopperActivitiesSnapshot[]
    keys: Array<keyof HopperActivitiesSnapshot>
}

export default function HopperActivitiesHistoryChart(props: HopperActivitiesHistoryChartProps) {
    const { width, height, data, keys } = props

    const marginLeft = 40
    const marginRight = 10
    const marginTop = 20
    const marginBottom = 30

    const xMax = width - marginLeft - marginRight
    const yMax = height - marginTop - marginBottom

    const colors = useThemeValue(COUNT_CHARTS_COLORS_LIGHT, COUNT_CHARTS_COLORS_DARK)
    const grayScale = useThemeValue(gray, grayDark)

    const dayScale = useMemo(() => {
        return scaleBand({
            domain: data.map(getDate),
            padding: 0.2,
            range: [0, xMax],
        })
    }, [data, xMax])

    const bandWidth = dayScale.bandwidth()
    const activityScale = useMemo(() => {
        return scaleBand({
            domain: keys,
            padding: 0.1,
            range: [0, bandWidth],
        })
    }, [bandWidth, keys])

    const dataMax = Math.max(...data.map(item => countMax(item, keys)))
    const countScale = useMemo(() => {
        return scaleLinear({
            domain: [0, dataMax],
            range: [yMax, 0],
        })
    }, [data, dataMax, yMax])

    const colorScale = useMemo(() => {
        return scaleOrdinal({
            domain: ALL_HOPPER_SNAPSHOT_KEYS,
            range: colors,
        })
    }, [colors])

    if (data.length === 0) {
        return (
            <Flex x="center" y="center" css={{ width, height }}>
                <EmptyText>No data</EmptyText>
            </Flex>
        )
    }

    return (
        <svg width={width} height={height}>
            <GridRows
                scale={countScale}
                width={xMax}
                top={marginTop}
                left={marginLeft}
                stroke={grayScale.gray6}
            />

            <Group top={marginTop} left={marginLeft}>
                <BarGroup
                    data={data}
                    keys={keys}
                    height={yMax}
                    x0={getDate}
                    x0Scale={dayScale}
                    x1Scale={activityScale}
                    yScale={countScale}
                    color={colorScale}>
                    {barGroups => {
                        return barGroups.map(barGroup => (
                            <Group
                                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                                left={barGroup.x0}>
                                {barGroup.bars.map(bar => (
                                    <rect
                                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                                        x={bar.x}
                                        y={bar.y}
                                        width={bar.width}
                                        height={bar.height < 0 ? 0 : bar.height}
                                        fill={bar.color}
                                        rx={2}
                                    />
                                ))}
                            </Group>
                        ))
                    }}
                </BarGroup>
            </Group>

            <AxisBottom
                top={yMax + marginTop}
                left={marginLeft}
                scale={dayScale}
                stroke={grayScale.gray6}
                tickFormat={formatDateShort}
                tickStroke={grayScale.gray6}
                tickLabelProps={() => ({
                    fill: grayScale.gray11,
                    fontSize: 12,
                    textAnchor: "middle",
                })}
            />

            <AxisLeft
                top={marginTop}
                scale={countScale}
                left={marginLeft}
                stroke={grayScale.gray6}
                tickStroke={grayScale.gray6}
                tickLabelProps={() => ({
                    fill: grayScale.gray11,
                    fontSize: 10,
                    textAnchor: "end",
                    verticalAnchor: "middle",
                })}
            />
        </svg>
    )
}

// Constants
export const ALL_HOPPER_SNAPSHOT_KEYS: Array<keyof HopperActivitiesSnapshot> = [
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
export const COUNT_CHARTS_COLORS_LIGHT = [
    gray.gray9,
    crimson.crimson9,
    orange.orange9,
    indigo.indigo9,
    blue.blue9,
    cyan.cyan9,
    sky.sky9,
    mint.mint9,
    teal.teal9,
]
export const COUNT_CHARTS_COLORS_DARK = [
    grayDark.gray9,
    crimsonDark.crimson9,
    orangeDark.orange9,
    indigoDark.indigo9,
    blueDark.blue9,
    cyanDark.cyan9,
    skyDark.sky9,
    mintDark.mint9,
    tealDark.teal9,
]

// Getters
function getDate(snapshot: HopperActivitiesSnapshot): Date {
    return fromIsoDate(snapshot.date)
}
function countMax(
    snapshot: HopperActivitiesSnapshot,
    keys: Array<keyof HopperActivitiesSnapshot>,
): number {
    const values: number[] = []

    for (const key of keys) {
        const value = snapshot[key]
        if (typeof value === "number") {
            values.push(value)
        }
    }

    return Math.max(...values)
}

// Formatters
function formatDateShort(date: Date): string {
    const formatter = new Intl.DateTimeFormat([], {
        month: "numeric",
        day: "numeric",
    })

    return formatter.format(date)
}
