import { WalletAddress } from "models/User"
import { Adventure } from "utils/adventures"

export type UserCapFilter = {
    adventure: Adventure
    user: WalletAddress
}

export type UserEarningsFilter = {
    adventure: Adventure
    user: WalletAddress
}
