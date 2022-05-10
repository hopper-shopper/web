import { blueDark, grayDark } from "@radix-ui/colors"
import { Group } from "@visx/group"
import { scaleLinear } from "@visx/scale"
import { Line, LineRadial } from "@visx/shape"
import { HoppersActivitySnapshot } from "models/Hopper"
import React, { useMemo } from "react"

type HopperActivityChartProps = {
    width: number
    height: number

    activity: HoppersActivitySnapshot
}

export default function HopperActivityChart(props: HopperActivityChartProps) {
    const { width, height, activity } = props

    const marginLeft = 50
    const marginRight = 50
    const marginTop = 50
    const marginBottom = 50

    const xMax = width - marginLeft - marginRight
    const yMax = height - marginTop - marginBottom

    const radius = Math.min(xMax, yMax) / 2

    const radialScale = useMemo(() => {
        return scaleLinear({
            range: [0, Math.PI * 2],
            domain: [DEGREES, 0],
        })
    }, [])

    const countMax = Math.max(...generateDummyPoints(activity).map(point => point.count))
    const yScale = useMemo(() => {
        return scaleLinear({
            range: [0, radius],
            domain: [0, countMax],
        })
    }, [radius, countMax])

    const webs = useMemo(() => {
        return generateAngles(activity)
    }, [activity])
    const points = useMemo(() => {
        return generatePoints(activity, radius)
    }, [activity, radius])
    const polygonPoints = useMemo(() => {
        return generatePolygonPoints(activity, yScale)
    }, [yScale, activity])

    return (
        <svg width={width} height={height}>
            <Group top={height / 2} left={width / 2}>
                {[...new Array(LEVELS)].map((_, i) => (
                    <LineRadial
                        key={`web-${i}`}
                        data={webs}
                        angle={d => radialScale(d)}
                        radius={((i + 1) * radius) / LEVELS}
                        fill="none"
                        stroke={grayDark.gray6}
                        strokeWidth={2}
                        strokeLinecap="round"
                    />
                ))}

                {[...new Array(points.length)].map((_, i) => (
                    <Line
                        key={`radar-line-${i}`}
                        from={ZERO_POINT}
                        to={points[i]}
                        stroke={grayDark.gray6}
                        strokeWidth={2}
                    />
                ))}

                <polygon
                    points={polygonPoints.pointString}
                    fill={blueDark.blue9}
                    fillOpacity={0.2}
                    stroke={blueDark.blue8}
                    strokeWidth={1}
                />
                {polygonPoints.points.map((point, i) => (
                    <circle
                        key={`radar-point-${i}`}
                        cx={point.x}
                        cy={point.y}
                        r={4}
                        fill={blueDark.blue11}
                    />
                ))}

                {points.map(point => (
                    <text
                        key={`text-${point.key}`}
                        fill={grayDark.gray12}
                        x={point.x + point.x * 0.1}
                        y={point.y + point.y * 0.1}
                        textAnchor="middle"
                        fontSize={10}>
                        {formatActivityKey(point.key)}
                    </text>
                ))}
            </Group>
        </svg>
    )
}

// Types
type Point = {
    key: keyof HoppersActivitySnapshot
    count: number
    x: number
    y: number
}
type YScale = (item: number) => number
type PolygonDefinitions = {
    pointString: string
    points: Point[]
}

// Constants
const DEGREES = 360
const ZERO_POINT: Point = {
    key: "" as any, // any
    count: 0,
    x: 0,
    y: 0,
}
const LEVELS = 5

// Data generators
function generateAngles(snapshot: HoppersActivitySnapshot): number[] {
    const length = generateDummyPoints(snapshot).length

    const angles: number[] = []

    for (let i = 0; i <= length; i++) {
        angles.push(i * (DEGREES / length))
    }

    return angles
}
function generatePoints(snapshot: HoppersActivitySnapshot, radius: number): Point[] {
    const points = generateDummyPoints(snapshot)
    const length = points.length

    const step = (Math.PI * 2) / length

    for (let i = 0; i < length; i++) {
        points[i].x = radius * Math.sin(i * step)
        points[i].y = radius * Math.cos(i * step)
    }

    return points
}
function generatePolygonPoints(
    snapshot: HoppersActivitySnapshot,
    scale: YScale,
): PolygonDefinitions {
    const points = generateDummyPoints(snapshot)
    const step = (Math.PI * 2) / points.length

    let pointString = ""
    for (let i = 0; i < points.length; i++) {
        const point = points[i]
        const xVal = scale(point.count) * Math.sin(i * step)
        const yVal = scale(point.count) * Math.cos(i * step)
        points[i].x = xVal
        points[i].y = yVal
        pointString += `${xVal},${yVal} `
    }

    return {
        points,
        pointString,
    }
}
function generateDummyPoints(snapshot: HoppersActivitySnapshot): Point[] {
    const points: Point[] = [
        { key: "idle", count: snapshot.idle, x: 0, y: 0 },
        { key: "breeding", count: snapshot.breeding, x: 0, y: 0 },
        { key: "marketplace", count: snapshot.marketplace, x: 0, y: 0 },
        { key: "pond", count: snapshot.pond, x: 0, y: 0 },
        { key: "stream", count: snapshot.stream, x: 0, y: 0 },
        { key: "swamp", count: snapshot.swamp, x: 0, y: 0 },
        { key: "river", count: snapshot.river, x: 0, y: 0 },
        { key: "forest", count: snapshot.forest, x: 0, y: 0 },
        { key: "greatLake", count: snapshot.greatLake, x: 0, y: 0 },
    ]

    return points
}

// Formatters
const keyMapping: Record<keyof HoppersActivitySnapshot, string> = {
    idle: "Idle",
    breeding: "Breeding",
    marketplace: "Marketplace",
    adventure: "Adventure",
    pond: "Pond",
    stream: "Stream",
    swamp: "Swamp",
    river: "River",
    forest: "Forest",
    greatLake: "Great Lake",
}
function formatActivityKey(key: keyof HoppersActivitySnapshot): string {
    return keyMapping[key]
}
