import { auth } from '../services/firebase'
import { useState, createContext, useEffect } from 'react'
import { UserContextType, UserProviderType } from '../types/user'
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

export const UserContext = createContext<UserContextType>({
  user: {},
  credentials: {},
  setUser: () => {},
  logout: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  setCredentials: () => {},
  signInWithGoogle: async () => {}
})

export const UserProvider = ({ children }: UserProviderType) => {
  const [user, setUser] = useState({})
  const [credentials, setCredentials] = useState({})

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    const isValidUser = onAuthStateChanged(auth, user => {
      if (user) setCredentials(user)
      else setCredentials({})
    })
    return isValidUser
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logout,
        setUser,
        credentials,
        setCredentials,
        signInWithGoogle
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
