/* @flow */
import React from 'react'

import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, user, ...rest }) => {
  return (<Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} user={user} />
    ) : (
      <Redirect to={{
        pathname: '/auth',
        state: { from: props.location }
      }} />
    )
  )} />)
}

export { PrivateRoute as default }
