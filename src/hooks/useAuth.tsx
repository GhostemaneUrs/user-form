import { useContext } from 'react'
import { UserContext } from '../context/user'

export const useAuth = () => {
  const {
    user,
    signIn,
    signUp,
    logout,
    setUser,
    credentials,
    setCredentials,
    signInWithGoogle
  } = useContext(UserContext)
  return {
    user,
    signIn,
    signUp,
    logout,
    setUser,
    credentials,
    setCredentials,
    signInWithGoogle
  }
}
