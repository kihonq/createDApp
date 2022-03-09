import { createEffect, createSignal, onCleanup } from 'solid-js'

import { useEthers } from './useEthers'

export function useLookupAddress() {
  const { account, library } = useEthers()
  const [ens, setEns] = createSignal<string | null>()

  createEffect(() => {
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
