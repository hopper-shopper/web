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
        light: "(prefers-color-scheme: light)",
        dark: "(prefers-color-scheme: dark)",
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
        mx: (margin: PropertyValue<"marginLeft">) => ({
            marginLeft: margin,
            marginRight: margin,
        }),
        my: (margin: PropertyValue<"marginTop">) => ({
            marginTop: margin,
            marginBottom: margin,
        }),
        mt: (margin: PropertyValue<"marginTop">) => ({
            marginTop: margin,
        }),
        mb: (margin: PropertyValue<"marginBottom">) => ({
            marginBottom: margin,
        }),
        rr: (radius: PropertyValue<"borderRadius">) => ({
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
        }),
        rl: (radius: PropertyValue<"borderRadius">) => ({
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
        }),
    },
})

export const darkTheme = createTheme({
    colors: {
        ...grayDark,
        ...tealDark,
        ...redDark,
        ...blueDark,
        ...yellowDark,
    },
})

export type ThemeCSS = CSS<typeof config>
export type ColorScheme = "light" | "dark" | "system"

export function getPreferredColorScheme(): Extract<ColorScheme, "light" | "dark"> {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
    }
    return "light"
}

export const globalStyles = globalCss({
    body: {
        backgroundColor: "$gray1",
    },
})
