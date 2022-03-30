import { blue } from '@ant-design/colors'

export type Theme = {
  primary: string
  secondary: string
  tertiary: string
  white: string
}

export const defaultTheme: Theme = {
  primary: blue.primary,
  secondary: blue[3],
  tertiary: blue[1],
  white: '#FFFFFF',
}
