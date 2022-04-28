import { WalletAddress } from "models/User"
import { Screens, styled } from "theme"
import EnterWalletContent from "./enter-wallet-content/EnterWalletContent"
import WalletNavigationContent from "./wallet-navigation-content/WalletNavigationContent"

type WalletPageSubheaderProps = {
    wallet: WalletAddress
    onChange: (wallet: WalletAddress) => void
}

export default function WalletPageSubheader(props: WalletPageSubheaderProps) {
    const { wallet, onChange } = props

    if (!wallet) {
        return (
            <Container>
                <EnterWalletContent initialWallet={wallet} onChange={onChange} />
            </Container>
        )
    }

    return <WalletNavigationContent wallet={wallet} onClear={() => onChange("")} />
}

const Container = styled("div", {
    maxWidth: Screens.sm,
    mx: "auto",
})
