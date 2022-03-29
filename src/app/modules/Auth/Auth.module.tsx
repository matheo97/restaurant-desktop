import React from 'react'
import { Switch, PublicRoute } from '../../components/Route'
import { pages } from '../../screens/pages'
import SignInPage from '../../screens/SignIn'

function AuthModule() {
  return (
    <Switch>
      <PublicRoute page={pages.SignIn} exact>
        <SignInPage />
      </PublicRoute>
    </Switch>
  )
}

export default AuthModule
