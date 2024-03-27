import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { App } from './RootCmp.jsx'
import '../src/assets/css/index.css'
import '../src/styles/all.css'



const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)