import { Hopper } from "models/Hopper"
import { Adventure, getEarningsByAdventure, getIdealAdventure } from "utils/adventures"
import { calculateLevelUpCosts } from "utils/level"
import { clamp } from "utils/numbers"

type UnixTimestampMs = number

export default class HopperRoiCalculator {
    public readonly hopper: Hopper
    private adventure: Adventure

    private timestamp: UnixTimestampMs

    /**
     * Level-Up timestamp -> Level after Level-Up
     */
    private levelUpHistory: Map<UnixTimestampMs, number>

    private currentLevel: number
    private currentLevelFlyGeneration: number

    /**
     * Generated FLY for sale (excluding level costs)
     */
    private stash: number

    constructor(hopper: Hopper, startAtLevel?: number) {
        this.hopper = hopper
        this.adventure = getIdealAdventure(hopper)
        this.currentLevel = startAtLevel ? clamp(1, 100, startAtLevel) : hopper.level
        this.levelUpHistory = new Map()
        this.currentLevelFlyGeneration = 0
        this.timestamp = new Date().getTime()
        this.stash = 0
    }

    forAdventure(adventure: Adventure) {
        this.adventure = adventure
        return this
    }

    private getDailyFlyGeneration(): number {
        return getEarningsByAdventure(this.adventure, {
            ...this.hopper,
            level: this.currentLevel,
        })
    }

    private getHourlyFlyGeneration(): number {
        return this.getDailyFlyGeneration() / 24
    }

    private getFlyCap(): number {
        const levelUpCosts = calculateLevelUpCosts(this.currentLevel - 1, this.currentLevel)
        return levelUpCosts * 3
    }

    private levelUp() {
        if (this.currentLevel === 100) {
            this.currentLevel = 1
        }

        const levelUpCostsFly = calculateLevelUpCosts(this.currentLevel, this.currentLevel + 1)

        this.currentLevel++
        this.levelUpHistory.set(this.timestamp, this.currentLevel)
        this.stash += this.currentLevelFlyGeneration - levelUpCostsFly
        this.currentLevelFlyGeneration = 0
    }

    /**
     * Advance to next hopper FLY generation cap
     * @returns Hours required to reach cap
     */
    advance(): number {
        const cap = this.getFlyCap()
        let hoursUsed = 0

        while (cap >= this.currentLevelFlyGeneration) {
            this.advanceByHour()
            hoursUsed += 1
        }

        this.levelUp()

        return hoursUsed
    }

    private advanceByHour() {
        const hourlyFlyGeneration = this.getHourlyFlyGeneration()

        if (hourlyFlyGeneration === 0) {
            throw new Error(`seems like hopper cannot enter adventure ${this.adventure}`)
        }

        this.currentLevelFlyGeneration += hourlyFlyGeneration
        this.timestamp += 3600 * 1000
    }

    breakEvenReached(flyRequired: number): boolean {
        return this.stash >= flyRequired
    }

    calculateRoiInDays(hopperCostInFly: number): number {
        let dayPointer = 0

        while (!this.breakEvenReached(hopperCostInFly)) {
            try {
                const hoursUsed = this.advance()
                const days = hoursUsed / 24
                dayPointer += days
            } catch (error) {
                throw HopperRoiCalculatorError.CANNOT_ENTER
            }

            if (dayPointer > 1000) {
                throw HopperRoiCalculatorError.NO_ROI
            }
        }

        return dayPointer
    }
}

export enum HopperRoiCalculatorError {
    BOUGHT_ZERO = "BOUGHT_ZERO",
    NO_ROI = "NO_ROI",
    CANNOT_ENTER = "CANNOT_ENTER",
}
