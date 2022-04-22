import { Hopper } from "models/Hopper"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import HopperRoiCalculator, {
    HopperRoiCalculatorError,
} from "services/hopper-roi-calculator/HopperRoiCalculator"
import { Adventure, ALL_ADVENTURES } from "utils/adventures"

export type HopperRoiContextProps = {
    getRoiInDays: (adventure: Adventure) => number | HopperRoiCalculatorError
    min: number
    max: number
}

const HopperRoiContext = createContext<HopperRoiContextProps>({
    getRoiInDays: () => 0,
    min: 0,
    max: 0,
})
export default HopperRoiContext

export function useHopperRoiContext() {
    const context = useContext(HopperRoiContext)

    if (!context) {
        throw new Error("must be used inside a <HopperRoiContext.Provider>")
    }

    return context
}

type ProvideHopperRoiProps = {
    hopper: Hopper
    startAtLevel: number
    boughtForFly: number

    children: React.ReactNode
}
export function ProvideHopperRoi(props: ProvideHopperRoiProps) {
    const { hopper, startAtLevel, boughtForFly, children } = props

    const [roiMap, setRoiMap] = useState<HopperRoiMap>(INITIAL_ROI_MAP)

    useEffect(() => {
        if (boughtForFly === 0) {
            setRoiMap(INITIAL_ROI_MAP)
            return
        }

        for (const adventure of ALL_ADVENTURES) {
            try {
                const roiCalculator = new HopperRoiCalculator(hopper, startAtLevel).forAdventure(
                    adventure,
                )
                const roiInDays = roiCalculator.calculateRoiInDays(boughtForFly)

                setRoiMap(prev => ({
                    ...prev,
                    [adventure]: roiInDays,
                }))
            } catch (error) {
                setRoiMap(prev => ({
                    ...prev,
                    [adventure]: error as HopperRoiCalculatorError,
                }))
            }
        }
    }, [hopper, startAtLevel, boughtForFly])

    const getRoiInDays: HopperRoiContextProps["getRoiInDays"] = useCallback(
        adventure => {
            return roiMap[adventure]
        },
        [roiMap],
    )

    const [min, max] = useMemo(() => {
        const allRois = Object.values(roiMap).filter(
            roiInDays => typeof roiInDays === "number",
        ) as number[]

        return [Math.min(...allRois), Math.max(...allRois)]
    }, [roiMap])

    return (
        <HopperRoiContext.Provider value={{ getRoiInDays, min, max }}>
            {children}
        </HopperRoiContext.Provider>
    )
}
type HopperRoiMap = {
    [adventure in Adventure]: number | HopperRoiCalculatorError
}

const INITIAL_ROI_MAP: HopperRoiMap = {
    [Adventure.POND]: HopperRoiCalculatorError.NO_ROI,
    [Adventure.STREAM]: HopperRoiCalculatorError.NO_ROI,
    [Adventure.SWAMP]: HopperRoiCalculatorError.NO_ROI,
    [Adventure.RIVER]: HopperRoiCalculatorError.NO_ROI,
    [Adventure.FOREST]: HopperRoiCalculatorError.NO_ROI,
    [Adventure.GREAT_LAKE]: HopperRoiCalculatorError.NO_ROI,
}
