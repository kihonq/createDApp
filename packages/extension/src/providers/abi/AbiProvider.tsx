import { createContext, JSXElement, createMemo } from 'solid-js'

import { useStorage } from '../../hooks'

import { AbiEntry, toAbiEntries } from './AbiEntry'
import { AbiParser } from './AbiParser'
import { DEFAULT_ABIS } from './defaultAbis'

export interface AbiContextValue {
  userAbis: AbiEntry[]
  setUserAbis: (entries: AbiEntry[]) => void
  parser: AbiParser
}

export const AbiContext = createContext<AbiContextValue>({
  userAbis: [],
  setUserAbis: () => undefined,
  parser: new AbiParser([]),
})

export const DEFAULT_ENTRIES = toAbiEntries(DEFAULT_ABIS)

interface Props {
  children: JSXElement
}

export const AbiProvider = ({ children }: Props) => {
  const [userAbis = [], setUserAbis] = useStorage<AbiEntry[]>('userAbis')
  const value = createMemo(() => ({
    userAbis,
    setUserAbis,
    parser: new AbiParser([...userAbis, ...DEFAULT_ENTRIES].reverse()),
  }))

  return <AbiContext.Provider value={value()} children={children} />
}
