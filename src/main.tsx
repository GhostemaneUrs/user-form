import React from 'react'
import './styles/globals.scss'
import App from './pages/index'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/auth'
import { BrowserRouter } from 'react-router-dom'
import { StepsProvider } from './context/steps'
import { ThemeProvider } from '@material-tailwind/react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <StepsProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StepsProvider>
    </UserProvider>
  </React.StrictMode>
)
