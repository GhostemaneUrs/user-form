import { useContext } from 'react'
import { UserContext } from '../context/auth'

export const useAuth = () => {
  const {
    user,
    signIn,
    signUp,
    logout,
    loading,
    setUser,
    credentials,
    setCredentials
  } = useContext(UserContext)
  return {
    user,
    signIn,
    signUp,
    logout,
    loading,
    setUser,
    credentials,
    setCredentials
  }
}
