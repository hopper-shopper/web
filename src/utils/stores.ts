export function getStorageKey(name: string): string {
    if (name.startsWith(".")) {
        name = name.substring(1)
    }

    return `hoppershopper.${name}`
}
