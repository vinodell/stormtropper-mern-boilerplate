import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'

import store, { history } from '../redux'

import Startup from './startup'

import Dummy from '../components/dummy'
import Main from '../components/main'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <BrowserRouter to="/channels" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <BrowserRouter to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <BrowserRouter>
            <Route exact path="/" component={() => <Dummy />} />
            <OnlyAnonymousRoute exact path="/anonymous" component={() => <Main />} />
            <PrivateRoute exact path="/private" component={() => <Main />} />
          </BrowserRouter>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
