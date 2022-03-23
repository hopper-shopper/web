import { gray, grayDark, blue, blueDark, teal, tealDark, red, redDark } from "@radix-ui/colors"
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
            ...blue,
        },
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
