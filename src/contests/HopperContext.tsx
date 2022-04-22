import { Hopper } from "models/Hopper"
import { createContext, useContext } from "react"

export type HopperContextProps = {
    hopper: Hopper
}

const HopperContext = createContext<HopperContextProps>({
    hopper: {} as Hopper,
})
export default HopperContext

export function useHopperContext() {
    const context = useContext(HopperContext)

    if (!context) {
        throw new Error("must be used inside a <HopperContext.Provider>")
    }

    return context
}

type ProvideHopperProps = HopperContextProps & {
    children?: React.ReactNode
}
export function ProvideHopper(props: ProvideHopperProps) {
    const { hopper, children } = props

    return <HopperContext.Provider value={{ hopper }}>{children}</HopperContext.Provider>
}
