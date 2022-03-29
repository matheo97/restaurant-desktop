import React from 'react'
import { Route } from 'react-router-dom'
import { AppModuleContainer } from './App.styled'
import { pages } from 'app/screens/pages'
import ForbiddenAccessScreen from '../../screens/ForbiddenAccess'
import { PrivateRoute, Switch } from '../../components/Route'

function AppModule() {
  return (
    <AppModuleContainer>
      <Switch>
        <PrivateRoute page={pages.Home} exact>
          <p>Holi</p>
        </PrivateRoute>
        <Route exact path={pages.ForbiddenAccess.path}>
          <ForbiddenAccessScreen />
        </Route>
      </Switch>
    </AppModuleContainer>
  )
}

export default AppModule
