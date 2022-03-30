import { createGlobalStyle, ThemeProps } from 'styled-components'
import { breakpoints } from '../constants/layout'
import { Theme } from './theme'

const GlobalStyled = createGlobalStyle<ThemeProps<Theme>>`
  body {
    margin: 0;
    font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background-color: ${({ theme }) => theme.white};
    
    @media screen and (max-width: ${breakpoints.md.max}) {
      font-size: 15px;
    }
    
    @media screen and (max-width: ${breakpoints.xs.max}) {
      font-size: 14px;
    }
  }

  input {
    font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

export default GlobalStyled
