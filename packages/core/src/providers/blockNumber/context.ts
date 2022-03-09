import { createContext, useContext } from 'solid-js'

export const BlockNumberContext = createContext<number | undefined>(undefined)

export function useBlockNumber() {
  return useContext(BlockNumberContext)
}
