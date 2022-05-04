/**
 * Toggle an item in an array.
 * Because this function uses a set internally only unique array values work properly
 * @param list
 * @param item
 * @param value
 * @returns
 */
export function toggleItem<T>(list: T[], item: T, value: boolean): T[] {
    const current = new Set(list)

    if (value) {
        current.add(item)
    } else {
        current.delete(item)
    }

    return Array.from(current)
}
