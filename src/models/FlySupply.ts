import { IsoDate } from "utils/types"

export type FlySupply = {
    date: IsoDate
    /**
     * Total supply
     */
    supply: number
    burned: number
    /**
     * Total staked
     */
    staked: number
    /**
     * Total supply - burned
     */
    available: number
    /**
     * Total supply - burned - staked
     */
    free: number
}
