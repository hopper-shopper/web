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
    TOTAL_SUPPLY,
    BURNED,
    STAKED,
    FREE,
    AVAILABLE,
}

// Constants
export const FLY_FEATURE_TO_KEY: Record<FlySupplyFeature, keyof FlySupplyChartData> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: "total",
    [FlySupplyFeature.BURNED]: "burned",
    [FlySupplyFeature.STAKED]: "staked",
    [FlySupplyFeature.AVAILABLE]: "available",
    [FlySupplyFeature.FREE]: "free",
}

export const SUPPLY_CHARTS_COLORS_LIGHT: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: red.red9,
    [FlySupplyFeature.BURNED]: brown.brown9,
    [FlySupplyFeature.STAKED]: yellow.yellow9,
    [FlySupplyFeature.AVAILABLE]: pink.pink9,
    [FlySupplyFeature.FREE]: violet.violet9,
}
export const SUPPLY_CHARTS_COLORS_DARK: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: redDark.red9,
    [FlySupplyFeature.BURNED]: brownDark.brown9,
    [FlySupplyFeature.STAKED]: yellowDark.yellow9,
    [FlySupplyFeature.AVAILABLE]: pinkDark.pink9,
    [FlySupplyFeature.FREE]: violetDark.violet9,
}

const featureTextMapping: Record<FlySupplyFeature, string> = {
    [FlySupplyFeature.TOTAL_SUPPLY]: "Total",
    [FlySupplyFeature.BURNED]: "Burned",
    [FlySupplyFeature.STAKED]: "Staked",
    [FlySupplyFeature.AVAILABLE]: "Available",
    [FlySupplyFeature.FREE]: "Free",
}
export function formatFlyChartFeature(feature: FlySupplyFeature): string {
    return featureTextMapping[feature]
}

const featureTextMappingLong: Record<FlySupplyFeature, string> = {
    ...featureTextMapping,
    [FlySupplyFeature.AVAILABLE]: "Available (Supply - Burned)",
    [FlySupplyFeature.FREE]: "Free (Available - Staked)",
}
export function formatFlyChartFeatureLong(feature: FlySupplyFeature): string {
    return featureTextMappingLong[feature]
}
