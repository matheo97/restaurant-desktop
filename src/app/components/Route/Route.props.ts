import { Page } from '../../screens/pages'
import { RouteProps as ReactRouterProps } from 'react-router-dom'

export type RouteProps = ReactRouterProps & {
  page: Page
}
