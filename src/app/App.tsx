import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Switch } from 'react-router-dom'
import GlobalStyled from './global/styled'
import { persistor, store } from './store'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ScreenClassProvider, setConfiguration } from 'react-grid-system'
import Routes from './modules/Routes'
import './index.css'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './global/theme'

setConfiguration({
  gridColumns: 16,
})

function render() {
  ReactDOM.render(
    <ScreenClassProvider>
      <HashRouter>
        <StoreProvider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <ThemeProvider theme={defaultTheme}>
              <GlobalStyled />
              <Switch>
                <Routes />
              </Switch>
            </ThemeProvider>
          </PersistGate>
        </StoreProvider>
      </HashRouter>
    </ScreenClassProvider>,
    document.getElementById('app')
  )
}

render()
