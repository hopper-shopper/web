import { ComponentProps } from "@stitches/react"

export type OmitOwnProps<Component, OwnProps> = Omit<ComponentProps<Component>, keyof OwnProps> &
    OwnProps

export type IsoDate = string // YYYY-MM-DD
export type IsoDatetime = string
