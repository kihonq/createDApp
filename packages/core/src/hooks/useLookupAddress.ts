import { createEffect, createSignal, onCleanup } from 'solid-js'

import { useEthers } from './useEthers'

export function useLookupAddress() {
  const [ethersState] = useEthers()
  const [ens, setEns] = createSignal<string | null>()

  createEffect(() => {
    const account = ethersState.account
    const library = ethersState.library
    let mounted = true

    if (account && library) {
      library
        ?.lookupAddress(account)
        .then((name) => {
          if (mounted) {
            setEns(name)
          }
        })
        .catch(() => setEns(null))
    }

    onCleanup(() => {
      mounted = false
    })
  })

  return ens
}
