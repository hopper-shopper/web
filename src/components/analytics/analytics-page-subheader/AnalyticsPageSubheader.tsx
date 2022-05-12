import SubHeader from "components/headers/sub-header/SubHeader"
import * as Tabs from "components/tabs/Tabs"
import { AnalyticsNavigationView } from "pages/analytics-page/useAnalyticsPageState"
import { styled } from "theme"

type AnalyticsPageSubheaderProps = {
    view: AnalyticsNavigationView
    onViewChange: (view: AnalyticsNavigationView) => void
}

export default function AnalyticsPageSubheader(props: AnalyticsPageSubheaderProps) {
    const { view, onViewChange } = props

    return (
        <SubHeader>
            <Container>
                <Tabs.Root
                    value={view}
                    onValueChange={value => onViewChange(value as AnalyticsNavigationView)}>
                    <Tabs.Tab value={AnalyticsNavigationView.FLY}>FLY</Tabs.Tab>
                    <Tabs.Tab value={AnalyticsNavigationView.HOPPERS}>Hoppers</Tabs.Tab>
                </Tabs.Root>
            </Container>
        </SubHeader>
    )
}

// Components
const Container = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})
