import React from 'react'
import { Provider, useSelector } from 'react-redux'
import {
  Routes, Route, Navigate, BrowserRouter
} from 'react-router-dom'

import store from '../redux'
import Startup from './startup'
import Dummy from '../components/dummy'
import Main from '../components/main'

const OnlyAnonymousRoute = () => {
  const { user, token } = useSelector((s) => s.auth)
  const func = () => {
    return !!user && !!token ? <Navigate to="/channels" /> : <Main />
  }
  return <Route element={func} />
}

const PrivateRoute = () => {
  const { user, token } = useSelector((s) => s.auth)
  const func = () => {
    return !!user && !!token ? <Main /> : <Navigate to="/login" />
  }
  return <Route element={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <Startup>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dummy />} />
            <Route path="anonymous" element={() => <OnlyAnonymousRoute />} />
            <Route path="private" element={() => <PrivateRoute />} />
          </Routes>
        </BrowserRouter>
      </Startup>
    </Provider>
  )
}

export default Root
