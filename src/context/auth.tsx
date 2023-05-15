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
import { DocumentData } from 'firebase/firestore'
import { getUser, saveUser, verifyExistUser } from '../utils/firebaseFunctions'

export const UserContext = createContext<UserContextType>({
  user: {},
  loading: false,
  credentials: {},
  setUser: () => {},
  setLoading: () => {},
  logout: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  setCredentials: () => {},
  signInWithGoogle: async () => {}
})

export const UserProvider = ({ children }: UserProviderType) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<DocumentData>({})
  const [credentials, setCredentials] = useState({})

  const signIn = async (email: string, password: string) => {
    const currentUser = await signInWithEmailAndPassword(auth, email, password)
    if (!currentUser) {
      return Error('No se pudo iniciar sesión')
    }
    const { user } = currentUser
    getUser(user.uid).then(data => {
      if (data) {
        setUser(data)
      }
    })
  }

  const signUp = async (email: string, password: string) => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password)
    if (!newUser) {
      return Error('No se pudo crear el usuario')
    }
    const { user } = newUser
    saveUser({
      uid: user.uid,
      step: 0
    })
  }

  const logout = () => {
    return auth.signOut()
  }

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    const currentUser = await signInWithPopup(auth, googleProvider)
    if (!currentUser) return Error('No se pudo iniciar sesión')
    const { user } = currentUser
    verifyExistUser(user.uid).then(data => {
      console.log('🚀 ~ file: auth.tsx:61 ~ verifyExistUser ~ data:', data)
      if (!data) saveUser({ uid: user.uid })
      else getUser(user.uid)
    })
  }

  useEffect(() => {
    setLoading(true)
    const isValidUser = onAuthStateChanged(auth, user => {
      if (user) {
        getUser(user.uid).then(data => {
          if (data) {
            setUser(data)
            setLoading(false)
          }
        })
        setCredentials(user)
      } else setCredentials({})
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
        loading,
        setLoading,
        credentials,
        setCredentials,
        signInWithGoogle
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
