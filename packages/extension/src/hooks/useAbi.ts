import { useContext } from 'solid-js'
import { AbiContext } from '../providers/abi/AbiProvider'

export function useUserAbis() {
  const { userAbis, setUserAbis } = useContext(AbiContext)
  return [userAbis, setUserAbis] as const
}

export function useAbiParser(selector: string) {
  return useContext(AbiContext).parser.get(selector)
}
