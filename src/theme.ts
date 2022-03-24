import { gray, grayDark, blue, blueDark, teal, tealDark, red, redDark } from "@radix-ui/colors"
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
