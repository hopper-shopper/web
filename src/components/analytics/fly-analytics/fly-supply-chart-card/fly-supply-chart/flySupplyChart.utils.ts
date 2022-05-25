import {
    brown,
    brownDark,
    pink,
    pinkDark,
    red,
    redDark,
    violet,
    violetDark,
    yellow,
    yellowDark,
} from "@radix-ui/colors"
import { FlySupplyChartData } from "./useFlySupplyChartData"

// Types
export enum FlySupplyFeature {
    BURNED,
    CIRCULATING,
    STAKED,
    FREE,
}

// Constants
export const FLY_FEATURE_TO_KEY: Record<FlySupplyFeature, keyof FlySupplyChartData> = {
    [FlySupplyFeature.BURNED]: "burned",
    [FlySupplyFeature.CIRCULATING]: "circulating",
    [FlySupplyFeature.STAKED]: "staked",
    [FlySupplyFeature.FREE]: "free",
}

export const SUPPLY_CHARTS_COLORS_LIGHT: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.BURNED]: brown.brown9,
    [FlySupplyFeature.STAKED]: yellow.yellow9,
    [FlySupplyFeature.CIRCULATING]: pink.pink9,
    [FlySupplyFeature.FREE]: violet.violet9,
}
export const SUPPLY_CHARTS_COLORS_DARK: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.BURNED]: brownDark.brown9,
    [FlySupplyFeature.STAKED]: yellowDark.yellow9,
    [FlySupplyFeature.CIRCULATING]: pinkDark.pink9,
    [FlySupplyFeature.FREE]: violetDark.violet9,
}

const featureTextMapping: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.BURNED]: "Burned",
    [FlySupplyFeature.STAKED]: "Staked",
    [FlySupplyFeature.CIRCULATING]: "Circulating",
    [FlySupplyFeature.FREE]: "Free",
}
export function formatFlyChartFeature(feature: FlySupplyFeature): string {
    return featureTextMapping[feature]
}

const featureTextMappingLong: Record<FlySupplyFeature, string> = {
    ...featureTextMapping,
    [FlySupplyFeature.FREE]: "Free (Circulating - Staked)",
}
export function formatFlyChartFeatureLong(feature: FlySupplyFeature): string {
    return featureTextMappingLong[feature]
}
