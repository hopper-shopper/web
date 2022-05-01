import { ComponentProps } from "@stitches/react"

export type OmitOwnProps<Component, OwnProps> = Omit<ComponentProps<Component>, keyof OwnProps> &
    OwnProps
