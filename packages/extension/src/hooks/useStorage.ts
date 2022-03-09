/* global chrome */
import { createEffect, createSignal, onCleanup } from 'solid-js'

export const useStorage = <T>(key: string) => {
  const [state, setState] = createSignal<T | undefined>(undefined)

  createEffect(() => {
    setState(undefined)
    if (window.chrome?.storage) {
      let cancelled = false
      chrome.storage.local.get([key], function (result) {
        if (!cancelled) {
          setState(result[key])
        }
      })

      onCleanup(() => {
        cancelled = true
      })
    } else {
      const value = localStorage.getItem(key)
      if (value === null) {
        setState(undefined)
      } else {
        setState(JSON.parse(value))
      }
    }
  })

  createEffect(() => {
    if (state === undefined) {
      return
    }

    if (window.chrome?.storage) {
      chrome.storage.local.set({ [key]: state })
    } else {
      localStorage.setItem(key, JSON.stringify(state))
    }
  })

  return [state(), setState] as const
}
