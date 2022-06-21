import React from 'react'
import { Provider } from 'react-redux'
import {
  Routes, Route, BrowserRouter
} from 'react-router-dom'

import store from '../redux'
import Startup from './startup'
import Dummy from '../components/dummy'
import Main from '../components/main'

const TestCase = () => {
  return <Route path="/go" element={<Main />} />
}

// const OnlyAnonymousRoute = () => {
//   const { user, token } = useSelector((s) => s.auth)
//   return !!user && !!token ? <Main /> : <Main />
// }

// const PrivateRoute = () => {
//   const { user, token } = useSelector((s) => s.auth)
//   return !!user && !!token ? <Navigate to="/login" /> : <Route path="/lol" element={<Main />} />
// }

const Root = () => {
  return (
    <Provider store={store}>
      <Startup>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dummy />} />
            {TestCase()}
          </Routes>
        </BrowserRouter>
      </Startup>
    </Provider>
  )
}

export default Root
