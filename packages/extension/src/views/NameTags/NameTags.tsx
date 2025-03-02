import { createSignal, createMemo, For } from 'solid-js'
import { styled } from 'solid-styled-components'
import { getAddress, isAddress } from 'ethers/lib/utils'

import { useNameTags } from '../../hooks'
import { Colors, Font } from '../../design'

import { Page, Text, Title } from '../shared'
import { SubmitButton } from '../shared/SubmitButton'

interface Props {
  onNavigate: (page: string) => void
}

export const NameTags = ({ onNavigate }: Props) => {
  const [nameTags, setNameTags] = useNameTags()
  const [address, setAddress] = createSignal('')
  const [name, setName] = createSignal('')
  const [error, setError] = createSignal('')

  function onSubmit(e: Event) {
    e.preventDefault()

    if (!isAddress(address())) {
      setError('Invalid address')
      return
    } else if (!name) {
      setError('No name specified')
      return
    }

    setNameTags([...nameTags, { address: address(), name: name() }])
    setError('')
    setAddress('')
    setName('')
  }

  function onRemove(i: number) {
    setNameTags(nameTags.filter((x, index) => index !== i))
  }

  const displayed = createMemo(() =>
    nameTags
      .map((tag) => ({ ...tag, address: getAddress(tag.address) }))
      .map((tag, i, array) => ({
        ...tag,
        shadowed: array.some((x, j) => j > i && x.address.toLowerCase() === tag.address.toLowerCase()),
      }))
  )

  return (
    <Page name="nameTags" onNavigate={onNavigate}>
      <Wrapper>
        <Title>Name Tag Manager</Title>
        <Text>
          Name tags are used for identifying Ethereum addresses. Instead of remembering the hex values you can assign a
          human readable name to them. This names are used across this extension. Some addresses and names are added
          automatically (e.g. connected accounts or multicall contracts). Those can be changed at any point.
        </Text>
        <Form onSubmit={onSubmit}>
          <AddressInput
            value={address()}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Address 0x1234..."
          />
          <Input value={name()} onChange={(e) => setName(e.currentTarget.value)} placeholder="Name tag" />
          <SubmitButton type="submit" value="Add" />
        </Form>
        {error() && <ErrorMessage>{error()}</ErrorMessage>}
        <Table>
          <tbody>
            <For each={displayed().reverse()}>
              {(tag, i) => (
                <Row>
                  <AddressCell className={tag.shadowed ? 'shadowed' : ''}>{tag.address}</AddressCell>
                  <NameCell className={tag.shadowed ? 'shadowed' : ''}>{tag.name}</NameCell>
                  <Cell>
                    <Remove onClick={() => onRemove(i())}>Remove</Remove>
                  </Cell>
                </Row>
              )}
            </For>
          </tbody>
        </Table>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  line-height: 1.5;
`

const Form = styled.form`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  height: 35px;
  margin-right: 8px;
  font-family: inherit;
  font-size: inherit;
`

const AddressInput = styled(Input)`
  font-family: ${Font.Code};
`

const ErrorMessage = styled.div`
  color: ${Colors.Error};
`

const Table = styled.table`
  width: 100%;
  margin: 15px 0;
  border-collapse: collapse;
  border: 1px solid ${Colors.Border};
`

const Row = styled.tr`
  &:hover {
    background-color: ${Colors.Hover};
  }
`

const Cell = styled.td`
  border: 1px solid ${Colors.Border};
  padding: 4px 8px;

  &:not(:last-child) {
    border-right: none;
  }
  &:not(:first-child) {
    border-left: none;
  }

  &.shadowed {
    text-decoration: line-through;
  }
`

const AddressCell = styled(Cell)`
  font-family: ${Font.Code};
  width: 42ch;
`

const NameCell = styled(Cell)`
  width: 100%;
`

const Remove = styled.button`
  background: none;
  border: none;
  font-family: ${Font.Body};
  font-size: 14px;
  outline: none;
  color: ${Colors.Removed};
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
`
