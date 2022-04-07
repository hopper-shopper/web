import { Currency } from "formatters/currency"
import createStore from "zustand"

export type SettingsStore = {
    currency: Currency
    setCurrency: (currency: Currency) => void
}

const DEFAULT_STORE: SettingsStore = {
    currency: Currency.USD, // TODO Set from user agent etc
    setCurrency: () => {},
}

export default createStore<SettingsStore>(set => ({
    ...DEFAULT_STORE,
    setCurrency: currency => set({ currency }),
}))
