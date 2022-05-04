import { useAtomValue } from "jotai"
import { themeAtom } from "stores/theme"
import { getPreferredColorScheme } from "theme"

export default function useThemeValue<T>(light: T, dark: T) {
    const theme = useAtomValue(themeAtom)

    switch (theme) {
        case "system":
            return getPreferredColorScheme() === "light" ? light : dark
        case "light":
            return light
        case "dark":
            return dark
    }
}
