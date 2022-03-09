import { createEffect, createSignal } from 'solid-js'
import { TokenInfo } from '@uniswap/token-lists'

import { ChainId } from '../constants'

import { useEthers } from './useEthers'

interface TokenList {
  name: string
  logoURI: string
  tokens: TokenInfo[]
}

export const useTokenList = (tokenListURI: string, overrideChainId?: ChainId, tags?: string[]) => {
  const { chainId: providerChainId } = useEthers()
  const [tokenList, setTokenList] = createSignal<TokenList>()

  const chainId = overrideChainId || providerChainId

  createEffect(() => {
    fetch(tokenListURI)
      .then(async (response) => {
        if (response.ok) {
          const { name, logoURI, tokens } = await response.json()
          setTokenList({
            name,
            logoURI,
            tokens: (tokens as TokenInfo[]).filter((token) => {
              const sameChainId = token.chainId === chainId
              if (!tags) {
                return sameChainId
              }
              return sameChainId && token.tags && token.tags.some((tag) => tags.includes(tag))
            }),
          })
        } else {
          const errorMessage = await response.text()
          return Promise.reject(new Error(errorMessage))
        }
      })
      .catch((err) => {
        console.log(err)
        setTokenList(undefined)
      })
  })

  return tokenList
}
