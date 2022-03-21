import { useEffect } from "react"
import { lightTheme, darkTheme } from "theme"

export default function useApplyDarkMode() {
    useEffect(() => {
        document.documentElement.classList.add(darkTheme)
        document.documentElement.classList.remove(lightTheme)
    }, [])
}
