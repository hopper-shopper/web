import { IsoDate } from "utils/types"

export type FlySupply = {
    date: IsoDate
    minted: number
    burned: number
    circulating: number
    /**
     * Total staked
     */
    staked: number
    /**
     * Total supply - burned - staked
     */
    free: number
}
