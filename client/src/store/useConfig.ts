import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Style } from '@/components/theme/styles'
import { Theme } from '@/components/theme/themes'

type Config = {
  style: Style['name']
  theme: Theme['name']
  radius: number
  system: boolean
  threshold: number
  direction: 'ltr' | 'rtl'
  mode: 'light' | 'dark' | 'system'
  blogTheme: 'tailwind' | 'typography'
  blogList: 'grid' | 'list'
  search: object[]
}

export const init_config: Config = {
  style: 'new-york',
  theme: 'blue',
  mode: 'light',
  radius: 0.5,
  threshold: 20,
  system: true,
  direction: 'ltr',
  blogTheme: 'tailwind',
  blogList: 'list',
  search: []
}

const configAtom = atomWithStorage<Config>('config', {
  ...init_config,
})

export function useConfig() {
  return useAtom(configAtom)
}
