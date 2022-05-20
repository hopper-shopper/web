import { InspectPageState } from "pages/inspect-page/useInspectPageState"
import EnterHopperContent from "./enter-hopper-content/EnterHopperContent"
import InspectPageNavigation from "./inspect-page-navigation/InspectPageNavigation"

type InspectPageSubheaderProps = {
    state: InspectPageState
    onChange: (update: Partial<InspectPageState>) => void
}

export default function InspectPageSubheader(props: InspectPageSubheaderProps) {
    const { state, onChange } = props

    if (!state.hopperId) {
        return (
            <EnterHopperContent
                initialHopper={state.hopperId}
                onChange={hopperId => onChange({ hopperId })}
            />
        )
    }

    return (
        <InspectPageNavigation
            hopperId={state.hopperId}
            onClear={() => onChange({ hopperId: "" })}
        />
    )
}
