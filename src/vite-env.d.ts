/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COMPARE_API_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
