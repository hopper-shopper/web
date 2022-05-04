import { atomWithStorage } from "jotai/utils"
import { ColorScheme } from "theme"
import { getStorageKey } from "utils/stores"

const THEME_LS = getStorageKey("theme")

export const themeAtom = atomWithStorage<ColorScheme>(THEME_LS, "system")
