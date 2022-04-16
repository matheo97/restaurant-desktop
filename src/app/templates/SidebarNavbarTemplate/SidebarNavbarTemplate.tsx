import { SidebarNavbarTemplateProps } from './SidebarNavbarTemplate.props'
import React from 'react'
import { Sidebar } from '../../components/Sidebar'

function SidebarNavbarTemplate({
  children,
  ...props
}: SidebarNavbarTemplateProps) {
  return (
    <Sidebar>
      <div {...props}>{children}</div>
    </Sidebar>
  )
}

export default SidebarNavbarTemplate
