export function clamp(min: number, max: number, value: number): number {
    return Math.min(max, Math.max(min, value))
}

export function parseIntFromString(fromValue: string | undefined | null, fallback: number): number {
    if (!fromValue) {
        return fallback
    }

    const parsed = parseInt(fromValue)
    return Number.isNaN(parsed) ? fallback : parsed
}

export function round(value: number, decimals: number): number {
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}

export function avg(values: number[]): number {
    return values.reduce((acc, cur) => acc + cur, 0) / values.length
}

export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
