import { useAuth } from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo = '/sign-in' }) => {
  const { credentials } = useAuth()
  if (!credentials?.accessToken) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}
