import { createEffect, onCleanup } from 'solid-js'

export const useInterval = (callback: () => void, delay: number | null) =>
  createEffect(() => {
    if (delay === null) {
      return
    }

    const id = setInterval(() => callback(), delay)

    onCleanup(() => clearInterval(id))
  })
