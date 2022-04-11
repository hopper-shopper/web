import { WalletAddress } from "models/User"

export function formatWalletAddress(address: WalletAddress): string {
    if (address === "") {
        return "-"
    }

    const startChars = address.substring(0, 5)
    const endChars = address.substring(address.length - 5)

    return `${startChars.toUpperCase()}...${endChars.toUpperCase()}`
}
