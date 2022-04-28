import EmptyText from "components/typography/empty-text/EmptyText"
import WalletDetails from "components/wallet/wallet-details/WalletDetails"
import WalletPageSubheader from "components/wallet/wallet-page-subheader/WalletPageSubheader"
import useWalletPageState from "./useWalletPageState"

export default function WalletPage() {
    const [state, setState] = useWalletPageState()

    return (
        <>
            <WalletPageSubheader wallet={state.wallet} onChange={wallet => setState({ wallet })} />

            {!state.wallet && (
                <EmptyText align="center" padding="md">
                    Enter your Wallet address to view game analytics and transfers
                </EmptyText>
            )}
            {state.wallet && <WalletDetails wallet={state.wallet} />}
        </>
    )
}
