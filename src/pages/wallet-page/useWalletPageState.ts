import useLocationEffect from "hooks/useLocationEffect"
import { WalletAddress } from "models/User"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function useWalletPageState() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState(deriveStateFromSearchParams(searchParams))

    useLocationEffect("search", search => {
        const params = new URLSearchParams(search)
        setState(deriveStateFromSearchParams(params))
    })

    useEffect(() => {
        setSearchParams(deriveSearchParamsFromState(state), { replace: true })
    }, [state])

    return [state, setState] as const
}

// Types
export type WalletPageState = {
    wallet: WalletAddress
}

// Constants
const WALLET_KEY = "wallet"

const INITIAL_STATE: WalletPageState = {
    wallet: "",
}

// State update functions

function deriveStateFromSearchParams(searchParams: URLSearchParams): WalletPageState {
    const walletAddress = searchParams.get(WALLET_KEY)

    return {
        wallet: walletAddress ?? INITIAL_STATE.wallet,
    }
}

function deriveSearchParamsFromState(state: WalletPageState): URLSearchParams {
    const params = new URLSearchParams()

    if (state.wallet) {
        params.set(WALLET_KEY, state.wallet)
    }

    return params
}
