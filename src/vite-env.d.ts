/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string
    readonly VITE_GAS_COLLECTOR_ENDPOINT: string
    readonly VITE_SENTRY_DSN: string
    readonly VITE_CREATOR_WALLET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
