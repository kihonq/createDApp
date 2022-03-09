import { createEffect, createSignal } from 'solid-js'

const getItem = (key: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  const item = window.localStorage.getItem(key)
  if (item !== null) {
    try {
      return JSON.parse(item)
    } catch {
      // ignore error
    }
  }
}

const setItem = (key: string, value: any) => {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export const useLocalStorage = (key: string) => {
  const [value, setValue] = createSignal(getItem(key))

  createEffect(() => {
    setValue(getItem(key))
  })

  createEffect(() => {
    setItem(key, value())
  })

  return [value, setValue] as const
}
