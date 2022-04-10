import { format } from "date-fns/fp"

export type PrimitiveGroupByKey = string | number | boolean
export type GroupByFn<T, K extends PrimitiveGroupByKey = string> = (item: T) => K

export const groupByDayKeyGenerator = format("yyyy-MM-dd")
