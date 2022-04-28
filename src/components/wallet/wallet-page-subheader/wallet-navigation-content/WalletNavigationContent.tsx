import SubHeader from "components/headers/sub-header/SubHeader"
import Button from "components/inputs/buttons/button/Button"
import Flex from "components/layout/flex/Flex"
import * as Tabs from "components/tabs/Tabs"
import { WalletAddress } from "models/User"
import { styled } from "theme"

type WalletNavigationContentProps = {
    wallet: WalletAddress
    onClear: () => void
}

export default function WalletNavigationContent(props: WalletNavigationContentProps) {
    const { wallet, onClear } = props

    return (
        <SubHeader>
            <Flex x="between">
                <Flex gap="md" y="end">
                    <div>
                        <StyledLabel>Selected wallet</StyledLabel>
                        <StyledWallet>{wallet}</StyledWallet>
                    </div>
                    <Button size="sm" color="danger" onClick={onClear}>
                        Clear
                    </Button>
                </Flex>

                <Tabs.Root defaultValue="gameplay">
                    <Tabs.Tab value="gameplay">Gameplay</Tabs.Tab>
                    <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
                </Tabs.Root>
            </Flex>
        </SubHeader>
    )
}

const StyledLabel = styled("p", {
    color: "$gray11",
    fontSize: "0.875rem",
})
const StyledWallet = styled("h3", {
    fontSize: "1rem",
    color: "$gray12",
    fontWeight: 400,
})
