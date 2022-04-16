import { PropsWithChildren } from 'react'

export type SidebarNavbarTemplateProps = {
  style?: React.CSSProperties
  className?: string
} & PropsWithChildren<Record<string, unknown>>
