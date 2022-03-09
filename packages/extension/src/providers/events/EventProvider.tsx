import { createContext, JSXElement, useContext, onMount, onCleanup } from 'solid-js'

import { connect } from '../../connect'
import { useReducer } from '../../hooks'

import { NameTagsContext } from '../nameTags/NameTagsProvider'

import type { Message } from './Message'
import { INITIAL_STATE, reducer } from './reducer'
import type { Event } from './State'

export const EventContext = createContext<Event[]>([])

interface Props {
  children: JSXElement
}

export const EventProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { setNameTags } = useContext(NameTagsContext)

  function onMessage(message: Message) {
    dispatch(message)
    if (message.source === 'createdapp-hook') {
      handle(message)
    } else if (message.source === 'createdapp-content' && message.payload.type === 'REPLAY') {
      message.payload.messages.forEach(handle)
    }
  }

  function handle(message: Message) {
    if (message.payload.type === 'ACCOUNT_CHANGED' && message.payload.address) {
      tag(message.payload.address, `User ${message.payload.address.substring(2, 6)}`)
    } else if (message.payload.type === 'NETWORK_CHANGED' && message.payload.multicallAddress) {
      tag(message.payload.multicallAddress, 'Multicall')
    }
  }

  function tag(address: string, name: string) {
    setNameTags((tags = []) => {
      if (!tags.some((tag) => tag.address.toLowerCase() === address)) {
        return [...tags, { address, name }]
      } else {
        return tags
      }
    })
  }

  onMount(() => {
    const connection = connect()
    const stopListening = connection.listen(onMessage)
    connection.init()

    onCleanup(stopListening)
  })

  return <EventContext.Provider value={state.events} children={children} />
}
