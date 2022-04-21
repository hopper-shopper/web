import useScreenSize from "hooks/useScreenSize"
import { Screens } from "theme"

type ScreenProps = {
    bp: keyof typeof Screens
    /**
     * @default "min"
     */
    constraint?: "min" | "max"
    children?: React.ReactNode
}

export default function Screen(props: ScreenProps) {
    const { bp, constraint = "min", children } = props

    const match = useScreenSize(bp)

    if (match && constraint === "min") {
        return <>{children}</>
    } else if (match && constraint === "max") {
        return null
    } else if (!match && constraint === "min") {
        return null
    } else if (!match && constraint === "max") {
        return <>{children}</>
    }

    return null
}
