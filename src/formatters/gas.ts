export function formatGwei(gwei: number): string {
    const formattedGwei = Math.ceil(gwei)
    return `${formattedGwei} GWEI`
}
