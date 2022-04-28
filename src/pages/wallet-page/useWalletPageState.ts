import { WalletNavigationView } from "components/wallet/wallet-page-subheader/wallet-navigation-content/WalletNavigationContent"
import { WalletAddress } from "models/User"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useMount } from "react-use"
import { createLookupMap } from "utils/map"

export default function useWalletPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(deriveStateFromSearchParams(searchParams))

    useMount(() => {
        setState(deriveStateFromSearchParams(searchParams))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Types
export type WalletPageState = {
    wallet: WalletAddress
    view: WalletNavigationView
}

// Constants
const WALLET_KEY = "wallet"
const VIEW_KEY = "view"

const INITIAL_STATE: WalletPageState = {
    wallet: "",
    view: WalletNavigationView.GAMEPLAY,
}

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): WalletPageState {
    const walletAddress = searchParams.get(WALLET_KEY)
    const view = searchParams.has(VIEW_KEY)
        ? parseView(searchParams.get(VIEW_KEY)!)
        : INITIAL_STATE.view

    return {
        wallet: walletAddress ?? INITIAL_STATE.wallet,
        view,
    }
}

function deriveSearchParamsFromState(state: WalletPageState): URLSearchParams {
    const params = new URLSearchParams()

    if (state.wallet) {
        params.set(WALLET_KEY, state.wallet)
    }
    params.set(VIEW_KEY, urlifyView(state.view))

    return params
}

// Parse / Urlify

const viewMapping = createLookupMap([
    [WalletNavigationView.GAMEPLAY, "gameplay"],
    [WalletNavigationView.ANALYTICS, "analytics"],
])
function urlifyView(view: WalletNavigationView): string {
    return viewMapping.get(view) ?? "gameplay"
}
function parseView(view: string): WalletNavigationView {
    return viewMapping.get(view) ?? INITIAL_STATE.view
}
