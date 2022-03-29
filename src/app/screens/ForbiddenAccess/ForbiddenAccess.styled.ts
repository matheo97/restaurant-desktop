import { NAVBAR_HEIGHT } from '../../constants/layout'
import styled from 'styled-components'

export const ForbiddenAccessContainer = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`

export const ForbiddenAccessContent = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  flex-direction: column;
  align-items: center;
`

export const ForbiddenAccessErrorCode = styled.p.attrs({
  color: 'tertiary',
  weight: 'bold',
  transform: 'uppercase',
})`
  font-size: 10rem;
  margin-bottom: 5rem;
`

export const ForbiddenAccessMessage = styled.p.attrs(props => ({
  color: 'fontTertiary',
  preset: 'h6',
  ...props,
}))`
  font-size: 2rem;
`
