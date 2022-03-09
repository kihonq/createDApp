import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js'

// modified from https://usehooks.com/useDebounce/
export const useDebouncePair = <T, U>(first: T, second: U, delay: number): Accessor<[T, U]> => {
  const [debouncedValue, setDebouncedValue] = createSignal<[T, U]>([first, second])

  createEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue([first, second])
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
