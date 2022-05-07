import { ComponentProps } from "@stitches/react"

export type OmitOwnProps<Component, OwnProps> = Omit<ComponentProps<Component>, keyof OwnProps> &
    OwnProps

/**
 * Represents a date without time
 * @format YYYY-MM-DD
 */
export type IsoDate = string
/**
 * Represents a date with time
 * * @format ISO-8601 / RFC-3339
 */
export type IsoDatetime = string

export type ObjectKey = string | number | symbol
