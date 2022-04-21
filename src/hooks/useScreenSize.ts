import { useMedia } from "react-use"
import { Screens } from "theme"

export default function useScreenSize(screen: keyof typeof Screens) {
    return useMedia(`(min-width: ${Screens[screen]}px)`)
}
