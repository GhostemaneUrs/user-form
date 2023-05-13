import React from 'react'
import './styles/globals.scss'
import App from './pages/index'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
