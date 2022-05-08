import { blue, blueDark } from "@radix-ui/colors"
import { Group } from "@visx/group"
import { Line } from "@visx/shape"
import useThemeValue from "hooks/useThemeValue"

type MarkerLineProps = {
    x: number
    startY: number
    endY: number
    text: string
}

export default function MarkerLine(props: MarkerLineProps) {
    const { x, startY, endY, text } = props

    const blueScale = useThemeValue(blue, blueDark)

    return (
        <Group>
            <Line
                from={{ x, y: endY + 20 }}
                to={{ x, y: startY }}
                stroke={blueScale.blue9}
                strokeWidth={3}
                pointerEvents="none"
            />
            <text fill={blueScale.blue11} x={x} y={endY + 10} textAnchor="middle" fontSize={10}>
                {text}
            </text>
        </Group>
    )
}
