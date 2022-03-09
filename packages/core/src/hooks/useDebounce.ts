import { createEffect, onCleanup, createSignal, Accessor } from 'solid-js'

// modified from https://usehooks.com/useDebounce/
export const useDebounce = <T>(value: T, delay: number): Accessor<T> => {
  const [debouncedValue, setDebouncedValue] = createSignal<T>(value)

  createEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(() => value)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    onCleanup(() => {
      clearTimeout(handler)
    })
  })

  return debouncedValue
}
