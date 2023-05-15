import { useAuth } from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo = '/' }) => {
  const { credentials } = useAuth()
  if (!credentials?.accessToken) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}

export const ProtectedRouteAuth = ({ redirectTo = '/personal-account' }) => {
  const { credentials } = useAuth()
  if (credentials?.accessToken) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}
