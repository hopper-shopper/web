import {
    grassDark,
    grayDark,
    indigoDark,
    mintDark,
    pinkDark,
    purpleDark,
    skyDark,
} from "@radix-ui/colors"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale"
import { BarGroup } from "@visx/shape"
import { Currency, formatCurrency } from "formatters/currency"
import { useMemo } from "react"
import { Adventure } from "utils/adventures"
import { ChartData, DayDate } from "./useClaimedChartData"
import { GridRows } from "@visx/grid"
import Flex from "components/layout/flex/Flex"
import EmptyText from "components/typography/empty-text/EmptyText"
import Screen from "components/layout/screen/Screen"
import useScreenSize from "hooks/useScreenSize"

type ClaimedChartProps = {
    width: number
    height: number

    visible: Adventure[]
    data: ChartData[]
}

export default function ClaimedChart(props: ClaimedChartProps) {
    const { width, height, data, visible } = props

    const isTabletUp = useScreenSize("md")

    const marginLeft = isTabletUp ? 60 : 10
    const marginRight = 10
    const marginTop = 0
    const marginBottom = 30

    const xMax = width - marginLeft - marginRight
    const yMax = height - marginTop - marginBottom

    const visibleKeys: Array<keyof ChartData> = useMemo(() => {
        const keys: Array<keyof ChartData> = []

        for (const adventure of visible) {
            keys.push(VISIBLITY_BY_ADVENTURE[adventure])
        }

        return sortKeys(keys)
    }, [visible])

    const dayScale = useMemo(() => {
        return scaleBand({
            domain: data.map(getDate),
            padding: 0.4,
            range: [0, xMax],
        })
    }, [data, xMax])

    const bandWidth = dayScale.bandwidth()
    const adventureScale = useMemo(() => {
        return scaleBand({
            domain: visibleKeys,
            padding: 0.2,
            range: [0, bandWidth],
        })
    }, [dayScale, bandWidth, visibleKeys])

    const dataMax = Math.max(...data.map(item => claimedMax(item, visibleKeys)))
    const claimedScale = useMemo(() => {
        return scaleLinear({
            domain: [0, dataMax],
            range: [yMax, 0],
        })
    }, [data, dataMax, height])

    const colorScale = useMemo(() => {
        return scaleOrdinal({
            domain: ALL_KEYS,
            range: CLAIMED_CHARTS_COLORS,
        })
    }, [visibleKeys])

    if (dataMax === 0 || visible.length === 0 || data.length === 0) {
        return (
            <Flex x="center" y="center" css={{ width, height }}>
                <EmptyText>No data</EmptyText>
            </Flex>
        )
    }

    return (
        <svg width={width} height={height}>
            <GridRows scale={claimedScale} width={xMax} left={marginLeft} stroke={grayDark.gray6} />

            <Group top={marginTop} left={marginLeft}>
                <BarGroup
                    data={data}
                    keys={visibleKeys}
                    height={yMax}
                    x0={getDate}
                    x0Scale={dayScale}
                    x1Scale={adventureScale}
                    yScale={claimedScale}
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
                stroke={grayDark.gray6}
                numTicks={isTabletUp ? undefined : 5}
                tickFormat={formatDate}
                tickStroke={grayDark.gray6}
                tickLabelProps={() => ({
                    fill: grayDark.gray11,
                    fontSize: 12,
                    textAnchor: "middle",
                })}
            />

            <Screen bp="md" constraint="min">
                <AxisLeft
                    scale={claimedScale}
                    left={marginLeft}
                    stroke={grayDark.gray11}
                    hideAxisLine
                    hideTicks
                    tickStroke={grayDark.gray11}
                    tickFormat={value => formatClaimed(Number(value))}
                    tickLabelProps={() => ({
                        fill: grayDark.gray11,
                        fontSize: 10,
                        textAnchor: "end",
                        verticalAnchor: "middle",
                    })}
                />
            </Screen>
        </svg>
    )
}

// Constants
const ALL_KEYS: Array<keyof ChartData> = [
    "claimedPond",
    "claimedStream",
    "claimedSwamp",
    "claimedRiver",
    "claimedForest",
    "claimedGreatLake",
]
const VISIBLITY_BY_ADVENTURE: Record<Adventure, keyof ChartData> = {
    [Adventure.POND]: "claimedPond",
    [Adventure.STREAM]: "claimedStream",
    [Adventure.SWAMP]: "claimedSwamp",
    [Adventure.RIVER]: "claimedRiver",
    [Adventure.FOREST]: "claimedForest",
    [Adventure.GREAT_LAKE]: "claimedGreatLake",
}

export const CLAIMED_CHARTS_COLORS = [
    pinkDark.pink9,
    purpleDark.purple9,
    indigoDark.indigo9,
    skyDark.sky9,
    mintDark.mint9,
    grassDark.grass9,
]

// Getters
function getDate(item: ChartData): DayDate {
    return item.date
}

function claimedMax(item: ChartData, visibleKeys: Array<keyof ChartData>): number {
    const values: number[] = []

    for (const key of visibleKeys) {
        const value = item[key]
        if (typeof value === "number") {
            values.push(value)
        }
    }

    return Math.max(...values)
}

// Formatters
function formatDate(date: DayDate): string {
    const formatter = new Intl.DateTimeFormat([], {
        month: "numeric",
        day: "numeric",
    })

    return formatter.format(Date.parse(date))
}

function formatClaimed(claimed: number): string {
    return formatCurrency(claimed, Currency.FLY)
}

// Sorters
const ranking: Record<keyof ChartData, number> = {
    date: -1,
    claimedPond: 0,
    claimedStream: 1,
    claimedSwamp: 2,
    claimedRiver: 3,
    claimedForest: 4,
    claimedGreatLake: 5,
}
function sortKeys(keys: Array<keyof ChartData>): Array<keyof ChartData> {
    return [...keys].sort((a, b) => {
        return ranking[a] - ranking[b]
    })
}
