import SignIn from './sign-in'
import SignUp from './sign-up'
import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
const AppRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const loggedOutRoutes = ['/sign-in']

  useEffect(() => {
    const { pathname } = location
    const redirect = loggedOutRoutes.some(route => pathname.startsWith(route))
    if (redirect || pathname === '/') navigate('/sign-in')
  }, [])
  return (
    <Routes>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  )
}

export default AppRouter
