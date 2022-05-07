import AnalyticsPageSubheader from "components/analytics/analytics-page-subheader/AnalyticsPageSubheader"
import useStateUpdate from "hooks/useStateUpdate"
import useAnalyticsPageState from "./useAnalyticsPageState"

export default function AnalyticsPage() {
    const [state, setState] = useAnalyticsPageState()
    const updateState = useStateUpdate(setState)

    return (
        <>
            <AnalyticsPageSubheader
                view={state.view}
                onViewChange={view => updateState({ view })}
            />
        </>
    )
}
