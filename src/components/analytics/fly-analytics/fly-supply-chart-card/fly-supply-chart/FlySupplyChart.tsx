import { gray, grayDark } from "@radix-ui/colors"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { curveStepAfter } from "@visx/curve"
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleLinear, scaleTime } from "@visx/scale"
import { Bar, Line, LinePath } from "@visx/shape"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import DateTooltip from "components/charts/date-tooltip/DateTooltip"
import MarkerLine from "components/charts/marker-line/MarkerLine"
import Screen from "components/layout/screen/Screen"
import { bisector, extent } from "d3-array"
import { Currency, getCompactCurrencyFormatter } from "formatters/currency"
import { formatPercent } from "formatters/number"
import useConditionalClass from "hooks/useConditionalClass"
import useScreenSize from "hooks/useScreenSize"
import useThemeValue from "hooks/useThemeValue"
import useWindowEvent from "hooks/useWindowEvent"
import throttle from "lodash.throttle"
import { MouseEvent, TouchEvent, useMemo, useState } from "react"
import { flushSync } from "react-dom"
import { css, styled } from "theme"
import { fromIsoDate } from "utils/date"
import { isTouchDevice } from "utils/events"
import { IsoDatetime } from "utils/types"
import {
    FlySupplyFeature,
    FLY_FEATURE_TO_KEY,
    formatFlyChartFeature,
    SUPPLY_CHARTS_COLORS_DARK,
    SUPPLY_CHARTS_COLORS_LIGHT,
} from "./flySupplyChart.utils"
import { FlySupplyChartData } from "./useFlySupplyChartData"

type FlySupplyChartProps = {
    width: number
    height: number

    features: Set<FlySupplyFeature>
    markers: FlySupplyMarkers
    data: FlySupplyChartData[]
}

export default function FlySupplyChart(props: FlySupplyChartProps) {
    const { width, height, features, markers, data } = props

    const isTabletUp = useScreenSize("md")
    const colors = useThemeValue(SUPPLY_CHARTS_COLORS_LIGHT, SUPPLY_CHARTS_COLORS_DARK)
    const grayScale = useThemeValue(gray, grayDark)

    const marginLeft = isTabletUp ? 60 : 10
    const marginRight = 10
    const marginTop = 5
    const marginBottom = 30

    const startX = marginLeft
    const endX = width - marginRight
    const startY = height - marginBottom
    const endY = marginTop
    const xMax = endX - startX
    const yMax = startY - endY

    const dayScale = useMemo(() => {
        return scaleTime({
            range: [startX, endX],
            domain: extent(data, getDate) as [Date, Date],
        })
    }, [data, startX, endX])

    const supplyScale = useMemo(() => {
        const min = minSupply(Array.from(features), data)
        const max = maxSupply(Array.from(features), data)

        return scaleLinear({
            range: [startY, endY],
            domain: [min, max],
        })
    }, [startY, endY, features])

    const [brush, setBrush] = useState<BrushState | null>(null)

    const { tooltipLeft, tooltipTop, tooltipOpen, tooltipData, showTooltip, hideTooltip } =
        useTooltip<FlySupplyChartData>({ tooltipOpen: false })
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    })

    useWindowEvent("mouseup", () => {
        if (isTouchDevice() && !brush) {
            return
        }
        hideBrush()
        hideTooltip()
    })
    useConditionalClass(DISABLE_SELECTION_CLASS, tooltipOpen)

    const handleTooltip = useMemo(() => {
        return throttle(
            (event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
                let { x, y } = localPoint(event) || { x: marginLeft, y: height / 2 }

                const x0 = dayScale.invert(x)
                const index = bisectDate(data, x0, 1)

                const item = data[index - 1]

                showTooltip({
                    tooltipData: item,
                    tooltipLeft: x,
                    tooltipTop: y,
                })
                setBrush(prev => {
                    if (!prev) {
                        return null
                    }
                    return {
                        ...prev,
                        x2: x,
                        dataX2: item,
                    }
                })
            },
            30,
            { trailing: false },
        )
    }, [marginLeft, height, dayScale, data])
    const handleTooltipDismiss = () => {
        if (brush !== null) {
            return
        }

        hideTooltip()
    }

    const handleBrush = (event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: marginLeft }
        const x0 = dayScale.invert(x)
        const index = bisectDate(data, x0, 1)

        const item = data[index - 1]

        flushSync(() => {
            setBrush({
                x1: x,
                x2: x,
                dataX1: item,
                dataX2: item,
            })
        })
    }
    const hideBrush = () => {
        setBrush(null)
    }

    const renderLine = (forFeature: FlySupplyFeature): React.ReactNode => {
        const getSupply = getSupplyByFeature(forFeature)

        return (
            <LinePath
                key={forFeature}
                data={data}
                x={item => dayScale(getDate(item))}
                y={item => supplyScale(getSupply(item))}
                stroke={colors[forFeature]}
                strokeWidth={2}
                curve={curveStepAfter}
            />
        )
    }
    const renderTooltipCircle = (forFeature: FlySupplyFeature): React.ReactNode => {
        if (tooltipLeft === undefined || tooltipData === undefined) {
            return null
        }

        const getSupply = getSupplyByFeature(forFeature)

        return (
            <circle
                key={forFeature}
                cx={tooltipLeft}
                cy={supplyScale(getSupply(tooltipData))}
                r={4}
                fill={colors[forFeature]}
                fillOpacity={0.5}
                stroke={colors[forFeature]}
                strokeWidth={2}
                pointerEvents="none"
            />
        )
    }

    const renderTooltipLine = (forFeature: FlySupplyFeature): React.ReactNode => {
        if (!tooltipData) {
            return null
        }
        const brushChange = getBrushChange(forFeature)
        let brushChangeAbs = brushChange ? brushChange.to - brushChange.from : 0
        let brushChangePercent = brushChange ? brushChange.to / brushChange.from - 1 : 0

        if (Number.isNaN(brushChangePercent)) {
            brushChangePercent = 0
        }

        return (
            <SupplyItem key={forFeature}>
                <span style={{ color: colors[forFeature] }}>
                    {formatFlyChartFeature(forFeature)}
                </span>
                {brushChange === null && (
                    <Supply>{formatSupply(getSupplyByFeature(forFeature)(tooltipData))}</Supply>
                )}
                {brushChange !== null && (
                    <SupplyChange positive={brushChangeAbs > 0}>
                        {formatSupply(brushChangeAbs)} ({formatPercent(brushChangePercent)})
                    </SupplyChange>
                )}
            </SupplyItem>
        )
    }

    const getBrushChange = (forFeature: FlySupplyFeature): null | BrushChange => {
        if (!brush) {
            return null
        }

        const getSupply = getSupplyByFeature(forFeature)

        const fromSupply = getSupply(brush.dataX1)
        const toSupply = getSupply(brush.dataX2)

        return {
            from: fromSupply,
            to: toSupply,
        }
    }

    const featuresArray = Array.from(features)

    const mintX = dayScale(fromIsoDate(MINT_DATE))
    const resumeX = dayScale(fromIsoDate(RESUME_DATE))

    return (
        <>
            <svg ref={containerRef} width={width} height={height} style={{ touchAction: "pan-y" }}>
                <GridRows
                    scale={supplyScale}
                    width={xMax}
                    left={marginLeft}
                    stroke={grayScale.gray6}
                />

                {markers.mint && <MarkerLine x={mintX} startY={startY} endY={endY} text="Mint" />}
                {markers.resume && (
                    <MarkerLine x={resumeX} startY={startY} endY={endY} text="Game resume" />
                )}

                {brush && (
                    <Bar
                        x={Math.min(brush.x1, brush.x2)}
                        y={endY}
                        width={Math.abs(brush.x2 - brush.x1)}
                        height={yMax}
                        opacity={0.1}
                        fill={grayScale.gray9}
                    />
                )}

                {featuresArray.map(renderLine)}

                {tooltipOpen && tooltipLeft !== undefined && (
                    <Group>
                        <Line
                            from={{ x: tooltipLeft, y: endY }}
                            to={{ x: tooltipLeft, y: startY }}
                            stroke={grayScale.gray8}
                            strokeWidth={2}
                            strokeDasharray="5,3"
                            pointerEvents="none"
                        />

                        {featuresArray.map(renderTooltipCircle)}
                    </Group>
                )}

                <Bar
                    x={startX}
                    y={endY}
                    width={xMax}
                    height={yMax}
                    fill="transparent"
                    onTouchStart={event => {
                        handleBrush(event)
                        handleTooltip(event)
                    }}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={handleTooltipDismiss}
                    onMouseDown={handleBrush}
                    onMouseUp={hideBrush}
                />

                <AxisBottom
                    scale={dayScale}
                    top={startY}
                    stroke={grayScale.gray6}
                    tickStroke={grayScale.gray6}
                    tickFormat={item => formatDateShort(+item)}
                    tickLabelProps={() => ({
                        fill: grayScale.gray11,
                        fontSize: 12,
                        textAnchor: "middle",
                    })}
                />

                <Screen bp="md" constraint="min">
                    <AxisLeft
                        scale={supplyScale}
                        left={startX}
                        stroke={grayScale.gray6}
                        hideAxisLine
                        hideTicks
                        tickStroke={grayScale.gray11}
                        tickFormat={value => formatSupply(+value)}
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
                <>
                    <TooltipInPortal
                        key={`supply-${Date.now()}`}
                        unstyled
                        applyPositionStyle
                        top={tooltipTop}
                        left={tooltipLeft}>
                        <StyledTooltip>
                            <SupplyList>{featuresArray.map(renderTooltipLine)}</SupplyList>
                        </StyledTooltip>
                    </TooltipInPortal>

                    <TooltipInPortal
                        key={`date-${Date.now()}`}
                        unstyled
                        applyPositionStyle
                        offsetLeft={0}
                        offsetTop={4}
                        top={yMax}
                        left={tooltipLeft}>
                        <DateTooltip date={tooltipData.date} />
                    </TooltipInPortal>
                </>
            )}
        </>
    )
}

// Constants
const MINT_DATE: IsoDatetime = "2022-03-11T19:00:00.000Z"
const RESUME_DATE: IsoDatetime = "2022-03-18T18:30:00.000Z"
const DISABLE_SELECTION_CLASS = css({
    "*": {
        userSelect: "none",
    },
})().className

// Types
type BrushState = {
    x1: number
    x2: number
    dataX1: FlySupplyChartData
    dataX2: FlySupplyChartData
}
type BrushChange = {
    from: number
    to: number
}
export type FlySupplyMarkers = {
    mint: boolean
    resume: boolean
}

// Getters
function getDate(item: FlySupplyChartData): Date {
    return fromIsoDate(item.date)
}
function getSupplyByFeature(feature: FlySupplyFeature) {
    return (item: FlySupplyChartData): number => {
        const key = FLY_FEATURE_TO_KEY[feature]
        const value = item[key]

        return typeof value === "number" ? value : 0
    }
}
function minSupply(features: FlySupplyFeature[], data: FlySupplyChartData[]) {
    const values = data.map(item => {
        const featureValues = features.map(feature => getSupplyByFeature(feature)(item))

        return Math.min(...featureValues)
    })

    return Math.min(...values)
}
function maxSupply(features: FlySupplyFeature[], data: FlySupplyChartData[]) {
    const values = data.map(item => {
        const featureValues = features.map(feature => getSupplyByFeature(feature)(item))

        return Math.max(...featureValues)
    })

    return Math.max(...values)
}
const bisectDate = bisector<FlySupplyChartData, Date>(item => fromIsoDate(item.date)).left

// Formatters
function formatDateShort(date: number): string {
    const formatter = new Intl.DateTimeFormat([], {
        month: "numeric",
        day: "numeric",
    })

    return formatter.format(date)
}

const flyFormatter = getCompactCurrencyFormatter(Currency.FLY, [
    [1_000, "k"],
    [1_000_000, "m"],
])
function formatSupply(supply: number): string {
    return flyFormatter(supply)
}

// Components
const StyledTooltip = styled("div", {
    backgroundColor: "$gray2",
    borderRadius: "$md",
    border: "1px solid $gray6",
    padding: "0.5rem",
    transform: "translateY(-50%)",
    pointerEvents: "none",
})
const SupplyList = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
})
const SupplyItem = styled("div", {
    fontSize: "0.875rem",
    lineHeight: 1.25,
    "@md": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: "0.5rem",
    },
})
const Supply = styled("p", {
    color: "$gray12",
    "@md": {
        textAlign: "right",
    },
})
const SupplyChange = styled("p", {
    "@md": {
        textAlign: "right",
    },
    variants: {
        positive: {
            true: {
                color: "$teal11",
            },
            false: {
                color: "$red11",
            },
        },
    },
})
