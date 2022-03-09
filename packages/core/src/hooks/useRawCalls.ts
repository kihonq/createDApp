import { Accessor, createEffect, createMemo, onCleanup } from 'solid-js'

import { RawCallResult, useChainState } from '../providers'
import { RawCall } from '../providers'
import { Falsy } from '../model/types'

export const useRawCalls = (calls: (RawCall | Falsy)[]): Accessor<RawCallResult[]> => {
  const { dispatchCalls, value } = useChainState()

  createEffect(() => {
    const filteredCalls = calls.filter(Boolean) as RawCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    onCleanup(() => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls }))
  })

  const result = createMemo(() =>
    calls.map((call) => {
      if (call && value) {
        return value.state?.[call.address]?.[call.data]
      }
    })
  )

  return result
}

export const useRawCall = (call: RawCall | Falsy) => useRawCalls([call])()[0]
