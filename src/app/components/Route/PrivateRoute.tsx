import React, { useMemo } from 'react'

import { Redirect, Route } from 'react-router-dom'
import { pages } from '../../screens/pages'
import { useAppState } from '../../store'
import { RouteProps } from './Route.props'

const PrivateRoute = ({ page, children, ...props }: RouteProps) => {
  const auth = useAppState(state => state.auth)
  const results = useMemo(() => {
    const authorizedRole = page.roles
      ? auth.user
        ? page.roles.includes(auth.user.role)
        : false
      : true
    const isAuthorized = page.roles ? authorizedRole : auth.isLogged
    const isValid = page.validate
      ? auth.user
        ? page.validate(auth.user)
        : false
      : isAuthorized
    return { authorized: isValid && isAuthorized, authorizedRole }
  }, [auth])
  return (
    <Route
      {...props}
      render={({ location }) =>
        results.authorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: auth.isLogged
                ? results.authorizedRole
                  ? pages.Home.url({})
                  : pages.ForbiddenAccess.url({})
                : pages.SignIn.url({}),
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
