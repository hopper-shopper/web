import EmptyText from "components/typography/empty-text/EmptyText"
import WalletAnalytics from "components/wallet/wallet-analytics/WalletAnalytics"
import WalletDetails from "components/wallet/wallet-details/WalletDetails"
import { WalletNavigationView } from "components/wallet/wallet-page-subheader/wallet-navigation-content/WalletNavigationContent"
import WalletPageSubheader from "components/wallet/wallet-page-subheader/WalletPageSubheader"
import useWalletPageState, { WalletPageState } from "./useWalletPageState"

export default function WalletPage() {
    const [state, setState] = useWalletPageState()

    const updateState = (update: Partial<WalletPageState>) => {
        setState(prev => ({
            ...prev,
            ...update,
        }))
    }

    return (
        <>
            <WalletPageSubheader
                wallet={state.wallet}
                onChange={wallet => updateState({ wallet })}
                view={state.view}
                onViewChange={view => updateState({ view })}
            />

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
