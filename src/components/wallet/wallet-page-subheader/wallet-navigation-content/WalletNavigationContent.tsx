import SubHeader from "components/headers/sub-header/SubHeader"
import Button from "components/inputs/buttons/button/Button"
import Screen from "components/layout/screen/Screen"
import * as Tabs from "components/tabs/Tabs"
import { formatWalletAddress } from "formatters/wallet"
import { WalletAddress } from "models/User"
import { WalletNavigationView } from "pages/wallet-page/useWalletPageState"
import { styled } from "theme"

type WalletNavigationContentProps = {
    wallet: WalletAddress
    onClear: () => void

    view: WalletNavigationView
    onViewChange: (view: WalletNavigationView) => void
}

export default function WalletNavigationContent(props: WalletNavigationContentProps) {
    const { wallet, onClear, view, onViewChange } = props

    return (
        <SubHeader>
            <Container>
                <WalletContainer>
                    <CurrentWallet>
                        <StyledLabel>Selected wallet</StyledLabel>
                        <StyledWallet>
                            <Screen bp="md" constraint="max">
                                {formatWalletAddress(wallet)}
                            </Screen>
                            <Screen bp="md" constraint="min">
                                {wallet}
                            </Screen>
                        </StyledWallet>
                    </CurrentWallet>
                    <Button size="sm" color="danger" onClick={onClear}>
                        Clear
                    </Button>
                </WalletContainer>

                <TabsContainer>
                    <Tabs.Root
                        value={view}
                        onValueChange={value => onViewChange(value as WalletNavigationView)}>
                        <Tabs.Tab value={WalletNavigationView.GAMEPLAY}>Gameplay</Tabs.Tab>
                        <Tabs.Tab value={WalletNavigationView.ANALYTICS}>Analytics</Tabs.Tab>
                    </Tabs.Root>
                </TabsContainer>
            </Container>
        </SubHeader>
    )
}

// Components
const Container = styled("div", {
    display: "grid",
    rowGap: "2rem",
    "@lg": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
})
const WalletContainer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    columnGap: "0.5rem",
    "@md": {
        columnGap: "1rem",
    },
})
const CurrentWallet = styled("div", {
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
const StyledWallet = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
})
const TabsContainer = styled("div", {
    display: "flex",
    justifyContent: "center",
})
