import { GroupByFn, PrimitiveGroupByKey } from "grouping/_common"
import { useMemo } from "react"

type UseGroupsReturn<K extends PrimitiveGroupByKey, T> = Map<K, T[]>

export default function useGroups<K extends PrimitiveGroupByKey, T>(
    collection: T[],
    groupBy: GroupByFn<K, T>,
): UseGroupsReturn<K, T> {
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
