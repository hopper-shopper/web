import {
    gray,
    grayDark,
    blue,
    blueDark,
    teal,
    tealDark,
    red,
    redDark,
    blackA,
    yellow,
    yellowDark,
} from "@radix-ui/colors"
import { createStitches, CSS, PropertyValue } from "@stitches/react"

export const Screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const

export const {
    createTheme,
    css,
    globalCss,
    keyframes,
    styled,
    config,
    theme: lightTheme,
} = createStitches({
    theme: {
        colors: {
            ...gray,
            ...teal,
            ...red,
            ...blue,
            ...yellow,
            ...blackA,
        },
        radii: {
            sm: "0.25rem",
            md: "0.5rem",
        },
    },
    media: {
        sm: `(min-width: ${Screens.sm}px)`,
        md: `(min-width: ${Screens.md}px)`,
        lg: `(min-width: ${Screens.lg}px)`,
        xl: `(min-width: ${Screens.xl}px)`,
    },
    utils: {
        size: (size: PropertyValue<"width">) => ({
            width: size,
            height: size,
        }),
        px: (padding: PropertyValue<"paddingLeft">) => ({
            paddingLeft: padding,
            paddingRight: padding,
        }),
        py: (padding: PropertyValue<"paddingTop">) => ({
            paddingTop: padding,
            paddingBottom: padding,
        }),
    },
})

export type ThemeCSS = CSS<typeof config>

export const darkTheme = createTheme({
    colors: {
        ...grayDark,
        ...tealDark,
        ...redDark,
        ...blueDark,
        ...yellowDark,
    },
})
