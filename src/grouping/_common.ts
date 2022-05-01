import { format } from "date-fns/fp"

export type PrimitiveGroupByKey = string | number | boolean
export type GroupByFn<K extends PrimitiveGroupByKey, T> = (item: T) => K

export const groupByDayKeyGenerator = format("yyyy-MM-dd")
