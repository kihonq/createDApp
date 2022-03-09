import { createEffect, For, onCleanup, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { styled } from 'solid-styled-components'

import type { Event } from '../../../providers/events/State'

import { EventListItem } from './EventListItem'

interface Props {
  events: Event[]
  selected: Event | undefined
  onSelect: (event: Event) => void
}

export function EventList({ events, selected, onSelect }: Props) {
  const [state, setState] = createStore({
    atBottom: true,
    justScrolled: false,
  })
  let wrapper: HTMLDivElement | undefined

  onMount(() => {
    function onScroll() {
      const el = wrapper
      if (el) {
        if (state.justScrolled) {
          setState('justScrolled', false)
        } else {
          setState('atBottom', el.scrollHeight - el.scrollTop - el.clientHeight < 1)
        }
      }
    }

    if (wrapper) {
      wrapper.addEventListener('scroll', onScroll)
      onCleanup(() => wrapper?.removeEventListener('scroll', onScroll))
    }
  })

  createEffect((prevEvents) => {
    if (!events || prevEvents !== events) {
      if (state.atBottom && wrapper) {
        setState('justScrolled', true)
        wrapper.scrollTop = wrapper.scrollHeight
      }
    }

    return events
  })

  return (
    <ListWrapper ref={wrapper}>
      <List>
        <For each={events}>{(e) => <EventListItem event={e} selected={e === selected} onSelect={onSelect} />}</For>
      </List>
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
`

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow-x: hidden;
`
