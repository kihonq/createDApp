import { createContext, JSXElement, createMemo } from 'solid-js'

import type { Dispatch, SetStateAction } from '../../hooks/useReducer'
import { useStorage } from '../../hooks'

export interface NameTag {
  address: string
  name: string
}

export interface NameTagsContextValue {
  nameTags: NameTag[]
  setNameTags: Dispatch<SetStateAction<NameTag[] | undefined>>
  getNameTag: (address: string) => string | undefined
}

export const NameTagsContext = createContext<NameTagsContextValue>({
  nameTags: [],
  setNameTags: () => undefined,
  getNameTag: () => undefined,
})

interface Props {
  children: JSXElement
}

export const NameTagsProvider = ({ children }: Props) => {
  const [nameTags = [], setNameTags] = useStorage<NameTag[]>('nameTags')
  const value = createMemo(() => {
    const map = new Map(nameTags.map((tag) => [tag.address.toLowerCase(), tag.name]))

    return {
      nameTags,
      setNameTags,
      getNameTag: (address: string) => map.get(address.toLowerCase()),
    }
  })

  return <NameTagsContext.Provider value={value()} children={children} />
}
