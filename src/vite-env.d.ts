/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string
    readonly VITE_GAS_COLLECTOR_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
