import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { CoreContextProvider } from './contexts/CoreContext'
import './index.css'
import { store } from './store'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CoreContextProvider>
        <App />
      </CoreContextProvider>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)
