import React from 'react'
import { Route } from 'react-router-dom'
import { pages } from 'app/screens/pages'
import ForbiddenAccessScreen from '../../screens/ForbiddenAccess'
import { PrivateRoute, Switch } from '../../components/Route'
import SidebarNavbarTemplate from '../../templates/SidebarNavbarTemplate'
import DashboardPage from '../../screens/Dashboard'
import CustomerPage from '../../screens/Customer'

function AppModule() {
  return (
    <SidebarNavbarTemplate>
      <Switch>
        <PrivateRoute page={pages.Home} exact>
          <DashboardPage />
        </PrivateRoute>
        <PrivateRoute page={pages.Customer} exact>
          <CustomerPage />
        </PrivateRoute>
        <Route exact path={pages.ForbiddenAccess.path}>
          <ForbiddenAccessScreen />
        </Route>
      </Switch>
    </SidebarNavbarTemplate>
  )
}

export default AppModule
