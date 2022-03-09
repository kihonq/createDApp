import { createSignal, Show } from 'solid-js'
import { styled } from 'solid-styled-components'

import { toHttpPath } from '../../utils'
import { BorderRad } from '../../global/styles'

export function TokenIcon({ src, alt }: { src: string; alt: string }) {
  const [isIconError, setIconError] = createSignal(false)

  return (
    <Show
      when={isIconError()}
      fallback={
        <Icon
          src={toHttpPath(src)}
          alt={alt}
          onError={() => {
            setIconError(true)
          }}
        />
      }
    >
      '🤷‍♂️'
    </Show>
  )
}

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: ${BorderRad.round};
  overflow: hidden;
`
