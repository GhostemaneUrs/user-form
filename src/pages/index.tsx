import SignIn from './signIn'
import SignUp from './signUp'
import { useEffect } from 'react'
import { Layout } from '../components/layout'
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
    <Layout>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </Layout>
  )
}

export default AppRouter
