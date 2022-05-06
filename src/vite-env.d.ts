/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string
    readonly VITE_GAS_COLLECTOR_ENDPOINT: string
    readonly VITE_SENTRY_DSN: string
    readonly VITE_MAINTENANCE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface Window {
    plausible: (goal: string) => void
}
