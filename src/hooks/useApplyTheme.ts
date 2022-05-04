import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { themeAtom } from "stores/theme"
import { darkTheme, getPreferredColorScheme, lightTheme } from "theme"

export default function useApplyTheme() {
    const theme = useAtomValue(themeAtom)

    useEffect(() => {
        if (theme === "system") {
            if (!window.matchMedia) {
                return
            }

            applyPreferredColorTheme()

            const matcher = window.matchMedia("(prefers-color-scheme: dark)")

            try {
                // Chrome & Firefox
                matcher.addEventListener("change", () => {
                    applyPreferredColorTheme()
                })
            } catch (outerError) {
                try {
                    // Safari
                    matcher.addListener(() => {
                        applyPreferredColorTheme()
                    })
                } catch (innerError) {
                    console.error(innerError)
                }
            }
        } else if (theme === "light") {
            applyLightTheme()
        } else if (theme === "dark") {
            applyDarkTheme()
        }
    }, [theme])
}

function applyPreferredColorTheme() {
    const preferredScheme = getPreferredColorScheme()

    if (preferredScheme === "light") {
        applyLightTheme()
    } else {
        applyDarkTheme()
    }
}
function applyLightTheme() {
    document.documentElement.classList.add(lightTheme)
    document.documentElement.classList.remove(darkTheme)
}
function applyDarkTheme() {
    document.documentElement.classList.add(darkTheme)
    document.documentElement.classList.remove(lightTheme)
}
