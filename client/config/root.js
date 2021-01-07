import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/index'

const Root = () => {
  return (
    <Provider store={store}>
      <div>this is root</div>
    </Provider>
  )
}

export default Root
