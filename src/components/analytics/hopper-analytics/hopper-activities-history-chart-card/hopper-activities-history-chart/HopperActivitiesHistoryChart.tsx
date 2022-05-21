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
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantize } from "@visx/scale"
import { Bar, BarGroup } from "@visx/shape"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import DateTooltip from "components/charts/date-tooltip/DateTooltip"
import Flex from "components/layout/flex/Flex"
import Screen from "components/layout/screen/Screen"
import EmptyText from "components/typography/empty-text/EmptyText"
import { bisector } from "d3-array"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import { HopperActivitiesSnapshot } from "models/Hopper"
import { MouseEvent, TouchEvent, useMemo, useState } from "react"
import { styled } from "theme"
import { fromIsoDate } from "utils/date"
import { clamp } from "utils/numbers"
import { formatHopperActivitiesKey } from "./hopperActivitiesHistory.utils"

type HopperActivitiesHistoryChartProps = {
    width: number
    height: number

    data: HopperActivitiesSnapshot[]
    keys: Array<keyof HopperActivitiesSnapshot>
}

export default function HopperActivitiesHistoryChart(props: HopperActivitiesHistoryChartProps) {
    const { width, height, data, keys: unsortedKeys } = props

    const isTabletUp = useScreenSize("md")
    const marginLeft = isTabletUp ? 50 : 20
    const marginRight = 10
    const marginTop = 20
    const marginBottom = 30

    const xMax = width - marginLeft - marginRight
    const yMax = height - marginTop - marginBottom

    const colors = useThemeValue(COUNT_CHARTS_COLORS_LIGHT, COUNT_CHARTS_COLORS_DARK)
    const grayScale = useThemeValue(gray, grayDark)

    const keys = useMemo(() => {
        return sortKeys(unsortedKeys)
    }, [unsortedKeys])

    const dayScale = useMemo(() => {
        return scaleBand({
            domain: data.map(getDate),
            padding: 0.2,
            range: [0, xMax],
        })
    }, [data, xMax])
    const dayScaleInvert = useMemo(() => {
        const domain = dayScale.domain()
        const range = dayScale.range()
        return scaleQuantize({
            domain: range,
            range: domain,
        })
    }, [dayScale])

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

    const [columnOverlay, setColumnOverlay] = useState<ColumnOverlayState | null>(null)
    const tooltip = useTooltip<TooltipData>({
        tooltipOpen: false,
    })
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    })

    const handleTooltip = (event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
        if (data.length === 0) {
            return
        }

        let { x, y } = localPoint(event) || { x: marginLeft, y: height / 2 }
        x -= marginLeft

        const date = dayScaleInvert(x)
        const start = dayScale(date)
        const dataIndex = bisectDate(data, date, 1)
        const item = data[dataIndex - 1]

        if (typeof start === "number") {
            setColumnOverlay({
                x: start + marginLeft,
                width: dayScale.bandwidth(),
            })
            tooltip.showTooltip({
                tooltipLeft: start + marginLeft,
                tooltipTop: y,
                tooltipData: {
                    snapshot: item,
                    width: dayScale.bandwidth(),
                },
            })
        }
    }
    const hideTooltip = () => {
        setColumnOverlay(null)
        tooltip.hideTooltip()
    }

    if (data.length === 0) {
        return (
            <Flex x="center" y="center" css={{ width, height }}>
                <EmptyText>No data</EmptyText>
            </Flex>
        )
    }

    return (
        <svg ref={containerRef} width={width} height={height}>
            <GridRows
                scale={countScale}
                width={xMax}
                top={marginTop}
                left={marginLeft}
                stroke={grayScale.gray6}
            />

            {columnOverlay !== null && (
                <Bar
                    x={columnOverlay.x}
                    y={marginTop}
                    width={columnOverlay.width}
                    height={yMax}
                    fill={grayScale.gray6}
                    rx={4}
                    pointerEvents="none"
                />
            )}

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

            <Bar
                x={marginLeft}
                y={marginTop}
                width={xMax}
                height={yMax}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={hideTooltip}
            />

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

            <Screen bp="md" constraint="min">
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
            </Screen>

            {tooltip.tooltipOpen && tooltip.tooltipData && (
                <>
                    <TooltipInPortal
                        key={`date-${Date.now()}`}
                        offsetTop={-4}
                        offsetLeft={0}
                        unstyled
                        applyPositionStyle
                        top={yMax + marginTop}
                        left={tooltip.tooltipLeft}>
                        <DateTooltip
                            date={tooltip.tooltipData.snapshot.date}
                            style={{ minWidth: tooltip.tooltipData.width }}
                        />
                    </TooltipInPortal>

                    <TooltipInPortal
                        key={`count-${Date.now()}`}
                        offsetTop={-10}
                        offsetLeft={0}
                        unstyled
                        applyPositionStyle
                        top={tooltip.tooltipTop}
                        left={(tooltip.tooltipLeft || 0) + tooltip.tooltipData.width / 2}>
                        <TooltipContainer>
                            <Tooltip>
                                {keys.map(key => (
                                    <TooltipRow key={key}>
                                        <TooltipText>
                                            <TooltipMarker
                                                css={{ backgroundColor: colorScale(key) }}
                                            />
                                            <TooltipKey>
                                                {formatHopperActivitiesKey(key)}
                                            </TooltipKey>
                                        </TooltipText>

                                        <TooltipCount>
                                            {tooltip.tooltipData?.snapshot[key]}
                                        </TooltipCount>
                                    </TooltipRow>
                                ))}
                            </Tooltip>
                        </TooltipContainer>
                    </TooltipInPortal>
                </>
            )}
        </svg>
    )
}

// Types
type TooltipData = {
    snapshot: HopperActivitiesSnapshot
    width: number
}
type ColumnOverlayState = {
    x: number
    width: number
}

// Constants
const ALL_HOPPER_SNAPSHOT_KEYS: Array<keyof HopperActivitiesSnapshot> = [
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
const bisectDate = bisector<HopperActivitiesSnapshot, Date>(getDate).right

// Formatters
function formatDateShort(date: Date): string {
    const formatter = new Intl.DateTimeFormat([], {
        month: "numeric",
        day: "numeric",
    })

    return formatter.format(date)
}

// Sorters
const ranking: Record<keyof HopperActivitiesSnapshot, number> = {
    date: -1,
    adventure: -1,
    idle: 0,
    breeding: 1,
    marketplace: 2,
    pond: 3,
    stream: 4,
    swamp: 5,
    river: 6,
    forest: 7,
    greatLake: 8,
}
function sortKeys(
    keys: Array<keyof HopperActivitiesSnapshot>,
): Array<keyof HopperActivitiesSnapshot> {
    return [...keys].sort((a, b) => {
        return ranking[a] - ranking[b]
    })
}

// Components
const TooltipContainer = styled("div", {
    position: "relative",
    left: "100%",
    pointerEvents: "none",
})
const Tooltip = styled("div", {
    position: "absolute",
    transform: "translate3d(-50%, -100%, 0)",
    padding: "0.5rem",
    borderRadius: "$md",
    border: "1px solid $gray6",
    backgroundColor: "$gray2",
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
})
const TooltipRow = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: "1rem",
})
const TooltipText = styled("span", {
    display: "inline-flex",
    alignItems: "center",
    columnGap: "0.5rem",
})
const TooltipMarker = styled("div", {
    size: "0.5rem",
    borderRadius: "50%",
})
const TooltipKey = styled("span", {
    color: "$gray11",
    fontSize: "0.875rem",
})
const TooltipCount = styled("span", {
    color: "$gray12",
    fontSize: "0.875rem",
})
