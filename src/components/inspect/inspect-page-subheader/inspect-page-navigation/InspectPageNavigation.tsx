import SubHeader from "components/headers/sub-header/SubHeader"
import Button from "components/inputs/buttons/button/Button"
import { HopperId } from "models/Hopper"
import { Screens, styled } from "theme"

type InspectPageNavigationProps = {
    hopperId: HopperId
    onClear: () => void
}

export default function InspectPageNavigation(props: InspectPageNavigationProps) {
    const { hopperId, onClear } = props

    return (
        <SubHeader>
            <Container>
                <CurrentHopperId>
                    <StyledLabel>Selected Hopper-ID</StyledLabel>
                    <StyledHopperId>{hopperId}</StyledHopperId>
                </CurrentHopperId>
                <Button size="sm" color="danger" onClick={onClear}>
                    Clear
                </Button>
            </Container>
        </SubHeader>
    )
}

const Container = styled("div", {
    maxWidth: Screens.lg,
    mx: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    columnGap: "0.5rem",
    "@md": {
        columnGap: "1rem",
    },
})
const CurrentHopperId = styled("div", {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@lg": {
        display: "block",
    },
})
const StyledLabel = styled("p", {
    color: "$gray11",
    fontSize: "0.875rem",
})
const StyledHopperId = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
})
