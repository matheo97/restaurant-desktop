import React, { Children, isValidElement, cloneElement } from 'react'
import { Switch as RouterSwitch, SwitchProps } from 'react-router-dom'
import { RouteProps } from './Route.props'

type Props = SwitchProps

const Switch = ({ children }: Props) => {
  const pages = Children.map(children, child => {
    if (!isValidElement(child)) return null
    const props: RouteProps = child.props
    return cloneElement(child, {
      ...props,
      path: props.page ? props.page.path : props.path,
    })
  })

  return <RouterSwitch>{pages}</RouterSwitch>
}

export default Switch
