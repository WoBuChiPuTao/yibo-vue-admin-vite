/// <reference types="vite/client" />

// images
declare module '*.jpg' {
  const src: string
}
declare module '*.jpeg' {
  const src: string
}
declare module '*.png' {
  const src: string
}

declare interface ViteEnv {
  VITE_APP_TITLE: string
  VITE_APP_SHORT_TITLE: string
  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
}
