import { blueDark, grayDark } from "@radix-ui/colors"
import { Group } from "@visx/group"
import { scaleLinear } from "@visx/scale"
import { Line, LineRadial } from "@visx/shape"
import { HoppersActivitySnapshot } from "models/Hopper"
import { useMemo } from "react"
import { formatActivityKey, SnapshotKey } from "./hopperActivityChart.utils"

type HopperActivityChartProps = {
    width: number
    height: number

    keys: Array<keyof HoppersActivitySnapshot>
    activity: HoppersActivitySnapshot
}

export default function HopperActivityChart(props: HopperActivityChartProps) {
    const { width, height, keys, activity } = props

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

    const countMax = Math.max(...getCounts(keys, activity))
    const yScale = useMemo(() => {
        return scaleLinear({
            range: [0, radius],
            domain: [0, countMax],
        })
    }, [radius, countMax])

    const webs = useMemo(() => {
        return generateAngles(keys, activity)
    }, [keys, activity])
    const points = useMemo(() => {
        return generatePoints(keys, activity, radius)
    }, [keys, activity, radius])
    const polygonPoints = useMemo(() => {
        return generatePolygonPoints(keys, activity, yScale)
    }, [keys, activity, yScale])

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
    key: SnapshotKey
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
function generateAngles(keys: SnapshotKey[], snapshot: HoppersActivitySnapshot): number[] {
    const length = generateDummyPoints(keys, snapshot).length

    const angles: number[] = []

    for (let i = 0; i <= length; i++) {
        angles.push(i * (DEGREES / length))
    }

    return angles
}
function generatePoints(
    keys: SnapshotKey[],
    snapshot: HoppersActivitySnapshot,
    radius: number,
): Point[] {
    const points = generateDummyPoints(keys, snapshot)
    const length = points.length

    const step = (Math.PI * 2) / length

    for (let i = 0; i < length; i++) {
        points[i].x = radius * Math.sin(i * step)
        points[i].y = radius * Math.cos(i * step)
    }

    return points
}
function generatePolygonPoints(
    keys: SnapshotKey[],
    snapshot: HoppersActivitySnapshot,
    scale: YScale,
): PolygonDefinitions {
    const points = generateDummyPoints(keys, snapshot)
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
function generateDummyPoints(keys: SnapshotKey[], snapshot: HoppersActivitySnapshot): Point[] {
    const points: Point[] = keys.map(key => ({
        key,
        count: snapshot[key],
        x: 0,
        y: 0,
    }))

    return points
}
function getCounts(keys: SnapshotKey[], snapshot: HoppersActivitySnapshot): number[] {
    return keys.map<number>(key => snapshot[key])
}
