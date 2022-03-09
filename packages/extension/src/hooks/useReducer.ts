import { createStore, reconcile } from 'solid-js/store'

export type Reducer<S, A> = (prevState: S, action: A) => S
export type Dispatch<A> = (value: A) => void
export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never
export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never
export type SetStateAction<S> = S | ((prevState: S) => S)

export const useReducer = <R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [store, setStore] = createStore<ReducerState<R>>(initialState)
  const dispatch = (action: ReducerAction<R>) => {
    initialState = reducer(initialState, action)
    setStore(reconcile(initialState))
  }

  return [store as ReducerState<R>, dispatch]
}
