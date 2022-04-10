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
} from "@radix-ui/colors"
import { createStitches, CSS, PropertyValue } from "@stitches/react"

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
            ...blackA,
        },
        radii: {
            sm: "0.25rem",
            md: "0.5rem",
        },
    },
    utils: {
        size: (size: PropertyValue<"width">) => ({
            width: size,
            height: size,
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
    },
})
