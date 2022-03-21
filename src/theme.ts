import { gray, grayDark, grass, grassDark, teal, tealDark, red, redDark } from "@radix-ui/colors"
import { createStitches, CSS } from "@stitches/react"

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
        },
    },
})

export type ThemeCSS = CSS<typeof config>

export const darkTheme = createTheme({
    colors: {
        ...grayDark,
        ...tealDark,
        ...redDark,
    },
})
