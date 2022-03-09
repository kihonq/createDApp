import { JSXElement, createEffect } from 'solid-js'
import { nanoid } from 'nanoid'

import { useEthers, useReducer } from '../../hooks'

import { AddNotificationPayload, DEFAULT_NOTIFICATIONS, RemoveNotificationPayload } from './model'
import { NotificationsContext } from './context'
import { notificationReducer } from './reducer'

interface Props {
  children: JSXElement
}

export function NotificationsProvider(props: Props) {
  const [notifications, dispatch] = useReducer(notificationReducer, DEFAULT_NOTIFICATIONS)
  const { chainId, account } = useEthers()

  createEffect(() => {
    if (account && chainId) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        chainId: chainId,
        notification: {
          type: 'walletConnected',
          id: nanoid(),
          submittedAt: Date.now(),
          address: account,
        },
      })
    }
  })

  const addNotification = ({ notification, chainId }: AddNotificationPayload) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      chainId,
      notification: { ...notification, id: nanoid() },
    })
  }

  const removeNotification = ({ notificationId, chainId }: RemoveNotificationPayload) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      chainId,
      notificationId,
    })
  }

  return (
    <NotificationsContext.Provider value={{ addNotification, notifications, removeNotification }} children={props.children} />
  )
}
