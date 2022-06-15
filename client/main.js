import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './config/root'

import './assets/styles/style.scss'

const target = ReactDOM.createRoot(document.getElementById('root'))

const render = (Component) => {
  ReactDOM.render(<Component />, target)
}

render(Root)
