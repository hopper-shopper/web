import { GroupByFn, PrimitiveGroupByKey } from "grouping/_common"
import { useMemo } from "react"

type UseGroupsReturn<T, K extends PrimitiveGroupByKey> = Map<K, T[]>

export default function useGroups<T, K extends PrimitiveGroupByKey = string>(
    collection: T[],
    groupBy: GroupByFn<T, K>,
): UseGroupsReturn<T, K> {
    const groups = useMemo(() => {
        const mapper = new Map<K, T[]>()

        for (const item of collection) {
            const key = groupBy(item)
            const current = mapper.get(key) || []

            mapper.set(key, [...current, item])
        }

        return mapper
    }, [collection, groupBy])

    return groups
}
