import AnalyticsPageSubheader from "components/analytics/analytics-page-subheader/AnalyticsPageSubheader"
import FlyAnalytics from "components/analytics/fly-analytics/FlyAnalytics"
import useStateUpdate from "hooks/useStateUpdate"
import useAnalyticsPageState, { AnalyticsNavigationView } from "./useAnalyticsPageState"

export default function AnalyticsPage() {
    const [state, setState] = useAnalyticsPageState()
    const updateState = useStateUpdate(setState)

    return (
        <>
            <AnalyticsPageSubheader
                view={state.view}
                onViewChange={view => updateState({ view })}
            />

            {state.view === AnalyticsNavigationView.FLY && <FlyAnalytics />}
        </>
    )
}
