import React from 'react'
import './styles/globals.scss'
import App from './pages/index'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/user'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
)
