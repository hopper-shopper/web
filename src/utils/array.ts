export function toggleItem<T>(list: T[], item: T, include: boolean): T[] {
    const current = new Set(list)

    if (include) {
        current.add(item)
    } else {
        current.delete(item)
    }

    return Array.from(current)
}
