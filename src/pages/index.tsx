import SignIn from './signIn'
import SignUp from './signUp'
import { Fragment, useEffect } from 'react'
import Personal from './personalAccount'
import { Layout } from '../components/layout'
import {
  ProtectedRoute,
  ProtectedRouteAuth
} from '../components/protectedRoute'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '../components/loading'
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
  const { loading } = useAuth()

  return (
    <Fragment>
      <Loading state={loading} />
      <Layout>
        <Routes>
          <Route element={<ProtectedRouteAuth />}>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/personal-account' element={<Personal />} />
          </Route>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Layout>
    </Fragment>
  )
}

export default AppRouter
