import { WalletNavigationView, WalletPageState } from "pages/wallet-page/useWalletPageState"
import { Screens, styled } from "theme"
import EnterWalletContent from "./enter-wallet-content/EnterWalletContent"
import WalletNavigationContent from "./wallet-navigation-content/WalletNavigationContent"

type WalletPageSubheaderProps = {
    state: WalletPageState
    onChange: (update: Partial<WalletPageState>) => void
}

export default function WalletPageSubheader(props: WalletPageSubheaderProps) {
    const { state, onChange } = props

    if (!state.wallet) {
        return (
            <Container>
                <EnterWalletContent
                    initialWallet={state.wallet}
                    onChange={wallet => onChange({ wallet, view: WalletNavigationView.GAMEPLAY })}
                />
            </Container>
        )
    }

    return (
        <WalletNavigationContent
            wallet={state.wallet}
            onClear={() => onChange({ wallet: "", view: WalletNavigationView.GAMEPLAY })}
            view={state.view}
            onViewChange={view => onChange({ view })}
        />
    )
}

const Container = styled("div", {
    maxWidth: Screens.sm,
    mx: "auto",
})
