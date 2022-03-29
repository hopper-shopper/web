import { FilterFn } from "filters/_common"
import { useMemo } from "react"

export type UseFilterPipeline<T> = FilterFn<T>[] | FilterFn<T>

export default function useFilter<T>(pipeline: UseFilterPipeline<T>, collection: T[]): T[] {
    const pipelineList = Array.isArray(pipeline) ? pipeline : [pipeline]
    const signature = pipelineList.map(pipeline => pipeline.toString())

    return useMemo(() => {
        if (collection.length === 0) {
            return []
        }
        let filtered: T[] = [...collection]

        for (const pipeline of pipelineList) {
            filtered = pipeline(filtered)
        }

        return filtered
    }, [signature, collection])
}
