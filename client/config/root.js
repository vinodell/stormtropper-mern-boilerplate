import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import {
  Routes, Route, Navigate, BrowserRouter
} from 'react-router-dom'

import store from '../redux'
import Startup from './startup'
import Dummy from '../components/dummy'
import Main from '../components/main'

const history = createBrowserHistory()

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Navigate to="/channels" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <Navigate to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Startup>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dummy />} />
              <OnlyAnonymousRoute path="anonymous" element={<Main />} />
              <PrivateRoute path="private" element={<Main />} />
            </Routes>
          </BrowserRouter>
        </Startup>
      </Router>
    </Provider>
  )
}

export default Root
