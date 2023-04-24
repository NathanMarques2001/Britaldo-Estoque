import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppRoutes } from './routes'

import './style/global.css'
import './style/media-querys.css'
import AuthProvider from './contexts/auth/authProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
)
