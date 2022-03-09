import { createEffect, JSXElement, onCleanup } from 'solid-js'

import { useEthers, useDebounce, useReducer } from '../../hooks'

import { BlockNumberContext } from './context'
import { blockNumberReducer } from './reducer'

interface Props {
  children: JSXElement
}

export const BlockNumberProvider = (props: Props) => {
  const { library, chainId } = useEthers()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  createEffect(() => {
    if (library && chainId !== undefined) {
      const update = (blockNumber: number) => dispatch({ chainId, blockNumber })
      library.on('block', update)
      onCleanup(() => {
        library.off('block', update)
      })
    }
  })

  const debouncedState = useDebounce(state, 100)
  const blockNumber = () => chainId !== undefined ? debouncedState()[chainId] : undefined

  return <BlockNumberContext.Provider value={blockNumber()} children={props.children} />
}
