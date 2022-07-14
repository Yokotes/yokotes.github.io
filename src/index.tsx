import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CoreContextProvider } from './contexts/CoreContext'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CoreContextProvider>
      <App />
    </CoreContextProvider>
  </React.StrictMode>
)
