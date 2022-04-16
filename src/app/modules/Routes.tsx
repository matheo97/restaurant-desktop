import React from 'react'
import useAppInit from '../hooks/use-app-init'
import AppModule from './App'
import { Route, Switch } from 'react-router-dom'
import AuthModule from './Auth'
import { PageLoader } from '../components/PageLoader'

function Routes() {
  const { loading } = useAppInit()
  return loading ? (
    <PageLoader />
  ) : (
    <Switch>
      <Route path="/auth" component={AuthModule} />
      <Route path="/" component={AppModule} />
    </Switch>
  )
}

export default Routes
