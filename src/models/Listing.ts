import { HopperId } from "./Hopper"
import { WalletAddress } from "./User"

export type Listing = {
    id: string
    buyer: WalletAddress
    seller: WalletAddress
    price: number
    sold: boolean
    enabled: boolean
    timestamp: string // ISO-Date
    tokenId: HopperId
}
