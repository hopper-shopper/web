import {
    grassDark,
    grayDark,
    indigoDark,
    mintDark,
    pinkDark,
    purpleDark,
    skyDark,
    grass,
    gray,
    indigo,
    mint,
    pink,
    purple,
    sky,
} from "@radix-ui/colors"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantize } from "@visx/scale"
import { Bar, BarGroup } from "@visx/shape"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import Flex from "components/layout/flex/Flex"
import Screen from "components/layout/screen/Screen"
import EmptyText from "components/typography/empty-text/EmptyText"
import { Currency, formatCurrency } from "formatters/currency"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import { MouseEvent, TouchEvent, useMemo, useState } from "react"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import { ChartData, DayDate } from "./useClaimedChartData"

type ClaimedChartProps = {
    width: number
    height: number

    visible: Adventure[]
    data: ChartData[]
}

export default function ClaimedChart(props: ClaimedChartProps) {
    const { width, height, data, visible } = props

    const isTabletUp = useScreenSize("md")
    const [columnOverlay, setColumnOverlay] = useState<ColumnOverlayState | null>(null)

    const marginLeft = isTabletUp ? 60 : 10
    const marginRight = 10
    const marginTop = 0
    const marginBottom = 30

    const xMax = width - marginLeft - marginRight
    const yMax = height - marginTop - marginBottom

    const colors = useThemeValue(CLAIMED_CHARTS_COLORS_LIGHT, CLAIMED_CHARTS_COLORS_DARK)
    const grayScale = useThemeValue(gray, grayDark)

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
            range: colors,
        })
    }, [colors])

    const { tooltipLeft, tooltipTop, tooltipOpen, tooltipData, showTooltip, hideTooltip } =
        useTooltip<TooltipData>({
            tooltipOpen: false,
        })
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    })

    const handleColumnOverlay = (
        event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>,
    ) => {
        let { x } = localPoint(event) || { x: marginLeft }
        x -= marginLeft

        const column = dayScaleInvert(x)
        const start = dayScale(column)

        if (typeof start === "number") {
            setColumnOverlay({
                x: start,
                width: dayScale.bandwidth(),
            })
            showTooltip({
                tooltipData: {
                    date: column,
                    width: dayScale.bandwidth(),
                },
                tooltipLeft: start + marginLeft - marginRight,
            })
        }
    }
    const hideColumnOverlay = () => {
        setColumnOverlay(null)
        hideTooltip()
    }

    if (dataMax === 0 || visible.length === 0 || data.length === 0) {
        return (
            <Flex x="center" y="center" css={{ width, height }}>
                <EmptyText>No data</EmptyText>
            </Flex>
        )
    }

    return (
        <>
            <svg ref={containerRef} width={width} height={height}>
                <GridRows
                    scale={claimedScale}
                    width={xMax}
                    left={marginLeft}
                    stroke={grayScale.gray6}
                />

                {columnOverlay !== null && (
                    <Bar
                        x={columnOverlay.x + marginLeft}
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

                <Bar
                    x={marginLeft}
                    y={marginTop}
                    width={xMax}
                    height={yMax}
                    fill="transparent"
                    onTouchStart={handleColumnOverlay}
                    onTouchMove={handleColumnOverlay}
                    onMouseMove={handleColumnOverlay}
                    onMouseLeave={hideColumnOverlay}
                />

                <AxisBottom
                    top={yMax + marginTop}
                    left={marginLeft}
                    scale={dayScale}
                    stroke={grayScale.gray6}
                    numTicks={isTabletUp ? undefined : 5}
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
                        scale={claimedScale}
                        left={marginLeft}
                        stroke={grayScale.gray11}
                        hideAxisLine
                        hideTicks
                        tickStroke={grayScale.gray11}
                        tickFormat={value => formatClaimed(Number(value))}
                        tickLabelProps={() => ({
                            fill: grayScale.gray11,
                            fontSize: 10,
                            textAnchor: "end",
                            verticalAnchor: "middle",
                        })}
                    />
                </Screen>
            </svg>

            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    key={Date.now()}
                    offsetTop={-4}
                    unstyled
                    applyPositionStyle
                    top={yMax}
                    left={tooltipLeft}>
                    <StlyedTooltipContainer style={{ minWidth: tooltipData.width }}>
                        <StyledTooltip>{formatDateLong(tooltipData.date)}</StyledTooltip>
                    </StlyedTooltipContainer>
                </TooltipInPortal>
            )}
        </>
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

export const CLAIMED_CHARTS_COLORS_LIGHT = [
    pink.pink9,
    purple.purple9,
    indigo.indigo9,
    sky.sky9,
    mint.mint9,
    grass.grass9,
]
export const CLAIMED_CHARTS_COLORS_DARK = [
    pinkDark.pink9,
    purpleDark.purple9,
    indigoDark.indigo9,
    skyDark.sky9,
    mintDark.mint9,
    grassDark.grass9,
]

// Types
type ColumnOverlayState = {
    x: number
    width: number
}
type TooltipData = {
    date: DayDate
    width: number
}

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
function formatDateShort(date: DayDate): string {
    const formatter = new Intl.DateTimeFormat([], {
        month: "numeric",
        day: "numeric",
    })

    return formatter.format(Date.parse(date))
}
function formatDateLong(date: DayDate): string {
    const formatter = new Intl.DateTimeFormat([], {
        dateStyle: "long",
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

// Components
const StlyedTooltipContainer = styled("div", {
    position: "relative",
})
const StyledTooltip = styled("span", {
    position: "absolute",
    whiteSpace: "nowrap",
    display: "inline-block",
    textAlign: "center",
    padding: "0.125rem 0.5rem",
    border: "1px solid $blue6",
    borderRadius: "$sm",
    backgroundColor: "$blue9",
    color: "#ffffff",
    fontSize: "0.875rem",
    left: "50%",
    transform: "translateX(-50%)",
})
