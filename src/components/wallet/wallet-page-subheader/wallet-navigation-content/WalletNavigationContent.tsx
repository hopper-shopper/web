import SubHeader from "components/headers/sub-header/SubHeader"
import Button from "components/inputs/buttons/button/Button"
import Flex from "components/layout/flex/Flex"
import * as Tabs from "components/tabs/Tabs"
import { WalletAddress } from "models/User"
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
            <Flex x="between" y="end">
                <Flex gap="md" y="end">
                    <div>
                        <StyledLabel>Selected wallet</StyledLabel>
                        <StyledWallet>{wallet}</StyledWallet>
                    </div>
                    <Button size="sm" color="danger" onClick={onClear}>
                        Clear
                    </Button>
                </Flex>

                <Tabs.Root
                    value={view}
                    onValueChange={value => onViewChange(value as WalletNavigationView)}>
                    <Tabs.Tab value={WalletNavigationView.GAMEPLAY}>Gameplay</Tabs.Tab>
                    <Tabs.Tab value={WalletNavigationView.ANALYTICS}>Analytics</Tabs.Tab>
                </Tabs.Root>
            </Flex>
        </SubHeader>
    )
}

// Types
export enum WalletNavigationView {
    GAMEPLAY = "GAMEPLAY",
    ANALYTICS = "ANALYTICS",
}

// Components

const StyledLabel = styled("p", {
    color: "$gray11",
    fontSize: "0.875rem",
})
const StyledWallet = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
})
