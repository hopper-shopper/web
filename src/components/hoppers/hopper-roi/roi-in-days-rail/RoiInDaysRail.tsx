import { formatAdventure } from "formatters/adventure"
import { HopperRoiCalculatorError } from "services/hopper-roi-calculator/HopperRoiCalculator"
import { styled } from "theme"
import { Adventure } from "utils/adventures"
import { useHopperRoiContext } from "../HopperRoiContext"

type RoiInDaysRailProps = {
    adventure: Adventure
}

export default function RoiInDaysRail(props: RoiInDaysRailProps) {
    const { adventure } = props
    const { getRoiInDays, min, max } = useHopperRoiContext()

    const roiInDays = getRoiInDays(adventure)

    const indicatorWidth = ((): number => {
        if (typeof roiInDays === "number") {
            return (roiInDays * 100) / max
        }

        switch (roiInDays) {
            case HopperRoiCalculatorError.BOUGHT_ZERO:
                return 0
            case HopperRoiCalculatorError.NO_ROI:
                return 100
            case HopperRoiCalculatorError.CANNOT_ENTER:
                return 0
        }
    })()
    const formattedDays = ((): string => {
        if (typeof roiInDays === "number") {
            return `${Math.ceil(roiInDays)} Days`
        }

        switch (roiInDays) {
            case HopperRoiCalculatorError.BOUGHT_ZERO:
                return ""
            case HopperRoiCalculatorError.NO_ROI:
                return "1000+ Days"
            case HopperRoiCalculatorError.CANNOT_ENTER:
                return "No permit"
        }
    })()

    return (
        <Container>
            <Subject>
                <span>{formatAdventure(adventure)}</span>
                <span>{formattedDays}</span>
            </Subject>

            <StyledRail>
                <RoiIndicator
                    css={{ width: `${indicatorWidth}%` }}
                    worst={roiInDays === max}
                    best={roiInDays === min}
                />
            </StyledRail>
        </Container>
    )
}

const Container = styled("div", {
    display: "grid",
    gap: "0.5rem",
    "@md": {
        gap: "1rem",
        alignItems: "center",
        gridTemplateColumns: "200px 1fr",
    },
    "@lg": {
        gridTemplateColumns: "300px 1fr",
    },
})
const Subject = styled("p", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "$gray12",
    fontSize: "1rem",
})
const StyledRail = styled("div", {
    height: "1.5rem",
    borderRadius: "$md",
    padding: "0 1rem",
    border: "1px solid $gray6",
    position: "relative",
    backgroundColor: "$gray3",
    overflow: "hidden",
})
const RoiIndicator = styled("div", {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "$gray9",
    variants: {
        best: {
            true: {
                backgroundColor: "$teal9 !important",
            },
        },
        worst: {
            true: {
                backgroundColor: "$red9",
            },
        },
    },
})
