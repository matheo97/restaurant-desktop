import { SidebarNavbarTemplateProps } from './SidebarNavbarTemplate.props'
import React from 'react'
import { Sidebar } from '../../components/Sidebar'

function SidebarNavbarTemplate({
  children,
  ...props
}: SidebarNavbarTemplateProps) {
  return (
    <Sidebar>
      <div style={{ height: '100%', width: '100%' }} {...props}>
        {children}
      </div>
    </Sidebar>
  )
}

export default SidebarNavbarTemplate
