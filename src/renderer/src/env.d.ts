import type { BambooApi } from '@shared/types'

declare global {
  interface Window {
    bamboo: BambooApi
  }
}

export {}
