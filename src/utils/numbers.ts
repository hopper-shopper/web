export function clamp(min: number, max: number, value: number): number {
    return Math.min(max, Math.max(min, value))
}

export function normalize(min: number, max: number, value: number, base = 10): number {
    if (value >= min && value <= max) {
        return value
    }

    let normalized = value
    while (normalized > max) {
        normalized /= base
    }

    return normalized
}

export function parseIntFromString(fromValue: string | undefined | null, fallback: number): number {
    if (!fromValue) {
        return fallback
    }

    const parsed = parseInt(fromValue)
    return Number.isNaN(parsed) ? fallback : parsed
}
