import {
    brown,
    brownDark,
    gray,
    grayDark,
    pink,
    pinkDark,
    red,
    redDark,
    violet,
    violetDark,
    yellow,
    yellowDark,
} from "@radix-ui/colors"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { curveStepAfter } from "@visx/curve"
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleLinear, scaleTime } from "@visx/scale"
import { Bar, Line, LinePath } from "@visx/shape"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import { bisector, extent } from "d3-array"
import { Currency, getCompactCurrencyFormatter } from "formatters/currency"
import useThemeValue from "hooks/useThemeValue"
import { MouseEvent, TouchEvent, useMemo } from "react"
import { styled } from "theme"
import { fromIsoDate } from "utils/date"
import { IsoDate } from "utils/types"
import { FlySupplyChartData } from "./useFlySupplyChartData"

type FlySupplyChartProps = {
    width: number
    height: number

    features: Set<FlySupplyFeature>
    data: FlySupplyChartData[]
}

export default function FlySupplyChart(props: FlySupplyChartProps) {
    const { width, height, features, data } = props

    const marginLeft = 60
    const marginRight = 10
    const marginTop = 5
    const marginBottom = 30

    const startX = marginLeft
    const endX = width - marginRight
    const startY = height - marginBottom
    const endY = marginTop
    const xMax = endX - startX
    const yMax = startY - endY

    const colors = useThemeValue(SUPPLY_CHARTS_COLORS_LIGHT, SUPPLY_CHARTS_COLORS_DARK)
    const grayScale = useThemeValue(gray, grayDark)

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

    const { tooltipLeft, tooltipTop, tooltipOpen, tooltipData, showTooltip, hideTooltip } =
        useTooltip<FlySupplyChartData>({ tooltipOpen: false })
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    })

    const handleTooltip = (event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
        let { x, y } = localPoint(event) || { x: marginLeft, y: height / 2 }

        const x0 = dayScale.invert(x)
        const index = bisectDate(data, x0, 1)

        const item = data[index - 1]

        showTooltip({
            tooltipData: item,
            tooltipLeft: x,
            tooltipTop: y,
        })
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
                cx={tooltipLeft}
                cy={supplyScale(getSupply(tooltipData))}
                r={4}
                fill={grayScale.gray9}
                fillOpacity={0.5}
                stroke={grayScale.gray9}
                strokeWidth={2}
                pointerEvents="none"
            />
        )
    }

    const featuresArray = Array.from(features)

    return (
        <>
            <svg ref={containerRef} width={width} height={height}>
                <GridRows
                    scale={supplyScale}
                    width={xMax}
                    left={marginLeft}
                    stroke={grayScale.gray6}
                />

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
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={hideTooltip}
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
            </svg>

            {tooltipOpen && tooltipData && (
                <>
                    <TooltipInPortal
                        key={`supply-${Date.now()}`}
                        unstyled
                        applyPositionStyle
                        top={tooltipTop}
                        left={tooltipLeft}>
                        <StyledTooltip css={{ minWidth: 200 }}>
                            <SupplyList>
                                {featuresArray.map(feature => (
                                    <SupplyItem key={feature}>
                                        <span style={{ color: colors[feature] }}>
                                            {formatFeature(feature)}
                                        </span>
                                        <span>
                                            {formatSupply(getSupplyByFeature(feature)(tooltipData))}
                                        </span>
                                    </SupplyItem>
                                ))}
                            </SupplyList>
                        </StyledTooltip>
                    </TooltipInPortal>

                    <TooltipInPortal
                        key={`date-${Date.now()}`}
                        unstyled
                        applyPositionStyle
                        offsetLeft={0}
                        top={yMax}
                        left={tooltipLeft}>
                        <StlyedDateTooltipContainer>
                            <StyledDateTooltip>
                                {formatDateLong(tooltipData.date)}
                            </StyledDateTooltip>
                        </StlyedDateTooltipContainer>
                    </TooltipInPortal>
                </>
            )}
        </>
    )
}

// Types
export enum FlySupplyFeature {
    TOTAL_SUPPLY,
    BURNED,
    STAKED,
    FREE,
    AVAILABLE,
}

// Constants
const FEATURE_TO_KEY: Record<FlySupplyFeature, keyof FlySupplyChartData> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: "total",
    [FlySupplyFeature.BURNED]: "burned",
    [FlySupplyFeature.STAKED]: "staked",
    [FlySupplyFeature.AVAILABLE]: "available",
    [FlySupplyFeature.FREE]: "free",
}

export const SUPPLY_CHARTS_COLORS_LIGHT: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: red.red9,
    [FlySupplyFeature.BURNED]: brown.brown9,
    [FlySupplyFeature.STAKED]: yellow.yellow9,
    [FlySupplyFeature.AVAILABLE]: pink.pink9,
    [FlySupplyFeature.FREE]: violet.violet9,
}
export const SUPPLY_CHARTS_COLORS_DARK: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: redDark.red9,
    [FlySupplyFeature.BURNED]: brownDark.brown9,
    [FlySupplyFeature.STAKED]: yellowDark.yellow9,
    [FlySupplyFeature.AVAILABLE]: pinkDark.pink9,
    [FlySupplyFeature.FREE]: violetDark.violet9,
}

// Getters
function getDate(item: FlySupplyChartData): Date {
    return fromIsoDate(item.date)
}
function getSupplyByFeature(feature: FlySupplyFeature) {
    return (item: FlySupplyChartData): number => {
        const key = FEATURE_TO_KEY[feature]
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
function formatDateLong(date: IsoDate): string {
    const formatter = new Intl.DateTimeFormat([], {
        dateStyle: "long",
    })

    return formatter.format(Date.parse(date))
}

const flyFormatter = getCompactCurrencyFormatter(Currency.FLY, [
    [1_000, "k"],
    [1_000_000, "m"],
])
function formatSupply(supply: number): string {
    return flyFormatter(supply)
}

const featureTextMapping: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: "Total",
    [FlySupplyFeature.BURNED]: "Burned",
    [FlySupplyFeature.STAKED]: "Staked",
    [FlySupplyFeature.AVAILABLE]: "Available",
    [FlySupplyFeature.FREE]: "Free",
}
function formatFeature(feature: FlySupplyFeature): string {
    return featureTextMapping[feature]
}

// Components
const StyledTooltip = styled("div", {
    backgroundColor: "$gray2",
    borderRadius: "$md",
    border: "1px solid $gray6",
    padding: "0.5rem",
    transform: "translateY(-50%)",
})
const SupplyList = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
})
const SupplyItem = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.875rem",
    lineHeight: 1.25,
    color: "$gray12",
})
const StlyedDateTooltipContainer = styled("div", {
    position: "relative",
})
const StyledDateTooltip = styled("span", {
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
    transform: "translateX(-50%)",
})
