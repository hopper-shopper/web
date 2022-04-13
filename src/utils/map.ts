type MapInit<K, V> = Array<readonly [K, V]>
export function createLookupMap<K, V>(from: MapInit<K, V>): Map<K | V, V & K> {
    const map = new Map()

    for (const [key, value] of from) {
        map.set(key, value)
        map.set(value, key)
    }

    return map
}
