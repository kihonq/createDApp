import { createEffect, createSignal } from 'solid-js'
import { useBlockNumber } from '@createdapp/core'

import { getCoingeckoPrice } from './simple_price'
import { getCoingeckoTokenPrice } from './simple_token_price'

export const useCoingeckoPrice = (base: string, quote = 'usd') => {
  const [price, setPrice] = createSignal<string>()
  const blockNo = useBlockNumber()

  createEffect(async (prevBlockNo) => {
    if (!blockNo || prevBlockNo !== blockNo) {
      const tokenPrice = await getCoingeckoPrice(base, quote)
      setPrice(tokenPrice)
    }

    return blockNo
  }, blockNo)

  return price()
}

export const useCoingeckoTokenPrice = (contract: string, quote = 'usd', platform = 'ethereum') => {
  const [price, setPrice] = createSignal<string>()
  const blockNo = useBlockNumber()

  createEffect(async (prevBlockNo) => {
    if (!blockNo || prevBlockNo !== blockNo) {
      const tokenPrice = await getCoingeckoTokenPrice(contract, quote, platform)
      setPrice(tokenPrice)
    }

    return blockNo
  }, blockNo)

  return price()
}
