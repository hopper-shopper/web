import { WalletAddress } from "models/User"
import isEthereumAddress from "validator/es/lib/isEthereumAddress"

export function isValidWalletAddress(wallet: WalletAddress | string): boolean {
    if (!wallet) {
        return false
    }

    if (!isEthereumAddress(wallet)) {
        return false
    }

    return true
}
