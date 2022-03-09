import { createMemo } from 'solid-js'

import { ChainId } from '../constants'
import { getChainMeta } from '../helpers/getChainMeta'

export function useChainMeta(chainId: ChainId) {
  const accessor = createMemo(() => getChainMeta(chainId), [chainId])

  return accessor
}
