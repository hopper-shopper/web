import EmptyText from "components/typography/empty-text/EmptyText"
import WalletAnalytics from "components/wallet/wallet-analytics/WalletAnalytics"
import WalletDetails from "components/wallet/wallet-details/WalletDetails"
import WalletPageSubheader from "components/wallet/wallet-page-subheader/WalletPageSubheader"
import useStateUpdate from "hooks/useStateUpdate"
import useWalletPageState, { WalletNavigationView } from "./useWalletPageState"

export default function WalletPage() {
    const [state, setState] = useWalletPageState()
    const updateState = useStateUpdate(setState)

    return (
        <>
            <WalletPageSubheader state={state} onChange={updateState} />

            {!state.wallet && (
                <EmptyText align="center" padding="md">
                    Enter your Wallet address to view game analytics and transfers
                </EmptyText>
            )}

            {state.wallet && (
                <>
                    {state.view === WalletNavigationView.GAMEPLAY && (
                        <WalletDetails wallet={state.wallet} />
                    )}
                    {state.view === WalletNavigationView.ANALYTICS && (
                        <WalletAnalytics wallet={state.wallet} />
                    )}
                </>
            )}
        </>
    )
}
