import React from 'react'
import useAppInit from '../hooks/use-app-init'
import AppModule from './App'
import { Route, Switch } from 'react-router-dom'
import AuthModule from './Auth'

function Routes() {
  const { loading } = useAppInit()
  return loading ? (
    // <Flex align="center" justify="center" style={{ height: '100vh' }}>
    //   <Spinner size="large" />
    // </Flex>
    <div>
      loading!
    </div>
  ) : (
    <Switch>
      <Route path="/auth" component={AuthModule} />
      <Route path="/" component={AppModule} />
    </Switch>
  )
}

export default Routes
