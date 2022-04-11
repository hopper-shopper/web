import { Hopper } from "models/Hopper"
import { createContext, useContext } from "react"

export type HopperCardContextProps = {
    hopper: Hopper
}

const HopperCardContext = createContext<HopperCardContextProps>({
    hopper: {} as Hopper,
})
export default HopperCardContext

export function useHopperCardContext() {
    const context = useContext(HopperCardContext)

    if (!context) {
        throw new Error("must be used inside a <HopperCardContext.Provider>")
    }

    return context
}
